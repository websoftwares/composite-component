/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

import Component = require('../src/CompositeComponent');
import Contract = require('../src/ComponentInterface');

class MockComponent implements Contract.ComponentInterface{
  render():string {
    return 'hello'
  }
}

var mockComponent = new MockComponent;

import chai = require('chai');
var assert = chai.assert;

describe('CompositeComponent tests:', () => {

  it('Expect succesfully to create a new instance', function() {
    assert.typeOf(new Component.CompositeComponent(), 'object')
  })

  it('Expect that the method render returns string', function() {
    var compositeComponent = new Component.CompositeComponent()
    var actual = compositeComponent.render()
    var expected = ''
    assert.equal(actual, expected)
  })

  it(
    'Expect that a RangeError is to be thrown when the same object is added.',
    function() {
      var compositeComponent = new Component.CompositeComponent()
      var actual = function() {
        compositeComponent.attachComponent(mockComponent)
        compositeComponent.attachComponent(mockComponent)
      }
      assert.throws(actual, RangeError)
    }
  )

  it('Expect that an component can be succesfully can attached.', function() {
    var compositeComponent = new Component.CompositeComponent()
    var actual = compositeComponent.attachComponent(mockComponent)
    var expected = compositeComponent

    assert.equal(actual, expected)
  })

});
