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

// Lint JavaScript
gulp.task('lint-piz', function() {
    return gulp.src('src/views/js/*.js')
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
// Minify HTML and inline scripts and CSS
gulp.task('minifyhtml-pizza', function() {
  return gulp.src('src/views/*.html')
             .pipe(minifyHTML())
             .pipe(minifyInline())
             .pipe(gulp.dest('dist/views'));
});

// Minify CSS
gulp.task('minifycss', function() {
  return gulp.src('src/css/*.css')
             .pipe(uglifycss())
             .pipe(gzip())
             .pipe(gulp.dest('dist/css/'));
});
// Minify CSS
gulp.task('minifycss-pizza', function() {
  return gulp.src('src/views/css/*.css')
             .pipe(uglifycss())
             .pipe(gzip())
             .pipe(gulp.dest('dist/views/css/'));
});

// Minify JavaScript
gulp.task('minifyjs', function() {
  return gulp.src('src/js/*.js')
             .pipe(uglify())
             .pipe(gzip())
             .pipe(gulp.dest('dist/js/'));
});

// Minify JavaScript
gulp.task('minifyjs-pizza', function() {
  return gulp.src('src/js/*.js')
             .pipe(uglify())
             .pipe(gzip())
             .pipe(gulp.dest('dist/views/js/'));
});


// Move images with PNG or JPG extension
gulp.task('compress-images', function() {
  return gulp.src('src/img/*.+(png|jpg)')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/img/'));
});

gulp.task('move-images', function() {
  return gulp.src('src/views/images/*.*')
        .pipe(gulp.dest('dist/views/img/'));
});

// Do everything by default
gulp.task('default', ['lint', 'minifyhtml', 'minifycss', 'minifyjs', 'compress-images', 'lint-piz', 'minifyhtml-pizza', 'minifycss-pizza', 'minifyjs-pizza', 'move-images']);


