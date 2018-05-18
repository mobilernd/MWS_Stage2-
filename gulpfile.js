const gulp = require('gulp');
const images_minify = require('gulp-imagemin');
const inlineCss = require('gulp-inline-style');
const cleanCss = require('gulp-clean-css');
const minifyJs = require('gulp-minify');
const concatJs = require('gulp-concat');
//const sourcemaps = require('gulp-sourcemaps');
const serve = require('gulp-serve');

gulp.task('images_minify_task', function () {
  return gulp.src('img/*.{jpg,png}')
    .pipe(images_minify())
   
    .pipe(gulp.dest('dist/img'));
});

gulp.task('css',['minify-css'], function() {
    gulp.src('./*.html')
    .pipe(inlineCss('./.tmp/'))
    .pipe(gulp.dest('dist'));
})

gulp.task('minify-css', function() {

  return gulp.src('./css/*.css')
  .pipe(cleanCss())
  .pipe(gulp.dest('./.tmp/'));

});

gulp.task('concat-js', function() {
  gulp.src(['./js/app.js','./js/dbhelper.js','./js/idb.js'])
  //.pipe(sourcemaps.init())
  .pipe(concatJs('common.js'))
  .pipe(minifyJs())
  //.pipe(sourcemaps.write())
  .pipe(gulp.dest('dist/js'))

  gulp.src('./js/main.js')
  .pipe(concatJs('main.js'))
  .pipe(minifyJs())
  .pipe(gulp.dest('dist/js'))

  gulp.src('./js/restaurant_info.js')
  .pipe(concatJs('restaurant_info.js'))
  .pipe(minifyJs())
  .pipe(gulp.dest('dist/js'))
})

// gulp.task('watch', function() {
//   gulp.watch('js/**/*.js', ['concat-js']);
//   gulp.watch('css/**/*.css', ['css']);
//   gulp.watch('*.html', ['css']);
// });


gulp.task('copy-serviceworker', function() {
  gulp.src('sw.js')
  .pipe(gulp.dest('dist/'));

  gulp.src('manifest.json').pipe(gulp.dest('dist'));
})


gulp.task('default',['images_minify_task','css','concat-js','copy-serviceworker', 'serve'])

gulp.task('serve', serve({
  root: ['dist']
}));
