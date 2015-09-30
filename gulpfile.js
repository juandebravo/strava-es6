/*jslint node: true */
'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');

// Using the default interval (100ms) produces excessive CPU load in current
// gulp versions. Once gulp 4.x is released we can try removing this.
var WATCH_OPTS = { interval: 500 };

gulp.task('default', function() {
  // place code for your default task here
  var strava = require('./lib/strava');
  console.log(strava.foo());
});

var APP_FILES = 'lib/**/*.es6';

gulp.task('create-js', function () {
    return gulp.src(APP_FILES)
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

gulp.task('watch', ['test'], function (done) {
    gulp.watch(['lib/**', 'test/**'], WATCH_OPTS, ['test']);

    // If a task doesn't return a pipe, it should return a callback to let
    // runSequence know it is done
    done(null);
});
