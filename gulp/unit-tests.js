'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
   rename: {
      'gulp-karma2': 'karma'
   }
});

var wiredep = require('wiredep');

var paths = gulp.paths;

function runTests(singleRun, done) {
   var bowerDeps = wiredep({
      directory: 'bower_components',
      exclude: ['bootstrap-sass-official'],
      dependencies: true,
      devDependencies: true
   });

   var testFiles = bowerDeps.js.concat([
      paths.src + '/{app,components}/**/{*module.js,*.js}',
      paths.src + '/{app,components}/**/*.html' //Added because of the karma-ng-html2js-preprocessor
   ]);

   gulp.src(testFiles)
        .pipe($.karma({
           configFile: 'karma.conf.js',
           action: (singleRun) ? 'run' : 'watch'
        }))
        .on('error', function (err) {
           // Make sure failed tests cause gulp to exit non-zero
           throw err;
        });

}

gulp.task('test', function (done) {
   runTests(true /* singleRun */, done)
});
gulp.task('test:auto', function (done) {
   runTests(false /* autorun */, done)
});
