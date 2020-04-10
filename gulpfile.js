const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat'); 
const nodemon = require('gulp-nodemon');


gulp.task('minifyJs', (done) => {
    gulp.src('public/js/src/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
    done();
});

gulp.task('sass', (done) => {
    gulp.src('public/styles/sass_files/*.scss')
    .pipe(concat('main.scss'))
    .pipe(sass())
    .pipe(gulp.dest('public/styles'));
    done();
});


gulp.task('watch', () => {
    gulp.watch('public/styles/sass_files/*.scss', gulp.series('sass'));
    gulp.watch('public/styles/sass_files/*/*.scss', gulp.series('sass'));
    gulp.watch('public/js/src/*.js', gulp.series('minifyJs'));
});

gulp.task('nodemon', function (done) {
    nodemon({
      script: './app.js'
    , done: done
    })
});

gulp.task('default', gulp.parallel('watch', 'nodemon'));
