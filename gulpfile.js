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
gulp.task('build', function() {
	var scripts = fs.readFileSync('src/config.txt').toString().split('\n');
	for ( var i = 0; i < scripts.length; ++i ) {scripts[i] = 'src/' + scripts[i];}
	gulp.src(scripts)
	.pipe(plumber())
	.pipe(concat('phina-on-three.js'))
	.pipe(gulp.dest('./build/'))
	.pipe(uglify())
	.pipe(rename({extname: '.min.js'}))
	.pipe(gulp.dest('./build/'));
})
