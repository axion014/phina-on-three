var fs = require("fs");
var gulp = require('gulp');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('default', ['build']);
gulp.task('watch', ['build'], function() {
  gulp.watch(['src/**/*'], ['build']);
});
var name = 'phina-on-three';
var dest = gulp.dest.bind(gulp, './build/');
var dests = ['', 'effect'];

gulp.task('build', function() {
  dests.forEach(function(d) {
    gulp.src(fs.readFileSync(d + (d !== "" ? '_' : '') + 'sources').toString().split('\n').map(function(x) {return "src/" + x}))
    .pipe(plumber())
    .pipe(concat(d + (d !== "" ? '.' : '') + name + '.js'))
    .pipe(dest())
    .pipe(uglify({output:{comments: /^!/}}))
    .pipe(rename({extname: '.min.js'}))
    .pipe(dest());
  });
})
