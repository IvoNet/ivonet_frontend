'use strict';

module.exports = function (config) {

  config.set({
               preprocessors: { //See alse the gulp 'unit-tests.js'
                 '**/*.html': ['ng-html2js'],
                 'src/**/*.js': ['coverage']
               },

               autoWatch: false,

               frameworks: [
                 'jasmine'
               ],

               browsers: ['PhantomJS'],

               plugins: [
                 'karma-phantomjs-launcher',
                 'karma-jasmine',
                 'karma-ng-html2js-preprocessor',
                 'karma-coverage'
               ],
               ngHtml2JsPreprocessor: {
                 stripPrefix: 'src/'
               },
               reporters: [
                 'progress',
                 '.tmp/coverage'
               ],
               coverageReporter: {
                 type: 'html',
                 dir: '.tmp/coverage/'
               }


             });
};
