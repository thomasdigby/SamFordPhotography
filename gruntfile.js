module.exports = function (grunt) {

	// Load plugins
	require('load-grunt-tasks')(grunt);

	// ---------- Project configuration
	grunt.initConfig({

		// Global
		pkg: grunt.file.readJSON('package.json'),
		banner: '/* <%= pkg.name %> / <%= pkg.author %> on behalf of SAS / <%= grunt.template.today("yyyy-mm-dd") %> */\n',

		// Constant
		watch: {
			css: {
				files: [
					'css/scss/*.scss'
				],
				tasks: ['css']
			},
			grunt: {
				files: [
					'gruntfile.js'
				],
				tasks: ['default']
			},
			js: {
				files: [
					'scripts/common.js',
					'scripts/vendor/*.js'
				],
				tasks: ['js']
			}
		},

		// Css
		sass: {
			dist: {
				files: {
					'css/dist/style.css': 'css/scss/style.scss'
				}
			}
		},
		csslint: {
			strict: {
				options: {
					'adjoining-classes': false,
					'box-model': false,
					'box-sizing': false,
					'bulletproof-font-face': false,
					'compatible-vendor-prefixes': false,
					'display-property-grouping': 2,
					'duplicate-background-images': 2,
					'duplicate-properties': 2,
					'empty-rules': 2,
					'errors': 2,
					'fallback-colors': false, // required if supporting ie8
					'floats': false,
					'font-faces': false,
					'font-sizes': false,
					'gradients': false,
					'ids': false,
					'import': 2,
					'important': false,
					'known-properties': 2,
					'outline-none': 2,
					'overqualified-elements': 2,
					'qualified-headings': 2,
					'regex-selectors': false,
					'rules-count': false,
					'selector-max': 2,
					'selector-max-approaching': 2,
					'shorthand': 2,
					'star-property-hack': false,
					'text-indent': 2,
					'underscore-property-hack': 2,
					'unique-headings': false,
					'universal-selector': false,
					'unqualified-attributes': false,
					'vendor-prefix': false,
					'zero-units': 2
				},
				src: ['css/dist/style.css']
			}
		},
		autoprefixer: {
			options: {
				browsers: ['last 2 version']
			},
			production: {
				src: 'css/dist/style.css'
			}
		},
		cmq: {
			your_target: {
				files: {
					'css/dist': ['css/dist/style.css']
				}
			}
		},
		cssmin: {
			add_banner: {
				options: {
					banner: '<%= banner %>'
				},
				files: {
					'css/dist/style.min.css': ['css/dist/style.css']
				}
			}
		},

		// Js
		jshint: {
			all: ['scripts/common.js'],
			options: {
				lastsemic: true,
				strict: false,
				unused: true,
				globals: {
					jQuery: true
				}
			}
		},
		concat: {
			options: {
				stripBanners: true,
				banner: '<%= banner %>'
			},
			all: {
				src: [
					'scripts/vendor/jquery.debouncedresize.js',
					'scripts/vendor/jquery.easing.custom.js',
					'scripts/vendor/idangerous.swiper.min.js',
					'scripts/common.js'
				],
				dest: 'scripts/dist/all.js'
			},
			head: {
				src: [
					'scripts/vendor/modernizr.latest.js',
					'scripts/vendor/respond.min.js'
				],
				dest: 'scripts/dist/head.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>',
				warnings: false
			},
			build: {
				files: {
					'scripts/dist/all.min.js': ['scripts/dist/all.js'],
					'scripts/dist/head.min.js': ['scripts/dist/head.js']
				}
			}
		}
	});


	// ---------- Tasks

	// Default
	grunt.registerTask('default', ['sass', 'autoprefixer', 'cmq', 'cssmin', 'uglify', 'concat']);

	// Css
	grunt.registerTask('css', ['sass', 'csslint', 'autoprefixer', 'cmq', 'cssmin']);

	// Js
	grunt.registerTask('js', ['jshint', 'uglify', 'concat']);
};