var gulp = require('gulp'),
  sass = require('gulp-sass'),
  svgstore = require('gulp-svgstore'),
  svgmin = require('gulp-svgmin'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync').create();

gulp.task('sass', function() {
  return gulp
    .src('src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

gulp.task('css', function() {
  return gulp
    .src(['node_modules/animate.css/animate.css'])
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp
    .src([
      'node_modules/bootstrap/dist/js/bootstrap.js',
      'node_modules/jquery/dist/jquery.js',
    ])
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream());
});

gulp.task('svgstore', function() {
  return gulp
    .src('src/icons/*.svg', { base: 'src/icons' })
    .pipe(rename({ prefix: 'icon-' }))
    .pipe(
      svgmin({
        plugins: [
          {
            removeViewBox: false,
          },
        ],
      })
    )
    .pipe(svgstore())
    .pipe(gulp.dest('src/icons'));
});

gulp.task(
  'serve',
  gulp.series(['sass'], function() {
    browserSync.init({
      server: './src',
    });

    gulp.watch(['src/scss/*.scss'], gulp.parallel(['sass']));
    gulp.watch(['src/*html']).on('change', browserSync.reload);
  })
);

gulp.task('build:dev', gulp.series(['serve']));
