'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var util = require('util');

var browserSync = require('browser-sync');

var connect = require('gulp-connect');

var protractor = require('gulp-protractor').protractor

var middleware = require('./proxy');

function browserSyncInit(baseDir, files, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if (baseDir === paths.src || (util.isArray(baseDir) && baseDir.indexOf(paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  browserSync.instance = browserSync.init(files, {
    startPath: '/',
    server: {
      baseDir: baseDir,
      middleware: middleware,
      routes: routes
    },
    browser: browser
  });
}

gulp.task('serve', ['watch'], function () {
  browserSyncInit([
                    paths.tmp + '/serve',
                    paths.src
                  ], [
                    paths.tmp + '/serve/{app,components}/**/*.css',
                    paths.src + '/{app,components}/**/*.js',
                    paths.src + 'src/assets/images/**/*',
                    paths.tmp + '/serve/*.html',
                    paths.tmp + '/serve/{app,components}/**/*.html',
                    paths.src + '/{app,components}/**/*.html',
                    '!' + paths.src + '/{app,components}/**/*.spec.js',
                    '!' + paths.src + '/{app,components}/**/*_test.js',
                    '!' + paths.src + '/{app,components}/**/*.mock.js'
                  ], ['google chrome']);
});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit(paths.dist);
});


gulp.task('serve:e2e', ['build'], function () {
  server.listen({path: paths.tmp + '/serve'});

});


gulp.task('serve:e2eOld', ['inject'], function () {
  browserSyncInit([
                    paths.tmp + '/serve',
                    paths.src
                  ], [], ['google chrome']);
});

gulp.task('serve:e2e-dist', ['build'], function () {
  browserSyncInit(paths.dist, [], []);
});

gulp.task('connect:dist', function () {
  connect.server({
                   port: 3000,
                   root: './dist',
                   base: "/",
                   livereload: false
                 });
});


