
/*
	JS Document for the SAS Boilerplate
	Build: SAS Developers on behalf of SAS
	Date: January 2014
*/

var AppSettings = {
	DEBUGMODE: true, //change to turn on/off console.log statements
	scrollPos: 0,
	easing: 'easeOutQuad'
};

var Debug = {

	log: function (value) {
		/// <summary>Wrapper for console.log to enable intellisense</summary>
		/// <param name="str" type="String">Value to log in the console</param>
		if (AppSettings.DEBUGMODE) {
			if (typeof (value) === 'object') {
				try { console.log(value); }
				catch (e) { }
			} else {
				try { console.log('%c' + value, 'color: blue;'); }
				catch (e) { }
			}
		}
	},

	time: function (str) {
		/// <summary>Wrapper for console.log to enable intellisense</summary>
		/// <param name="str" type="String">Value to log in the console</param>
		if (AppSettings.DEBUGMODE) {
			try { console.time(str); }
			catch (e) { }
		}
	},

	timeEnd: function (str) {
		/// <summary>Wrapper for console.log to enable intellisense</summary>
		/// <param name="str" type="String">Value to log in the console</param>
		if (AppSettings.DEBUGMODE) {
			try { console.timeEnd(str); }
			catch (e) { }
		}
	}

};

var Events = {

	init: function () {

		// bind scroll + resize event handlers
		Events.bindResize();
		Events.bindScroll();

		// run on load to set up init global vars
		Events.resize();
		Events.scroll();

	},

	bindResize: function () {

		$(window).on('debouncedresize', function () {
			Events.resize();
		});
	},

	bindScroll: function () {

		$(window).on('scroll', function () {
			Events.scroll();
		});
	},

	resize: function () {

		Events.scroll();
	},

	scroll: function () {

		// set scroll position
		AppSettings.scrollPos = $(window).scrollTop();
	},

	unbindScroll: function () {

		$(window).off('scroll');
	}

};

var Links = {

	selector: '[data-target]',
	targetNewWindow: 'newWindow',
	targetPageTop: 'pageTop',
	targetOnPage: 'onPage',
	$viewport: $('html, body'),

	init: function () {
		this.bindClickEvent();
	},

	bindClickEvent: function () {

		// bind click event on any data-target
		$(Links.selector).on('click', function (e) {

			var $this = $(this),
				href = $this.attr('href'),
				target = $this.data('target');

			// match data-target and run relevant function
			switch (target) {
				case Links.targetNewWindow:
					Links.newWindow(href);
					break;
				case Links.targetOnPage:
					Links.onPage(href);
					break;
				case Links.targetPageTop:
					Links.pageTop();
			}

			e.preventDefault();
		});
	},

	newWindow: function (href) {

		// window params
		var height = 420,
			width = 500,
			scrollBars = 'no',
			resizable = 'yes';

		// open new window with params
		window.open(href, 'popup', 'width=' + width + ', height=' + height + ', scrollbars=' + scrollBars + ', resizable=' + resizable + '');
	},

	onPage: function (href) {

		// scroll to offset of target
		Links.$viewport.stop().animate({
			scrollTop: $(href).offset().top - 50
		}, 750, AppSettings.Easing).promise().then(function () {
			// callback function here
		});
	},

	pageTop: function () {

		// scroll to top
		Links.$viewport.stop().animate({
			scrollTop: 0
		}, 500, AppSettings.Easing).promise().then(function () {
			// callback function here
		});
	}

};

var Utils = {

	inputSelector: '[data-input-clear]',

	init: function () {
		this.buttonBlur();
		this.inputClear();
	},

	browser: function (browserName) {
		return (
			(navigator.userAgent.toLowerCase().indexOf(browserName) != -1)
		);
	},

	buttonBlur: function () {

		// on mouseout of button, un focus button. Firefox fix.
		$('html').on('mouseout', 'button', function () {
			$(this).blur();
		});
	},

	inputClear: function () {

		// test for clearable inputs
		if ($(this.inputSelector).length) {

			// set JS clearing fallback
			$(this.inputSelector).each(function () {

				// set original value once
				var $this = $(this),
					value = $this.attr('value');

				// test for placeholder support
				if (!Modernizr.input.placeholder) {

					// bind focus and blur events to hide and show value
					$this.on({
						'focus': function () {
							if ($this.attr('value') === value) {
								$this.attr('value', '');
							}
						},
						'blur': function () {
							if (!$this.attr('value')) {
								$this.attr('value', value);
							}
						}
					});

				} else {

					// add placeholder attr and remove value attr (prevents override of placeholder)
					$this.attr('placeholder', value).removeAttr('value');
				}
			});
		}
	}

};



