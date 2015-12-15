var gulp = require('gulp');

var install = require("gulp-install");

gulp.task('install', function() {
  gulp.src(['./package.json'])
    .pipe(install());
});

var tsd = require('gulp-tsd');

gulp.task('tsd', ['install'], function () {
    tsd({
        command: 'reinstall',
        config: './tsd.json'
    });
});

var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', ['tsd'], function() {
    var tsResult = tsProject.src()
        .pipe(ts(tsProject));
    return tsResult.js.pipe(gulp.dest('build'));
});

var mocha = require('gulp-mocha');

gulp.task('mocha', ['install', 'tsd', 'scripts'] ,function() {
    return gulp.src(['build/test/**/*.js'])
        .pipe(mocha({
            compilers: {
                ts: ts
            }
        }));
});

gulp.task('default', function() {
  gulp.start('install','tsd', 'scripts', 'mocha');
});
