var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin');

gulp.task('cleanDist', function() {
  return del('./dist');
});

gulp.task('optimizeImages', ['cleanDist'], function() {
  return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
          plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
          ]
        })
    ]))
    .pipe(gulp.dest('./dist/assets/images/'));
});

gulp.task('usemin', ['cleanDist'], function() {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      css: [],
      js: []
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['cleanDist', 'optimizeImages', 'usemin']);
