
var gulp        = require('gulp'),
	sass        = require('gulp-sass'),
	useref      = require('gulp-useref'),
	plumber     = require('gulp-plumber'),
	jshint      = require('gulp-jshint'),
	stylish     = require('jshint-stylish'),
	browserSync = require('browser-sync').create();
	// connect  = require('gulp-connect');

var src = {

	html    : 'src/index.html',
	
	styles  : 'src/styles/**/*.scss',
	
	scripts : 'src/scripts/**/*.js',

	images : 'src/images/**.*'
}

var dist = {

	root    : 'dist',
	
	styles  : 'dist/styles',
	
	scripts : 'dist/scripts',

	images : 'dist/images'
}

gulp.task('html', function () {

	var assets = useref.assets();

	// console.log(browserSync)

	gulp.src(src.html)
		.pipe(plumber())
		.pipe(assets)
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest(dist.root))
		// .pipe(browserSync.reload());
})

gulp.task('scripts', function () {

	gulp.src(src.scripts)
		.pipe(plumber())
		.pipe(jshint())
  		.pipe(jshint.reporter(stylish))
  		.pipe(gulp.dest(dist.scripts))
  		// .pipe(browserSync.reload());
})

gulp.task('styles', function () {

	gulp.src(src.styles)
		.pipe(plumber())
		.pipe(sass({ outputStyle: 'expanded' }))
		.pipe(gulp.dest(dist.styles))
		.pipe(browserSync.stream());
})

gulp.task('images', function () {

	gulp.src(src.images)
		.pipe(gulp.dest(dist.images));
})

gulp.task('connect', function () {

	// connect.server({

	// 	root       : dist.root,
	// 	livereload : true,
	// 	port       : 7000
	// });
	

    browserSync.init({

        server: {

            baseDir: dist.root
        }
    });

})

gulp.task('watch', function () {

	gulp.watch(src.html, ['html'], browserSync.reload);
	gulp.watch(src.scripts, ['scripts'], browserSync.reload);
	gulp.watch(src.styles, ['styles']);
})

gulp.task('default', ['html', 'styles', 'scripts', 'images']);

gulp.task('start', ['default', 'connect', 'watch']);