//----------------------------------------------------------------------
//	RESPONSIVE
//	Base package
//----------------------------------------------------------------------

//	Dependencies
//-----------------------------------
require('./matchMedia');
require('./matchMediaListener');


//	Main
//-----------------------------------
var Responsive = {

	addMatchMediaListener: function (queryStart, queryEnd, callback) {
		if (!window.matchMedia) return;
		var minWidth = this.convertPxToEm(queryStart) || 0,
			maxWidth = (queryEnd) ? this.convertPxToEm(queryEnd - 1) : 1000,
			mql = window.matchMedia('(min-width: ' + minWidth + 'em) and (max-width: ' + maxWidth + 'em)');
		// add listener, passing function that matches and runs callback
		mql.addListener(function () {
			// test query before calling callback
			Responsive.runCallback(mql, callback);
		});
		// invoke for first time
		this.runCallback(mql, callback);
	},
	runCallback: function (mql, callback) {
		// ensure media query matches and callback is function
		if (mql.matches && (typeof callback === "function")) callback()
	},

	// utilities
	convertPxToEm: function (px) {
		return px / 16;
	}
};

module.exports = Responsive;