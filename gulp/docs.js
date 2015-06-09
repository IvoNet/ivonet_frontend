'use strict';
var gulp = require('gulp');

gulp.task('docs', [], function () {
  var gulpDocs = require('gulp-ngdocs');
  return gulp.src('./src/**/*.js')
    .pipe(gulpDocs.process())
    .pipe(gulp.dest('.tmp/docs'));
});
