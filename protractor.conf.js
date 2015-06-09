'use strict';

var ScreenShotReporter = require('protractor-screenshot-reporter');

// An example configuration file.
exports.config = {
  // The address of a running selenium server.
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  //seleniumServerJar: deprecated, this should be set on node_modules/protractor/config.json


  multiCapabilities: [
    {'browserName': 'chrome'},
    //{'browserName': 'firefox'}, //Firefox with protractor is very buggy. Tests failing and passing randomly
    //{'browserName': 'safari'}
    //{'browserName': 'opera'}
    //{'browserName': 'phantomjs'}
    //{'browserName': 'internet explorer', 'platform': 'ANY','version': '11'}
  ],

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['e2e/**/*.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose: true,
    includeStackTrace: true

  },

  onPrepare: function() {
 		jasmine.getEnv().addReporter(new ScreenShotReporter({
 			baseDirectory: '.tmp/results/e2e',
 			takeScreenShotsOnlyForFailedSpecs: false
 		}));
 	}
};
