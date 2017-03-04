var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
}

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('sass', function() {
  return gulp.src('./src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('./assets/css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./src/**/*.scss', ['sass'])
  .on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('default', ['sass', 'watch']);