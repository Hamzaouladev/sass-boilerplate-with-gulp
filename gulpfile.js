const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const gulpPostcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const rename = require("gulp-rename");
const autoprefixer = require('autoprefixer');
const cleanCss = require('gulp-clean-css');


function compileSass() {
  return src('sass/main.scss')
  .pipe(sass())
  .pipe(gulpPostcss([ autoprefixer('last 4 version') ]))
  .pipe(dest('css'))
}

function minifyCss() {
  return src('css/main.css')
  .pipe( sourcemaps.init() )
  .pipe(cleanCss())
  .pipe(rename({suffix: '.min'}))
  .pipe( sourcemaps.write('.') )
  .pipe(dest('css'));
}

function watchSass() {
  watch(['sass/*.scss'], series(compileSass, minifyCss))
}

exports.default = series(compileSass, minifyCss, watchSass)

