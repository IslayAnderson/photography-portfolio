const gulp = require('gulp');
const { series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');
const cleancss = require("gulp-clean-css");

//compile 
function buildsass() {
  return gulp.src('styles/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('styles/css/'));
};
gulp.task('buildsass')

//remove unused styles
function unusedcss() {
  return gulp.src('styles/css/*.css')
    .pipe(purgecss({
      content: ['*.php', '*.html']
    }))
    .pipe(gulp.dest('styles/css/'))
};
gulp.task('unusedcss');

//minify styles
function minifycss() {
  return (
    gulp
      .src("styles/css/*.css")
      .pipe(cleancss())
      .pipe(gulp.dest("styles/css/"))
  );
};
gulp.task('minifycss');


//build

exports.build = series(buildsass, unusedcss, minifycss);