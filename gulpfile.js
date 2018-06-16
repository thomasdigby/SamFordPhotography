//----------------------------------------------------------------------
//  Gulp setup
//
//----------------------------------------------------------------------
//  All
//-----------------------------------
var cache = require('gulp-cached');
var gulp = require('gulp');
var pkg = require('./package.json');
var rename = require('gulp-rename');

//  CSS
//-----------------------------------
var autoprefixer = require('gulp-autoprefixer');
var cmq = require('gulp-group-css-media-queries');
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');

//  JS
//-----------------------------------

//  Linting
var eslint = require('gulp-eslint');

//  Bundle
var concat = require('gulp-concat');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

//  Other
var modernizr = require('gulp-modernizr');
var uglify = require('gulp-uglify');
var noop = function () {};



//----------------------------------------------------------------------
//  DEFAULT
//
//----------------------------------------------------------------------
gulp.task('default', ['modernizr', 'css', 'js']);


//----------------------------------------------------------------------
//  CSS
//
//----------------------------------------------------------------------
//  Main
gulp.task('css', ['css-lint', 'css-build-global']);
//  Lint
gulp.task('css-lint', function () {

	// get all .scss files
	return gulp.src([
		'css/project/*.scss',
		'!./css/project/_generic.reset.scss',
		'css/*.scss'
	])

	// lint modified scss files and report
	.pipe(cache('scsslint'))
		.pipe(scsslint({
			'config': '.scss-lint.yml',
		}))
		.pipe(scsslint.failReporter());
});
//  Build
gulp.task('css-build-global', function () {

	// get all .scss files
	return gulp.src([
		'css/project/*.scss',
		'!./css/project/_generic.reset.scss',
		'css/master-site.scss'
	])

	// compile sass to css and save as global.css
	.pipe(sass())
		// add vendor prefixes
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'ie 9', 'ie 10']
		}))
		// combine media queries
		.pipe(cmq())
		.pipe(rename('global.css'))
		.pipe(gulp.dest('css/dist/'))

	// minify css and save as global.min.css
	.pipe(cssnano({
			advanced: false,
			compatibility: '+properties.urlQuotes'
		}))
		.pipe(rename('global.min.css'))
		.pipe(gulp.dest('css/dist/'));
});


//----------------------------------------------------------------------
//  JS
//
//----------------------------------------------------------------------
//  Main
gulp.task('js', ['js-build-head', 'js-build-global']);
//  Lint
gulp.task('js-lint', function () {
	return gulp.src([
			'./js/project/**/*.*',
			'!./js/_vendor/*.*',
			'./js/*.js'
		])
		.pipe(eslint())
		.pipe(eslint.format());
});
//  Build
gulp.task('js-build-head', function () {
	return gulp.src([
			'./js/packages/_plugins/loadJS.js',
			'./js/packages/_plugins/modernizr-custom.js'
		])
		.pipe(concat('head.js'))
		.pipe(gulp.dest('js/dist/'))
		.pipe(uglify())
		.pipe(rename('head.min.js'))
		.pipe(gulp.dest('js/dist/'));
});
gulp.task('js-build-global', function () {
	return gulp.src('./js/master-global.js')
		.pipe(webpackStream(webpackConfig, webpack))
		.pipe(gulp.dest('js/dist/'))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('js/dist/'));;
});


//----------------------------------------------------------------------
//  Utils
//
//----------------------------------------------------------------------
//  Watch
gulp.task('watch', function () {
	gulp.watch([
		'./js/**/*.js',
		'!./js/dist/*.js'
	], ['js']);
	gulp.watch(['./css/project/*.*', './css/*.scss'], ['css']);
});
//  Modernizr
gulp.task('modernizr', function () {
	return gulp.src([
			'./js/project/**/*.*',
			'./css/project/*.scss',
			'./css/game/*.scss'
		])
		.pipe(modernizr('modernizr-custom.js', {
			"options": [
				"setClasses",
				"addTest",
				"html5printshiv",
				"testProp",
				"fnBind"
			],
			"uglify": false
		}))
		.pipe(uglify())
		.pipe(gulp.dest('js/_vendor/'));
});
