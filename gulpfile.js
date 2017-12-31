var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var tap = require('gulp-tap');
const path = require('path');
var fs = require("fs")
var webserver = require('gulp-webserver');
var htmlmin = require('gulp-htmlmin');
var jade = require('gulp-jade');
var webp = require('gulp-webp');
var sleep = require('sleep');

gulp.task('css', function(){
  gulp.src('./input/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./output/css'))
    .pipe(tap(function(file, t) {
      console.log("css: " + path.basename(file.path));
    }));
});

gulp.task('img', function(){
  gulp.src('./input/img/*')
    .pipe(gulp.dest('./output/img'))
    .pipe(tap(function(file, t) {
      console.log("img: " + path.basename(file.path));
    }));
});

gulp.task('jade', function() {
  gulp.src('./input/pages/*.jade')
    .pipe(jade({
      client: false
    }))
    .pipe(tap(function(file, t) {
      console.log("jade: " + path.basename(file.path));
    }))
    .pipe(gulp.dest('./output/'));

});
gulp.task('js', function() {
  gulp.src('./input/js/*.js')
    .pipe(gulp.dest('./output/js'));

});
gulp.task('webserver', function() {
  sleep.sleep(5);
  gulp.src('./output/')
    .pipe(webserver({
      livereload: false,
      directoryListing: false,
      fallback: 'index.html',
      open: false,
      port: 8000,
      host: '0.0.0.0'
    }));
});
gulp.task('default', [ 'css', 'js', 'jade', 'webserver', 'img' ]);
gulp.watch('./input/sass/*.sass', ['css']);
gulp.watch('./input/img/*', ['img']);
gulp.watch('./input/pages/*.jade', ['jade']);
gulp.watch('./input/layouts/*.jade', ['jade']);
gulp.watch('./input/js/*.js', ['js']);