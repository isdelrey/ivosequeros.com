var gulp = require('gulp');
var sass = require('gulp-sass');
var tap = require('gulp-tap');
const path = require('path');
var fs = require('fs');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');

gulp.task('css', function(){
  gulp.src(['./in/sass/*.scss',"./in/static/css/*"]).pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./out/static/css'))
    .pipe(tap(function(file, t) {
      console.log("+ css");
    }));
});

gulp.task('static', function(){
  gulp.src(["./in/static/fonts/*"]).pipe(gulp.dest('./out/static/fonts'));
  gulp.src(["./in/static/img/*"]).pipe(gulp.dest('./out/static/img'));
  console.log("+ static");
});

gulp.task('jade', function() {
  gulp.src('./in/pages/*.jade')
    .pipe(jade({
      client: false
    }))
    .pipe(tap(function(file, t) {
      console.log("+ " + path.basename(file.path));
    }))
    .pipe(gulp.dest('./out/'));

});
gulp.task('js', function() {
  gulp.src('./in/static/js/*.js')
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./out/static/js'));

});

gulp.task('watch', function() {
  gulp.watch('./in/sass/*.sass', ['css']);
  gulp.watch('./in/pages/*.jade', ['jade']);
  gulp.watch('./in/layouts/*.jade', ['jade']);
  gulp.watch('./in/js/*.js', ['js']);
});
gulp.task('serve', function() {
  var spawn = require('child_process').spawn;
    gulp.task('serve', function() {
      spawn('node', ['./serve.js'], { stdio: 'inherit' });
    });
});
gulp.task('build', [ 'css', 'js', 'jade', 'static' ]);
gulp.task('dev', [ 'build', 'watch', 'serve' ]);