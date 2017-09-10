var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

gulp.task('cleanDist', ['icons'], function() {
  return del('./docs');
});

gulp.task('copyGeneralFiles', ['cleanDist'], function() {
  var pathsToCopy = [
    './app/**/*',
    '!./app/assets/styles/**',
    '!./app/assets/scripts/**',
    '!./app/assets/images/**',
    '!./app/temp',
    '!./app/temp/**'
  ];

  return gulp.src(pathsToCopy)
    .pipe(gulp.dest('./docs'))
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
    .pipe(gulp.dest('./docs/assets/images/'));
});

gulp.task('useminTrigger', ['cleanDist'], function() {
  gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], function() {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      css: [function() {return rev()}, function() {return cssnano()}],
      js: [function() {return rev()}, function() {return uglify()}]
    }))
    .pipe(gulp.dest('./docs'));
});


gulp.task('preview', ['cleanDist', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger', 'usemin'], function() {
  browserSync.init({
    notify: false,
    server:{
      baseDir: "docs",
    }
  });
});

gulp.task('build', ['preview']);
