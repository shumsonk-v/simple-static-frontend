// Third Party Dependencies
var gulp = require('gulp');
// For Minifying HTML
var htmlmin = require('gulp-htmlmin');
// For Compiling SASS to CSS
var sass = require('gulp-sass');
// For Minifying CSS
var cleanCSS = require('gulp-clean-css');
// For Minifying Javascript
var uglify = require('gulp-uglify');
// For joining multiple files into one
var concat = require('gulp-concat');
// For optimizing our png and jpg images
var tinypng = require('gulp-tinypng');

gulp.task('default', ['scss', 'js', 'images', 'html', 'watch']);

gulp.task('html', function() {
   return gulp.src('./src/**/*.html')
       .pipe(htmlmin({collapseWhitespace: true, cssmin: true}))
       .pipe(gulp.dest('./public'));
});

gulp.task('scss', function() {
   return gulp.src('./src/scss/**/*.scss')
      .pipe(concat('styles.min.scss'))
       .pipe(sass({ 'indented_syntax': true }).on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
       .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function() {
   return gulp.src('./src/js/**/*.js')
      .pipe(concat('app.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./public/js'));
});

gulp.task('images', function() {
   return gulp.src('./src/images/**/*')
      .pipe(tinypng('nbQUAKvU5GRfPpJ1-leZLhLzckM4qqtf'))
      .pipe(gulp.dest('./public/images'));
});

gulp.task('watch', function() {
   gulp.watch('./src/**/*.html', ['html']);
   gulp.watch('./src/scss/**/*.scss', ['scss', 'html']);
   gulp.watch('./src/js/**/*.js', ['js']);
   gulp.watch('./src/images/*', ['images']);
});