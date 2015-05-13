require.config({
  baseUrl: './',
  paths: {
    'mocha': './bower_components/mocha/mocha',
    'chai' : './bower_components/chai/chai'
  },
  shim: {
    mocha: {
     exports: 'mocha'
    },
    chai: {
     exports: 'chai'
    }
  },
  urlArgs: 'bust=' + (new Date()).getTime()
});

define(function(require) {
  var chai = require('chai');
  var mocha = require('mocha');

  // Chai
  var should = chai.should();
  var assert = chai.assert;

  mocha.setup('bdd');
  mocha.bail(false);

  require([
    'specs/viewUtilsTests.js',
    'specs/issuesCollectionTests.js',
    'specs/commentsCollectionTests.js',
    'specs/issueModelTests.js',
    'specs/commentModelTests.js',
    'specs/issueViewTests.js',
    'specs/issuesViewTests.js',
    'specs/homeViewTests.js',
    'specs/errorViewTests.js'
  ], function(require) {
    if (window.mochaPhantomJS) {
      mochaPhantomJS.run();
    } else {
      mocha.run();
    }
  });

});