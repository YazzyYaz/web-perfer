var gulp = require('gulp');

// Require plugins
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var minifyHTML = require('gulp-minify-html');
var minifyInline = require('gulp-minify-inline');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var gzip = require('gulp-gzip');

// Lint JavaScript
gulp.task('lint', function() {
    return gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Minify HTML and inline scripts and CSS
gulp.task('minifyhtml', function() {
  return gulp.src('src/*.html')
             .pipe(minifyHTML())
             .pipe(minifyInline())
             .pipe(gulp.dest('dist'));
});

// Minify CSS
gulp.task('minifycss', function() {
  return gulp.src('src/css/*.css')
             .pipe(uglifycss())
             .pipe(gzip())
             .pipe(gulp.dest('dist/css/'));
});


// Minify JavaScript
gulp.task('minifyjs', function() {
  return gulp.src('src/js/*.js')
             .pipe(uglify())
             .pipe(gzip())
             .pipe(gulp.dest('dist/js/'));
});



// Move images with PNG or JPG extension
gulp.task('compress-images', function() {
  return gulp.src('src/img/*.+(png|jpg)')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/img/'));
});


// Do everything by default
gulp.task('default', ['lint', 'minifyhtml', 'minifycss', 'minifyjs', 'compress-images']);