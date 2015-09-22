/*jslint node: true */
'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('default', function() {
  // place code for your default task here
  var strava = require('./lib/strava');
  console.log(strava.foo());
});

var APP_FILES = ['lib/**/*.es6']

gulp.task('create-js', function () {
    return gulp.src('lib/**/*.es6')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

gulp.task('test', ['create-js'], function () {
    // Don't load these libraries unless needed
    var mocha = require('gulp-mocha');
    var gutil = require('gulp-util');

    gulp.src(['test/*.test.js'], { read: false })
    .pipe(mocha({
      reporter: 'spec'
    }));
});

gulp.task('watch', ['test'], function () {
    gulp.watch(['lib/**', 'test/**'], ['test']);
});
