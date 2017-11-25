const gulp = require('gulp');
const gutil = require('gulp-util');
const webserver = require('gulp-webserver');
 
gulp.task('js', () => {
  gulp.src('/js/**/*');
});

gulp.task('html', () => {
  gulp.src('/*.html');
});

gulp.task('css', () => {
  gulp.src('/css/*.css');
});

gulp.task('watch', () => {
  gulp.watch('/js/**/*', ['js']);
  gulp.watch('/css/*.css', ['css']);
  gulp.watch(['/*.html', '/views/*.html'], ['html']);
});

gulp.task('webserver', () => {
  gulp.src('angularjs-registration-app/')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['watch', 'html', 'js', 'css', 'webserver']);