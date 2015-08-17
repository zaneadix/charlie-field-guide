
var gulp     = require('gulp'),
	sass     = require('gulp-sass'),
	useref   = require('gulp-useref'),
	plumber  = require('gulp-plumber'),
	jshint   = require('gulp-jshint'),
	stylish  = require('jshint-stylish'),
	connect  = require('gulp-connect');

var src = {

	html    : 'src/index.html',
	
	styles  : 'src/styles/**/*.scss',
	
	scripts : 'src/scripts/**/*.js'
}

var dist = {

	root    : 'dist',
	
	styles  : 'dist/styles',
	
	scripts : 'dist/scripts'
}

gulp.task('html', function () {

	var assets = useref.assets();

	gulp.src(src.html)
		.pipe(plumber())
		.pipe(assets)
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest(dist.root))
		.pipe(connect.reload());
})

gulp.task('scripts', function () {

	gulp.src(src.scripts)
		.pipe(plumber())
		.pipe(jshint())
  		.pipe(jshint.reporter(stylish))
  		.pipe(gulp.dest(dist.scripts))
  		.pipe(connect.reload());
})

gulp.task('styles', function () {

	gulp.src(src.styles)
		.pipe(plumber())
		.pipe(sass({ outputStyle: 'expanded' }))
		.pipe(gulp.dest(dist.styles))
		.pipe(connect.reload());
})

gulp.task('connect', function () {

	connect.server({

		root       : dist.root,
		livereload : true,
		port       : 7000
	});
})

gulp.task('watch', function () {

	gulp.watch(src.html, ['html']);
	gulp.watch(src.scripts, ['scripts']);
	gulp.watch(src.styles, ['styles']);
})

gulp.task('default', ['html', 'styles', 'scripts']);

gulp.task('start', ['default', 'connect', 'watch']);