// Custom functions

var Carousel = {

	directionNav: '[data-carousel-direction]',
	directionNext: '[data-carousel-direction="next"]',
	directionPrev: '[data-carousel-direction="prev"]',
	selector: '[data-carousel]',

	options: {},

	init: function () {

		if ($(this.selector).length) {

			// loop through carousels
			$(this.selector).each(function () {

				var $this = $(this);

				// set options for different carousels & bind resize for multi slides
				Carousel.setOptions($this);
			});

			Carousel.bindResize();
		}
	},

	setOptions: function ($this) {

		if (Modernizr.touch) {
			$(this.directionNav).hide();
		}

		// set shared default options
		this.options = {
			autoplay: 6000,
			mode: 'horizontal',
			resistance: '100%',
			roundLengths: true,
			simulateTouch: true,
			speed: 500,
			updateOnImagesReady: true,
			visibilityFullFit: true,
			onSwiperCreated: function (swiper) {
				Carousel.setDirectionState($this, swiper);
				swiper.resizeFix();
				Carousel.updateCaption(swiper);
			},
			onSlideChangeEnd: function (swiper) {
				Carousel.setDirectionState($this, swiper);
				Carousel.updateCaption(swiper);
			},
			onTouchEnd: function (swiper) {
				Carousel.setDirectionState($this, swiper);
			}
		};

		// call swiper build once options set
		this.build($this);
	},

	build: function ($this) {

		this.bindDirectionNav();
		$('section').height($(window).height());
		$('section').width($(window).width());
		// init swiper with custom options set and bind direction nav
		setTimeout(function() {
			$this.swiper(Carousel.options);
			$this.addClass('is_visible');
		}, 500);

	},

	bindDirectionNav: function () {

		$(this.directionNav).on('click', function () {

			var $this = $(this),
				$container = $this.parents('[data-carousel]'),
				carousel = $container.data('swiper'),
				direction = $this.data('carousel-direction');

			// go to next slide else go to prev slide
			if (direction == 'next') {
				carousel.swipeNext();
			} else if (direction == 'prev') {
				carousel.swipePrev();
			}
		});
	},

	setDirectionState: function ($this, swiper) {

		var $dirPrev = $this.find(this.directionPrev),
			$dirNext = $this.find(this.directionNext);

		// if first slide is visible disable prev
		if (swiper.activeIndex === 0) {
			$dirPrev[0].disabled = true;
			$dirNext[0].disabled = false;
		}
			// if last slide is visible disable next
		else if (swiper.activeIndex + swiper.visibleSlides.length === swiper.slides.length) {
			$dirPrev[0].disabled = false;
			$dirNext[0].disabled = true;
		}
			// activate both direction
		else {
			$dirPrev[0].disabled = false;
			$dirNext[0].disabled = false;
		}
	},

	updateCaption: function(swiper) {

		var $caption = $('[data-image-caption]'),
			captionText = $(swiper.activeSlide()).find('[data-image-caption-text]').text();

		$caption.text(captionText);
	},

	bindResize: function() {

		$(window).on('resize', function() {

			$('section').height($(window).height());
			$('section').width($(window).width());
		});
	}

};



var Main = {

	run: function () {

		Debug.log('--> App started - Add run code to Main.run:function()');

		// Utils/Events
		Events.init();
		Links.init();
		Utils.init();

		// Custom functions
		// Carousel.init();
	},

	load: function() {
		Carousel.init();
	}

};

$(document).ready(Main.run());
$(window).on('load', Main.load());