// var webpack = require('webpack');
var path = require('path');

module.exports = {
	cache: true,
	entry: {
		global: './js/master-global.js'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js'
	},
	resolve: {
		// Allow require('./blah') to require blah.jsx
		extensions: ['', '.js', '.jsx']
	},
	node: {
		fs: 'empty'
	},
	module: {
		loaders: [{
			test: path.join(__dirname),
			exclude: './node_modules',
			loader: 'babel',
			query: {
				presets: ['es2015']
			}
		}]
	}
};
