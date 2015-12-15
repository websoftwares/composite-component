var gulp = require('gulp');

var install = require("gulp-install");

gulp.task('install', function() {
  gulp.src(['./package.json'])
    .pipe(install());
});

var tsd = require('gulp-tsd');

gulp.task('tsd', function () {
    return gulp.src('./gulp_tsd.json').pipe(tsd());
});

var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', ['tsd'], function() {
    var tsResult = tsProject.src()
        .pipe(ts(tsProject));
    return tsResult.js.pipe(gulp.dest('build'));
});

var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

gulp.task('pre-test', ['install', 'tsd', 'scripts'], function () {
  return gulp.src(['build/src/**/*.js'])
    // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire())
    // Coverage folder
    .pipe(gulp.dest('coverage/'));
});

gulp.task('mocha', ['pre-test','install', 'tsd', 'scripts'], function () {
  return gulp.src(['build/test/**/*.js'])
    .pipe(mocha({
        compilers: {
            ts: ts
        }
    }))
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports({
       dir: './coverage',
       reporters: [ 'lcov', 'json', 'text', 'text-summary','clover'],
       reportOpts: { dir: './coverage' },
      }
    ))
    // Enforce a coverage of at least 90%
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
})

gulp.task('default', function() {
  gulp.start('install','tsd', 'scripts', 'pre-test', 'mocha');
});
