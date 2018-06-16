/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//----------------------------------------------------------------------
	//	MASTER JS
	//
	//----------------------------------------------------------------------

	//	Dependencies
	var gallery = __webpack_require__(1);
	var imageList = __webpack_require__(3);
	var Frdialogmodal = __webpack_require__(5);
	var Frtabs = __webpack_require__(6);

	//	Main
	gallery();
	imageList();
	console.log(gallery, Frdialogmodal, Frtabs);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//	Carousel
	//-----------------------------------

	//	Dependencies
	var Swiper = __webpack_require__(2);

	//	Main
	var Gallery = function Gallery() {

		var gallerySelector = '.swiper-container';
		var imageSelector = '.js-gallery-image';
		var captionSelector = '.js-gallery-caption';
		var navSelector = '.js-gallery-nav';
		var elemGallery = document.querySelector(gallerySelector);
		var elemCaption = document.querySelector(captionSelector);
		var elemNav = [].slice.call(document.querySelectorAll(navSelector));
		var gallery = {};

		function init() {
			if (elemGallery) build();
		}

		function build() {
			gallery = new Swiper(gallerySelector, {
				autoplay: 6000,
				mode: 'horizontal',
				resistance: '100%',
				roundLengths: true,
				simulateTouch: true,
				speed: 500,
				updateOnImagesReady: true,
				visibilityFullFit: true,
				onInit: updateCaption,
				onSlideChangeEnd: updateCaption
			});
			bindNav();
		}

		function updateCaption(swiper) {
			var galleryImages = elemGallery.querySelectorAll(imageSelector);
			var slideIndex = swiper.activeIndex;
			var currentImage = galleryImages[slideIndex];
			var caption = currentImage.getAttribute('alt');
			elemCaption.innerText = caption;
		}

		function bindNav() {
			elemNav.forEach(function (elem) {
				return elem.addEventListener('click', eventNavClick);
			});
		}

		function eventNavClick(e) {
			var direction = e.target.getAttribute('data-direction');
			if (direction === 'next') gallery.slideNext();
			if (direction === 'prev') gallery.slidePrev();
		}

		init();
	};

	module.exports = Gallery;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * Swiper 3.3.0
	 * Most modern mobile touch slider and framework with hardware accelerated transitions
	 * 
	 * http://www.idangero.us/swiper/
	 * 
	 * Copyright 2016, Vladimir Kharlampidi
	 * The iDangero.us
	 * http://www.idangero.us/
	 * 
	 * Licensed under MIT
	 * 
	 * Released on: January 10, 2016
	 */
	!function () {
	  "use strict";
	  function e(e) {
	    e.fn.swiper = function (a) {
	      var i;return e(this).each(function () {
	        var e = new t(this, a);i || (i = e);
	      }), i;
	    };
	  }var a,
	      t = function t(e, r) {
	    function s(e) {
	      return Math.floor(e);
	    }function n() {
	      b.autoplayTimeoutId = setTimeout(function () {
	        b.params.loop ? (b.fixLoop(), b._slideNext(), b.emit("onAutoplay", b)) : b.isEnd ? r.autoplayStopOnLast ? b.stopAutoplay() : (b._slideTo(0), b.emit("onAutoplay", b)) : (b._slideNext(), b.emit("onAutoplay", b));
	      }, b.params.autoplay);
	    }function o(e, t) {
	      var i = a(e.target);if (!i.is(t)) if ("string" == typeof t) i = i.parents(t);else if (t.nodeType) {
	        var r;return i.parents().each(function (e, a) {
	          a === t && (r = t);
	        }), r ? t : void 0;
	      }if (0 !== i.length) return i[0];
	    }function l(e, a) {
	      a = a || {};var t = window.MutationObserver || window.WebkitMutationObserver,
	          i = new t(function (e) {
	        e.forEach(function (e) {
	          b.onResize(!0), b.emit("onObserverUpdate", b, e);
	        });
	      });i.observe(e, { attributes: "undefined" == typeof a.attributes ? !0 : a.attributes, childList: "undefined" == typeof a.childList ? !0 : a.childList, characterData: "undefined" == typeof a.characterData ? !0 : a.characterData }), b.observers.push(i);
	    }function p(e) {
	      e.originalEvent && (e = e.originalEvent);var a = e.keyCode || e.charCode;if (!b.params.allowSwipeToNext && (b.isHorizontal() && 39 === a || !b.isHorizontal() && 40 === a)) return !1;if (!b.params.allowSwipeToPrev && (b.isHorizontal() && 37 === a || !b.isHorizontal() && 38 === a)) return !1;if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
	        if (37 === a || 39 === a || 38 === a || 40 === a) {
	          var t = !1;if (b.container.parents(".swiper-slide").length > 0 && 0 === b.container.parents(".swiper-slide-active").length) return;var i = { left: window.pageXOffset, top: window.pageYOffset },
	              r = window.innerWidth,
	              s = window.innerHeight,
	              n = b.container.offset();b.rtl && (n.left = n.left - b.container[0].scrollLeft);for (var o = [[n.left, n.top], [n.left + b.width, n.top], [n.left, n.top + b.height], [n.left + b.width, n.top + b.height]], l = 0; l < o.length; l++) {
	            var p = o[l];p[0] >= i.left && p[0] <= i.left + r && p[1] >= i.top && p[1] <= i.top + s && (t = !0);
	          }if (!t) return;
	        }b.isHorizontal() ? ((37 === a || 39 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === a && !b.rtl || 37 === a && b.rtl) && b.slideNext(), (37 === a && !b.rtl || 39 === a && b.rtl) && b.slidePrev()) : ((38 === a || 40 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === a && b.slideNext(), 38 === a && b.slidePrev());
	      }
	    }function d(e) {
	      e.originalEvent && (e = e.originalEvent);var a = b.mousewheel.event,
	          t = 0,
	          i = b.rtl ? -1 : 1;if (e.detail) t = -e.detail;else if ("mousewheel" === a) {
	        if (b.params.mousewheelForceToAxis) {
	          if (b.isHorizontal()) {
	            if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY))) return;t = e.wheelDeltaX * i;
	          } else {
	            if (!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX))) return;t = e.wheelDeltaY;
	          }
	        } else t = Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY) ? -e.wheelDeltaX * i : -e.wheelDeltaY;
	      } else if ("DOMMouseScroll" === a) t = -e.detail;else if ("wheel" === a) if (b.params.mousewheelForceToAxis) {
	        if (b.isHorizontal()) {
	          if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY))) return;t = -e.deltaX * i;
	        } else {
	          if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX))) return;t = -e.deltaY;
	        }
	      } else t = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX * i : -e.deltaY;if (0 !== t) {
	        if (b.params.mousewheelInvert && (t = -t), b.params.freeMode) {
	          var r = b.getWrapperTranslate() + t * b.params.mousewheelSensitivity,
	              s = b.isBeginning,
	              n = b.isEnd;if (r >= b.minTranslate() && (r = b.minTranslate()), r <= b.maxTranslate() && (r = b.maxTranslate()), b.setWrapperTransition(0), b.setWrapperTranslate(r), b.updateProgress(), b.updateActiveIndex(), (!s && b.isBeginning || !n && b.isEnd) && b.updateClasses(), b.params.freeModeSticky ? (clearTimeout(b.mousewheel.timeout), b.mousewheel.timeout = setTimeout(function () {
	            b.slideReset();
	          }, 300)) : b.params.lazyLoading && b.lazy && b.lazy.load(), 0 === r || r === b.maxTranslate()) return;
	        } else {
	          if (new window.Date().getTime() - b.mousewheel.lastScrollTime > 60) if (0 > t) {
	            if (b.isEnd && !b.params.loop || b.animating) {
	              if (b.params.mousewheelReleaseOnEdges) return !0;
	            } else b.slideNext();
	          } else if (b.isBeginning && !b.params.loop || b.animating) {
	            if (b.params.mousewheelReleaseOnEdges) return !0;
	          } else b.slidePrev();b.mousewheel.lastScrollTime = new window.Date().getTime();
	        }return b.params.autoplay && b.stopAutoplay(), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1;
	      }
	    }function u(e, t) {
	      e = a(e);var i,
	          r,
	          s,
	          n = b.rtl ? -1 : 1;i = e.attr("data-swiper-parallax") || "0", r = e.attr("data-swiper-parallax-x"), s = e.attr("data-swiper-parallax-y"), r || s ? (r = r || "0", s = s || "0") : b.isHorizontal() ? (r = i, s = "0") : (s = i, r = "0"), r = r.indexOf("%") >= 0 ? parseInt(r, 10) * t * n + "%" : r * t * n + "px", s = s.indexOf("%") >= 0 ? parseInt(s, 10) * t + "%" : s * t + "px", e.transform("translate3d(" + r + ", " + s + ",0px)");
	    }function c(e) {
	      return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e;
	    }if (!(this instanceof t)) return new t(e, r);var m = { direction: "horizontal", touchEventsTarget: "container", initialSlide: 0, speed: 300, autoplay: !1, autoplayDisableOnInteraction: !0, autoplayStopOnLast: !1, iOSEdgeSwipeDetection: !1, iOSEdgeSwipeThreshold: 20, freeMode: !1, freeModeMomentum: !0, freeModeMomentumRatio: 1, freeModeMomentumBounce: !0, freeModeMomentumBounceRatio: 1, freeModeSticky: !1, freeModeMinimumVelocity: .02, autoHeight: !1, setWrapperSize: !1, virtualTranslate: !1, effect: "slide", coverflow: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0 }, flip: { slideShadows: !0, limitRotation: !0 }, cube: { slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94 }, fade: { crossFade: !1 }, parallax: !1, scrollbar: null, scrollbarHide: !0, scrollbarDraggable: !1, scrollbarSnapOnRelease: !1, keyboardControl: !1, mousewheelControl: !1, mousewheelReleaseOnEdges: !1, mousewheelInvert: !1, mousewheelForceToAxis: !1, mousewheelSensitivity: 1, hashnav: !1, breakpoints: void 0, spaceBetween: 0, slidesPerView: 1, slidesPerColumn: 1, slidesPerColumnFill: "column", slidesPerGroup: 1, centeredSlides: !1, slidesOffsetBefore: 0, slidesOffsetAfter: 0, roundLengths: !1, touchRatio: 1, touchAngle: 45, simulateTouch: !0, shortSwipes: !0, longSwipes: !0, longSwipesRatio: .5, longSwipesMs: 300, followFinger: !0, onlyExternal: !1, threshold: 0, touchMoveStopPropagation: !0, pagination: null, paginationElement: "span", paginationClickable: !1, paginationHide: !1, paginationBulletRender: null, paginationProgressRender: null, paginationFractionRender: null, paginationCustomRender: null, paginationType: "bullets", resistance: !0, resistanceRatio: .85, nextButton: null, prevButton: null, watchSlidesProgress: !1, watchSlidesVisibility: !1, grabCursor: !1, preventClicks: !0, preventClicksPropagation: !0, slideToClickedSlide: !1, lazyLoading: !1, lazyLoadingInPrevNext: !1, lazyLoadingInPrevNextAmount: 1, lazyLoadingOnTransitionStart: !1, preloadImages: !0, updateOnImagesReady: !0, loop: !1, loopAdditionalSlides: 0, loopedSlides: null, control: void 0, controlInverse: !1, controlBy: "slide", allowSwipeToPrev: !0, allowSwipeToNext: !0, swipeHandler: null, noSwiping: !0, noSwipingClass: "swiper-no-swiping", slideClass: "swiper-slide", slideActiveClass: "swiper-slide-active", slideVisibleClass: "swiper-slide-visible", slideDuplicateClass: "swiper-slide-duplicate", slideNextClass: "swiper-slide-next", slidePrevClass: "swiper-slide-prev", wrapperClass: "swiper-wrapper", bulletClass: "swiper-pagination-bullet", bulletActiveClass: "swiper-pagination-bullet-active", buttonDisabledClass: "swiper-button-disabled", paginationCurrentClass: "swiper-pagination-current", paginationTotalClass: "swiper-pagination-total", paginationHiddenClass: "swiper-pagination-hidden", paginationProgressbarClass: "swiper-pagination-progressbar", observer: !1, observeParents: !1, a11y: !1, prevSlideMessage: "Previous slide", nextSlideMessage: "Next slide", firstSlideMessage: "This is the first slide", lastSlideMessage: "This is the last slide", paginationBulletMessage: "Go to slide {{index}}", runCallbacksOnInit: !0 },
	        f = r && r.virtualTranslate;r = r || {};var h = {};for (var g in r) {
	      if ("object" != _typeof(r[g]) || null === r[g] || r[g].nodeType || r[g] === window || r[g] === document || "undefined" != typeof i && r[g] instanceof i || "undefined" != typeof jQuery && r[g] instanceof jQuery) h[g] = r[g];else {
	        h[g] = {};for (var v in r[g]) {
	          h[g][v] = r[g][v];
	        }
	      }
	    }for (var w in m) {
	      if ("undefined" == typeof r[w]) r[w] = m[w];else if ("object" == _typeof(r[w])) for (var y in m[w]) {
	        "undefined" == typeof r[w][y] && (r[w][y] = m[w][y]);
	      }
	    }var b = this;if (b.params = r, b.originalParams = h, b.classNames = [], "undefined" != typeof a && "undefined" != typeof i && (a = i), ("undefined" != typeof a || (a = "undefined" == typeof i ? window.Dom7 || window.Zepto || window.jQuery : i)) && (b.$ = a, b.currentBreakpoint = void 0, b.getActiveBreakpoint = function () {
	      if (!b.params.breakpoints) return !1;var e,
	          a = !1,
	          t = [];for (e in b.params.breakpoints) {
	        b.params.breakpoints.hasOwnProperty(e) && t.push(e);
	      }t.sort(function (e, a) {
	        return parseInt(e, 10) > parseInt(a, 10);
	      });for (var i = 0; i < t.length; i++) {
	        e = t[i], e >= window.innerWidth && !a && (a = e);
	      }return a || "max";
	    }, b.setBreakpoint = function () {
	      var e = b.getActiveBreakpoint();if (e && b.currentBreakpoint !== e) {
	        var a = e in b.params.breakpoints ? b.params.breakpoints[e] : b.originalParams;for (var t in a) {
	          b.params[t] = a[t];
	        }b.currentBreakpoint = e;
	      }
	    }, b.params.breakpoints && b.setBreakpoint(), b.container = a(e), 0 !== b.container.length)) {
	      if (b.container.length > 1) return void b.container.each(function () {
	        new t(this, r);
	      });b.container[0].swiper = b, b.container.data("swiper", b), b.classNames.push("swiper-container-" + b.params.direction), b.params.freeMode && b.classNames.push("swiper-container-free-mode"), b.support.flexbox || (b.classNames.push("swiper-container-no-flexbox"), b.params.slidesPerColumn = 1), b.params.autoHeight && b.classNames.push("swiper-container-autoheight"), (b.params.parallax || b.params.watchSlidesVisibility) && (b.params.watchSlidesProgress = !0), ["cube", "coverflow", "flip"].indexOf(b.params.effect) >= 0 && (b.support.transforms3d ? (b.params.watchSlidesProgress = !0, b.classNames.push("swiper-container-3d")) : b.params.effect = "slide"), "slide" !== b.params.effect && b.classNames.push("swiper-container-" + b.params.effect), "cube" === b.params.effect && (b.params.resistanceRatio = 0, b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.centeredSlides = !1, b.params.spaceBetween = 0, b.params.virtualTranslate = !0, b.params.setWrapperSize = !1), ("fade" === b.params.effect || "flip" === b.params.effect) && (b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.watchSlidesProgress = !0, b.params.spaceBetween = 0, b.params.setWrapperSize = !1, "undefined" == typeof f && (b.params.virtualTranslate = !0)), b.params.grabCursor && b.support.touch && (b.params.grabCursor = !1), b.wrapper = b.container.children("." + b.params.wrapperClass), b.params.pagination && (b.paginationContainer = a(b.params.pagination), "bullets" === b.params.paginationType && b.params.paginationClickable ? b.paginationContainer.addClass("swiper-pagination-clickable") : b.params.paginationClickable = !1, b.paginationContainer.addClass("swiper-pagination-" + b.params.paginationType)), b.isHorizontal = function () {
	        return "horizontal" === b.params.direction;
	      }, b.rtl = b.isHorizontal() && ("rtl" === b.container[0].dir.toLowerCase() || "rtl" === b.container.css("direction")), b.rtl && b.classNames.push("swiper-container-rtl"), b.rtl && (b.wrongRTL = "-webkit-box" === b.wrapper.css("display")), b.params.slidesPerColumn > 1 && b.classNames.push("swiper-container-multirow"), b.device.android && b.classNames.push("swiper-container-android"), b.container.addClass(b.classNames.join(" ")), b.translate = 0, b.progress = 0, b.velocity = 0, b.lockSwipeToNext = function () {
	        b.params.allowSwipeToNext = !1;
	      }, b.lockSwipeToPrev = function () {
	        b.params.allowSwipeToPrev = !1;
	      }, b.lockSwipes = function () {
	        b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !1;
	      }, b.unlockSwipeToNext = function () {
	        b.params.allowSwipeToNext = !0;
	      }, b.unlockSwipeToPrev = function () {
	        b.params.allowSwipeToPrev = !0;
	      }, b.unlockSwipes = function () {
	        b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !0;
	      }, b.params.grabCursor && (b.container[0].style.cursor = "move", b.container[0].style.cursor = "-webkit-grab", b.container[0].style.cursor = "-moz-grab", b.container[0].style.cursor = "grab"), b.imagesToLoad = [], b.imagesLoaded = 0, b.loadImage = function (e, a, t, i, r) {
	        function s() {
	          r && r();
	        }var n;e.complete && i ? s() : a ? (n = new window.Image(), n.onload = s, n.onerror = s, t && (n.srcset = t), a && (n.src = a)) : s();
	      }, b.preloadImages = function () {
	        function e() {
	          "undefined" != typeof b && null !== b && (void 0 !== b.imagesLoaded && b.imagesLoaded++, b.imagesLoaded === b.imagesToLoad.length && (b.params.updateOnImagesReady && b.update(), b.emit("onImagesReady", b)));
	        }b.imagesToLoad = b.container.find("img");for (var a = 0; a < b.imagesToLoad.length; a++) {
	          b.loadImage(b.imagesToLoad[a], b.imagesToLoad[a].currentSrc || b.imagesToLoad[a].getAttribute("src"), b.imagesToLoad[a].srcset || b.imagesToLoad[a].getAttribute("srcset"), !0, e);
	        }
	      }, b.autoplayTimeoutId = void 0, b.autoplaying = !1, b.autoplayPaused = !1, b.startAutoplay = function () {
	        return "undefined" != typeof b.autoplayTimeoutId ? !1 : b.params.autoplay ? b.autoplaying ? !1 : (b.autoplaying = !0, b.emit("onAutoplayStart", b), void n()) : !1;
	      }, b.stopAutoplay = function (e) {
	        b.autoplayTimeoutId && (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplaying = !1, b.autoplayTimeoutId = void 0, b.emit("onAutoplayStop", b));
	      }, b.pauseAutoplay = function (e) {
	        b.autoplayPaused || (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplayPaused = !0, 0 === e ? (b.autoplayPaused = !1, n()) : b.wrapper.transitionEnd(function () {
	          b && (b.autoplayPaused = !1, b.autoplaying ? n() : b.stopAutoplay());
	        }));
	      }, b.minTranslate = function () {
	        return -b.snapGrid[0];
	      }, b.maxTranslate = function () {
	        return -b.snapGrid[b.snapGrid.length - 1];
	      }, b.updateAutoHeight = function () {
	        var e = b.slides.eq(b.activeIndex)[0];if ("undefined" != typeof e) {
	          var a = e.offsetHeight;a && b.wrapper.css("height", a + "px");
	        }
	      }, b.updateContainerSize = function () {
	        var e, a;e = "undefined" != typeof b.params.width ? b.params.width : b.container[0].clientWidth, a = "undefined" != typeof b.params.height ? b.params.height : b.container[0].clientHeight, 0 === e && b.isHorizontal() || 0 === a && !b.isHorizontal() || (e = e - parseInt(b.container.css("padding-left"), 10) - parseInt(b.container.css("padding-right"), 10), a = a - parseInt(b.container.css("padding-top"), 10) - parseInt(b.container.css("padding-bottom"), 10), b.width = e, b.height = a, b.size = b.isHorizontal() ? b.width : b.height);
	      }, b.updateSlidesSize = function () {
	        b.slides = b.wrapper.children("." + b.params.slideClass), b.snapGrid = [], b.slidesGrid = [], b.slidesSizesGrid = [];var e,
	            a = b.params.spaceBetween,
	            t = -b.params.slidesOffsetBefore,
	            i = 0,
	            r = 0;"string" == typeof a && a.indexOf("%") >= 0 && (a = parseFloat(a.replace("%", "")) / 100 * b.size), b.virtualSize = -a, b.rtl ? b.slides.css({ marginLeft: "", marginTop: "" }) : b.slides.css({ marginRight: "", marginBottom: "" });var n;b.params.slidesPerColumn > 1 && (n = Math.floor(b.slides.length / b.params.slidesPerColumn) === b.slides.length / b.params.slidesPerColumn ? b.slides.length : Math.ceil(b.slides.length / b.params.slidesPerColumn) * b.params.slidesPerColumn, "auto" !== b.params.slidesPerView && "row" === b.params.slidesPerColumnFill && (n = Math.max(n, b.params.slidesPerView * b.params.slidesPerColumn)));var o,
	            l = b.params.slidesPerColumn,
	            p = n / l,
	            d = p - (b.params.slidesPerColumn * p - b.slides.length);for (e = 0; e < b.slides.length; e++) {
	          o = 0;var u = b.slides.eq(e);if (b.params.slidesPerColumn > 1) {
	            var c, m, f;"column" === b.params.slidesPerColumnFill ? (m = Math.floor(e / l), f = e - m * l, (m > d || m === d && f === l - 1) && ++f >= l && (f = 0, m++), c = m + f * n / l, u.css({ "-webkit-box-ordinal-group": c, "-moz-box-ordinal-group": c, "-ms-flex-order": c, "-webkit-order": c, order: c })) : (f = Math.floor(e / p), m = e - f * p), u.css({ "margin-top": 0 !== f && b.params.spaceBetween && b.params.spaceBetween + "px" }).attr("data-swiper-column", m).attr("data-swiper-row", f);
	          }"none" !== u.css("display") && ("auto" === b.params.slidesPerView ? (o = b.isHorizontal() ? u.outerWidth(!0) : u.outerHeight(!0), b.params.roundLengths && (o = s(o))) : (o = (b.size - (b.params.slidesPerView - 1) * a) / b.params.slidesPerView, b.params.roundLengths && (o = s(o)), b.isHorizontal() ? b.slides[e].style.width = o + "px" : b.slides[e].style.height = o + "px"), b.slides[e].swiperSlideSize = o, b.slidesSizesGrid.push(o), b.params.centeredSlides ? (t = t + o / 2 + i / 2 + a, 0 === e && (t = t - b.size / 2 - a), Math.abs(t) < .001 && (t = 0), r % b.params.slidesPerGroup === 0 && b.snapGrid.push(t), b.slidesGrid.push(t)) : (r % b.params.slidesPerGroup === 0 && b.snapGrid.push(t), b.slidesGrid.push(t), t = t + o + a), b.virtualSize += o + a, i = o, r++);
	        }b.virtualSize = Math.max(b.virtualSize, b.size) + b.params.slidesOffsetAfter;var h;if (b.rtl && b.wrongRTL && ("slide" === b.params.effect || "coverflow" === b.params.effect) && b.wrapper.css({ width: b.virtualSize + b.params.spaceBetween + "px" }), (!b.support.flexbox || b.params.setWrapperSize) && (b.isHorizontal() ? b.wrapper.css({ width: b.virtualSize + b.params.spaceBetween + "px" }) : b.wrapper.css({ height: b.virtualSize + b.params.spaceBetween + "px" })), b.params.slidesPerColumn > 1 && (b.virtualSize = (o + b.params.spaceBetween) * n, b.virtualSize = Math.ceil(b.virtualSize / b.params.slidesPerColumn) - b.params.spaceBetween, b.wrapper.css({ width: b.virtualSize + b.params.spaceBetween + "px" }), b.params.centeredSlides)) {
	          for (h = [], e = 0; e < b.snapGrid.length; e++) {
	            b.snapGrid[e] < b.virtualSize + b.snapGrid[0] && h.push(b.snapGrid[e]);
	          }b.snapGrid = h;
	        }if (!b.params.centeredSlides) {
	          for (h = [], e = 0; e < b.snapGrid.length; e++) {
	            b.snapGrid[e] <= b.virtualSize - b.size && h.push(b.snapGrid[e]);
	          }b.snapGrid = h, Math.floor(b.virtualSize - b.size) > Math.floor(b.snapGrid[b.snapGrid.length - 1]) && b.snapGrid.push(b.virtualSize - b.size);
	        }0 === b.snapGrid.length && (b.snapGrid = [0]), 0 !== b.params.spaceBetween && (b.isHorizontal() ? b.rtl ? b.slides.css({ marginLeft: a + "px" }) : b.slides.css({ marginRight: a + "px" }) : b.slides.css({ marginBottom: a + "px" })), b.params.watchSlidesProgress && b.updateSlidesOffset();
	      }, b.updateSlidesOffset = function () {
	        for (var e = 0; e < b.slides.length; e++) {
	          b.slides[e].swiperSlideOffset = b.isHorizontal() ? b.slides[e].offsetLeft : b.slides[e].offsetTop;
	        }
	      }, b.updateSlidesProgress = function (e) {
	        if ("undefined" == typeof e && (e = b.translate || 0), 0 !== b.slides.length) {
	          "undefined" == typeof b.slides[0].swiperSlideOffset && b.updateSlidesOffset();var a = -e;b.rtl && (a = e), b.slides.removeClass(b.params.slideVisibleClass);for (var t = 0; t < b.slides.length; t++) {
	            var i = b.slides[t],
	                r = (a - i.swiperSlideOffset) / (i.swiperSlideSize + b.params.spaceBetween);if (b.params.watchSlidesVisibility) {
	              var s = -(a - i.swiperSlideOffset),
	                  n = s + b.slidesSizesGrid[t],
	                  o = s >= 0 && s < b.size || n > 0 && n <= b.size || 0 >= s && n >= b.size;o && b.slides.eq(t).addClass(b.params.slideVisibleClass);
	            }i.progress = b.rtl ? -r : r;
	          }
	        }
	      }, b.updateProgress = function (e) {
	        "undefined" == typeof e && (e = b.translate || 0);var a = b.maxTranslate() - b.minTranslate(),
	            t = b.isBeginning,
	            i = b.isEnd;0 === a ? (b.progress = 0, b.isBeginning = b.isEnd = !0) : (b.progress = (e - b.minTranslate()) / a, b.isBeginning = b.progress <= 0, b.isEnd = b.progress >= 1), b.isBeginning && !t && b.emit("onReachBeginning", b), b.isEnd && !i && b.emit("onReachEnd", b), b.params.watchSlidesProgress && b.updateSlidesProgress(e), b.emit("onProgress", b, b.progress);
	      }, b.updateActiveIndex = function () {
	        var e,
	            a,
	            t,
	            i = b.rtl ? b.translate : -b.translate;for (a = 0; a < b.slidesGrid.length; a++) {
	          "undefined" != typeof b.slidesGrid[a + 1] ? i >= b.slidesGrid[a] && i < b.slidesGrid[a + 1] - (b.slidesGrid[a + 1] - b.slidesGrid[a]) / 2 ? e = a : i >= b.slidesGrid[a] && i < b.slidesGrid[a + 1] && (e = a + 1) : i >= b.slidesGrid[a] && (e = a);
	        }(0 > e || "undefined" == typeof e) && (e = 0), t = Math.floor(e / b.params.slidesPerGroup), t >= b.snapGrid.length && (t = b.snapGrid.length - 1), e !== b.activeIndex && (b.snapIndex = t, b.previousIndex = b.activeIndex, b.activeIndex = e, b.updateClasses());
	      }, b.updateClasses = function () {
	        b.slides.removeClass(b.params.slideActiveClass + " " + b.params.slideNextClass + " " + b.params.slidePrevClass);var e = b.slides.eq(b.activeIndex);if (e.addClass(b.params.slideActiveClass), e.next("." + b.params.slideClass).addClass(b.params.slideNextClass), e.prev("." + b.params.slideClass).addClass(b.params.slidePrevClass), b.paginationContainer && b.paginationContainer.length > 0) {
	          var t,
	              i = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length;if (b.params.loop ? (t = Math.ceil(b.activeIndex - b.loopedSlides) / b.params.slidesPerGroup, t > b.slides.length - 1 - 2 * b.loopedSlides && (t -= b.slides.length - 2 * b.loopedSlides), t > i - 1 && (t -= i), 0 > t && "bullets" !== b.params.paginationType && (t = i + t)) : t = "undefined" != typeof b.snapIndex ? b.snapIndex : b.activeIndex || 0, "bullets" === b.params.paginationType && b.bullets && b.bullets.length > 0 && (b.bullets.removeClass(b.params.bulletActiveClass), b.paginationContainer.length > 1 ? b.bullets.each(function () {
	            a(this).index() === t && a(this).addClass(b.params.bulletActiveClass);
	          }) : b.bullets.eq(t).addClass(b.params.bulletActiveClass)), "fraction" === b.params.paginationType && (b.paginationContainer.find("." + b.params.paginationCurrentClass).text(t + 1), b.paginationContainer.find("." + b.params.paginationTotalClass).text(i)), "progress" === b.params.paginationType) {
	            var r = (t + 1) / i,
	                s = r,
	                n = 1;b.isHorizontal() || (n = r, s = 1), b.paginationContainer.find("." + b.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + s + ") scaleY(" + n + ")").transition(b.params.speed);
	          }"custom" === b.params.paginationType && b.params.paginationCustomRender && b.paginationContainer.html(b.params.paginationCustomRender(b, t + 1, i));
	        }b.params.loop || (b.params.prevButton && (b.isBeginning ? (a(b.params.prevButton).addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(a(b.params.prevButton))) : (a(b.params.prevButton).removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(a(b.params.prevButton)))), b.params.nextButton && (b.isEnd ? (a(b.params.nextButton).addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(a(b.params.nextButton))) : (a(b.params.nextButton).removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(a(b.params.nextButton)))));
	      }, b.updatePagination = function () {
	        if (b.params.pagination && b.paginationContainer && b.paginationContainer.length > 0) {
	          var e = "";if ("bullets" === b.params.paginationType) {
	            for (var a = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length, t = 0; a > t; t++) {
	              e += b.params.paginationBulletRender ? b.params.paginationBulletRender(t, b.params.bulletClass) : "<" + b.params.paginationElement + ' class="' + b.params.bulletClass + '"></' + b.params.paginationElement + ">";
	            }b.paginationContainer.html(e), b.bullets = b.paginationContainer.find("." + b.params.bulletClass), b.params.paginationClickable && b.params.a11y && b.a11y && b.a11y.initPagination();
	          }"fraction" === b.params.paginationType && (e = b.params.paginationFractionRender ? b.params.paginationFractionRender(b, b.params.paginationCurrentClass, b.params.paginationTotalClass) : '<span class="' + b.params.paginationCurrentClass + '"></span> / <span class="' + b.params.paginationTotalClass + '"></span>', b.paginationContainer.html(e)), "progress" === b.params.paginationType && (e = b.params.paginationProgressRender ? b.params.paginationProgressRender(b, b.params.paginationProgressbarClass) : '<span class="' + b.params.paginationProgressbarClass + '"></span>', b.paginationContainer.html(e));
	        }
	      }, b.update = function (e) {
	        function a() {
	          i = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate()), b.setWrapperTranslate(i), b.updateActiveIndex(), b.updateClasses();
	        }if (b.updateContainerSize(), b.updateSlidesSize(), b.updateProgress(), b.updatePagination(), b.updateClasses(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), e) {
	          var t, i;b.controller && b.controller.spline && (b.controller.spline = void 0), b.params.freeMode ? (a(), b.params.autoHeight && b.updateAutoHeight()) : (t = ("auto" === b.params.slidesPerView || b.params.slidesPerView > 1) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0), t || a());
	        } else b.params.autoHeight && b.updateAutoHeight();
	      }, b.onResize = function (e) {
	        b.params.breakpoints && b.setBreakpoint();var a = b.params.allowSwipeToPrev,
	            t = b.params.allowSwipeToNext;if (b.params.allowSwipeToPrev = b.params.allowSwipeToNext = !0, b.updateContainerSize(), b.updateSlidesSize(), ("auto" === b.params.slidesPerView || b.params.freeMode || e) && b.updatePagination(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), b.controller && b.controller.spline && (b.controller.spline = void 0), b.params.freeMode) {
	          var i = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate());b.setWrapperTranslate(i), b.updateActiveIndex(), b.updateClasses(), b.params.autoHeight && b.updateAutoHeight();
	        } else b.updateClasses(), ("auto" === b.params.slidesPerView || b.params.slidesPerView > 1) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0);b.params.allowSwipeToPrev = a, b.params.allowSwipeToNext = t;
	      };var T = ["mousedown", "mousemove", "mouseup"];window.navigator.pointerEnabled ? T = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled && (T = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), b.touchEvents = { start: b.support.touch || !b.params.simulateTouch ? "touchstart" : T[0], move: b.support.touch || !b.params.simulateTouch ? "touchmove" : T[1], end: b.support.touch || !b.params.simulateTouch ? "touchend" : T[2] }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === b.params.touchEventsTarget ? b.container : b.wrapper).addClass("swiper-wp8-" + b.params.direction), b.initEvents = function (e) {
	        var t = e ? "off" : "on",
	            i = e ? "removeEventListener" : "addEventListener",
	            s = "container" === b.params.touchEventsTarget ? b.container[0] : b.wrapper[0],
	            n = b.support.touch ? s : document,
	            o = b.params.nested ? !0 : !1;b.browser.ie ? (s[i](b.touchEvents.start, b.onTouchStart, !1), n[i](b.touchEvents.move, b.onTouchMove, o), n[i](b.touchEvents.end, b.onTouchEnd, !1)) : (b.support.touch && (s[i](b.touchEvents.start, b.onTouchStart, !1), s[i](b.touchEvents.move, b.onTouchMove, o), s[i](b.touchEvents.end, b.onTouchEnd, !1)), !r.simulateTouch || b.device.ios || b.device.android || (s[i]("mousedown", b.onTouchStart, !1), document[i]("mousemove", b.onTouchMove, o), document[i]("mouseup", b.onTouchEnd, !1))), window[i]("resize", b.onResize), b.params.nextButton && (a(b.params.nextButton)[t]("click", b.onClickNext), b.params.a11y && b.a11y && a(b.params.nextButton)[t]("keydown", b.a11y.onEnterKey)), b.params.prevButton && (a(b.params.prevButton)[t]("click", b.onClickPrev), b.params.a11y && b.a11y && a(b.params.prevButton)[t]("keydown", b.a11y.onEnterKey)), b.params.pagination && b.params.paginationClickable && (a(b.paginationContainer)[t]("click", "." + b.params.bulletClass, b.onClickIndex), b.params.a11y && b.a11y && a(b.paginationContainer)[t]("keydown", "." + b.params.bulletClass, b.a11y.onEnterKey)), (b.params.preventClicks || b.params.preventClicksPropagation) && s[i]("click", b.preventClicks, !0);
	      }, b.attachEvents = function (e) {
	        b.initEvents();
	      }, b.detachEvents = function () {
	        b.initEvents(!0);
	      }, b.allowClick = !0, b.preventClicks = function (e) {
	        b.allowClick || (b.params.preventClicks && e.preventDefault(), b.params.preventClicksPropagation && b.animating && (e.stopPropagation(), e.stopImmediatePropagation()));
	      }, b.onClickNext = function (e) {
	        e.preventDefault(), (!b.isEnd || b.params.loop) && b.slideNext();
	      }, b.onClickPrev = function (e) {
	        e.preventDefault(), (!b.isBeginning || b.params.loop) && b.slidePrev();
	      }, b.onClickIndex = function (e) {
	        e.preventDefault();var t = a(this).index() * b.params.slidesPerGroup;b.params.loop && (t += b.loopedSlides), b.slideTo(t);
	      }, b.updateClickedSlide = function (e) {
	        var t = o(e, "." + b.params.slideClass),
	            i = !1;if (t) for (var r = 0; r < b.slides.length; r++) {
	          b.slides[r] === t && (i = !0);
	        }if (!t || !i) return b.clickedSlide = void 0, void (b.clickedIndex = void 0);if (b.clickedSlide = t, b.clickedIndex = a(t).index(), b.params.slideToClickedSlide && void 0 !== b.clickedIndex && b.clickedIndex !== b.activeIndex) {
	          var s,
	              n = b.clickedIndex;if (b.params.loop) {
	            if (b.animating) return;s = a(b.clickedSlide).attr("data-swiper-slide-index"), b.params.centeredSlides ? n < b.loopedSlides - b.params.slidesPerView / 2 || n > b.slides.length - b.loopedSlides + b.params.slidesPerView / 2 ? (b.fixLoop(), n = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + s + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function () {
	              b.slideTo(n);
	            }, 0)) : b.slideTo(n) : n > b.slides.length - b.params.slidesPerView ? (b.fixLoop(), n = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + s + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function () {
	              b.slideTo(n);
	            }, 0)) : b.slideTo(n);
	          } else b.slideTo(n);
	        }
	      };var x,
	          S,
	          C,
	          z,
	          M,
	          P,
	          E,
	          k,
	          I,
	          L,
	          D = "input, select, textarea, button",
	          H = Date.now(),
	          B = [];b.animating = !1, b.touches = { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 };var A, G;if (b.onTouchStart = function (e) {
	        if (e.originalEvent && (e = e.originalEvent), A = "touchstart" === e.type, A || !("which" in e) || 3 !== e.which) {
	          if (b.params.noSwiping && o(e, "." + b.params.noSwipingClass)) return void (b.allowClick = !0);if (!b.params.swipeHandler || o(e, b.params.swipeHandler)) {
	            var t = b.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
	                i = b.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;if (!(b.device.ios && b.params.iOSEdgeSwipeDetection && t <= b.params.iOSEdgeSwipeThreshold)) {
	              if (x = !0, S = !1, C = !0, M = void 0, G = void 0, b.touches.startX = t, b.touches.startY = i, z = Date.now(), b.allowClick = !0, b.updateContainerSize(), b.swipeDirection = void 0, b.params.threshold > 0 && (k = !1), "touchstart" !== e.type) {
	                var r = !0;a(e.target).is(D) && (r = !1), document.activeElement && a(document.activeElement).is(D) && document.activeElement.blur(), r && e.preventDefault();
	              }b.emit("onTouchStart", b, e);
	            }
	          }
	        }
	      }, b.onTouchMove = function (e) {
	        if (e.originalEvent && (e = e.originalEvent), !(A && "mousemove" === e.type || e.preventedByNestedSwiper)) {
	          if (b.params.onlyExternal) return b.allowClick = !1, void (x && (b.touches.startX = b.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, b.touches.startY = b.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, z = Date.now()));if (A && document.activeElement && e.target === document.activeElement && a(e.target).is(D)) return S = !0, void (b.allowClick = !1);if (C && b.emit("onTouchMove", b, e), !(e.targetTouches && e.targetTouches.length > 1)) {
	            if (b.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, b.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, "undefined" == typeof M) {
	              var t = 180 * Math.atan2(Math.abs(b.touches.currentY - b.touches.startY), Math.abs(b.touches.currentX - b.touches.startX)) / Math.PI;M = b.isHorizontal() ? t > b.params.touchAngle : 90 - t > b.params.touchAngle;
	            }if (M && b.emit("onTouchMoveOpposite", b, e), "undefined" == typeof G && b.browser.ieTouch && (b.touches.currentX !== b.touches.startX || b.touches.currentY !== b.touches.startY) && (G = !0), x) {
	              if (M) return void (x = !1);if (G || !b.browser.ieTouch) {
	                b.allowClick = !1, b.emit("onSliderMove", b, e), e.preventDefault(), b.params.touchMoveStopPropagation && !b.params.nested && e.stopPropagation(), S || (r.loop && b.fixLoop(), E = b.getWrapperTranslate(), b.setWrapperTransition(0), b.animating && b.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), b.params.autoplay && b.autoplaying && (b.params.autoplayDisableOnInteraction ? b.stopAutoplay() : b.pauseAutoplay()), L = !1, b.params.grabCursor && (b.container[0].style.cursor = "move", b.container[0].style.cursor = "-webkit-grabbing", b.container[0].style.cursor = "-moz-grabbin", b.container[0].style.cursor = "grabbing")), S = !0;var i = b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY;i *= b.params.touchRatio, b.rtl && (i = -i), b.swipeDirection = i > 0 ? "prev" : "next", P = i + E;var s = !0;if (i > 0 && P > b.minTranslate() ? (s = !1, b.params.resistance && (P = b.minTranslate() - 1 + Math.pow(-b.minTranslate() + E + i, b.params.resistanceRatio))) : 0 > i && P < b.maxTranslate() && (s = !1, b.params.resistance && (P = b.maxTranslate() + 1 - Math.pow(b.maxTranslate() - E - i, b.params.resistanceRatio))), s && (e.preventedByNestedSwiper = !0), !b.params.allowSwipeToNext && "next" === b.swipeDirection && E > P && (P = E), !b.params.allowSwipeToPrev && "prev" === b.swipeDirection && P > E && (P = E), b.params.followFinger) {
	                  if (b.params.threshold > 0) {
	                    if (!(Math.abs(i) > b.params.threshold || k)) return void (P = E);if (!k) return k = !0, b.touches.startX = b.touches.currentX, b.touches.startY = b.touches.currentY, P = E, void (b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY);
	                  }(b.params.freeMode || b.params.watchSlidesProgress) && b.updateActiveIndex(), b.params.freeMode && (0 === B.length && B.push({ position: b.touches[b.isHorizontal() ? "startX" : "startY"], time: z }), B.push({ position: b.touches[b.isHorizontal() ? "currentX" : "currentY"], time: new window.Date().getTime() })), b.updateProgress(P), b.setWrapperTranslate(P);
	                }
	              }
	            }
	          }
	        }
	      }, b.onTouchEnd = function (e) {
	        if (e.originalEvent && (e = e.originalEvent), C && b.emit("onTouchEnd", b, e), C = !1, x) {
	          b.params.grabCursor && S && x && (b.container[0].style.cursor = "move", b.container[0].style.cursor = "-webkit-grab", b.container[0].style.cursor = "-moz-grab", b.container[0].style.cursor = "grab");var t = Date.now(),
	              i = t - z;if (b.allowClick && (b.updateClickedSlide(e), b.emit("onTap", b, e), 300 > i && t - H > 300 && (I && clearTimeout(I), I = setTimeout(function () {
	            b && (b.params.paginationHide && b.paginationContainer.length > 0 && !a(e.target).hasClass(b.params.bulletClass) && b.paginationContainer.toggleClass(b.params.paginationHiddenClass), b.emit("onClick", b, e));
	          }, 300)), 300 > i && 300 > t - H && (I && clearTimeout(I), b.emit("onDoubleTap", b, e))), H = Date.now(), setTimeout(function () {
	            b && (b.allowClick = !0);
	          }, 0), !x || !S || !b.swipeDirection || 0 === b.touches.diff || P === E) return void (x = S = !1);x = S = !1;var r;if (r = b.params.followFinger ? b.rtl ? b.translate : -b.translate : -P, b.params.freeMode) {
	            if (r < -b.minTranslate()) return void b.slideTo(b.activeIndex);if (r > -b.maxTranslate()) return void (b.slides.length < b.snapGrid.length ? b.slideTo(b.snapGrid.length - 1) : b.slideTo(b.slides.length - 1));if (b.params.freeModeMomentum) {
	              if (B.length > 1) {
	                var s = B.pop(),
	                    n = B.pop(),
	                    o = s.position - n.position,
	                    l = s.time - n.time;b.velocity = o / l, b.velocity = b.velocity / 2, Math.abs(b.velocity) < b.params.freeModeMinimumVelocity && (b.velocity = 0), (l > 150 || new window.Date().getTime() - s.time > 300) && (b.velocity = 0);
	              } else b.velocity = 0;B.length = 0;var p = 1e3 * b.params.freeModeMomentumRatio,
	                  d = b.velocity * p,
	                  u = b.translate + d;b.rtl && (u = -u);var c,
	                  m = !1,
	                  f = 20 * Math.abs(b.velocity) * b.params.freeModeMomentumBounceRatio;if (u < b.maxTranslate()) b.params.freeModeMomentumBounce ? (u + b.maxTranslate() < -f && (u = b.maxTranslate() - f), c = b.maxTranslate(), m = !0, L = !0) : u = b.maxTranslate();else if (u > b.minTranslate()) b.params.freeModeMomentumBounce ? (u - b.minTranslate() > f && (u = b.minTranslate() + f), c = b.minTranslate(), m = !0, L = !0) : u = b.minTranslate();else if (b.params.freeModeSticky) {
	                var h,
	                    g = 0;for (g = 0; g < b.snapGrid.length; g += 1) {
	                  if (b.snapGrid[g] > -u) {
	                    h = g;break;
	                  }
	                }u = Math.abs(b.snapGrid[h] - u) < Math.abs(b.snapGrid[h - 1] - u) || "next" === b.swipeDirection ? b.snapGrid[h] : b.snapGrid[h - 1], b.rtl || (u = -u);
	              }if (0 !== b.velocity) p = b.rtl ? Math.abs((-u - b.translate) / b.velocity) : Math.abs((u - b.translate) / b.velocity);else if (b.params.freeModeSticky) return void b.slideReset();b.params.freeModeMomentumBounce && m ? (b.updateProgress(c), b.setWrapperTransition(p), b.setWrapperTranslate(u), b.onTransitionStart(), b.animating = !0, b.wrapper.transitionEnd(function () {
	                b && L && (b.emit("onMomentumBounce", b), b.setWrapperTransition(b.params.speed), b.setWrapperTranslate(c), b.wrapper.transitionEnd(function () {
	                  b && b.onTransitionEnd();
	                }));
	              })) : b.velocity ? (b.updateProgress(u), b.setWrapperTransition(p), b.setWrapperTranslate(u), b.onTransitionStart(), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function () {
	                b && b.onTransitionEnd();
	              }))) : b.updateProgress(u), b.updateActiveIndex();
	            }return void ((!b.params.freeModeMomentum || i >= b.params.longSwipesMs) && (b.updateProgress(), b.updateActiveIndex()));
	          }var v,
	              w = 0,
	              y = b.slidesSizesGrid[0];for (v = 0; v < b.slidesGrid.length; v += b.params.slidesPerGroup) {
	            "undefined" != typeof b.slidesGrid[v + b.params.slidesPerGroup] ? r >= b.slidesGrid[v] && r < b.slidesGrid[v + b.params.slidesPerGroup] && (w = v, y = b.slidesGrid[v + b.params.slidesPerGroup] - b.slidesGrid[v]) : r >= b.slidesGrid[v] && (w = v, y = b.slidesGrid[b.slidesGrid.length - 1] - b.slidesGrid[b.slidesGrid.length - 2]);
	          }var T = (r - b.slidesGrid[w]) / y;if (i > b.params.longSwipesMs) {
	            if (!b.params.longSwipes) return void b.slideTo(b.activeIndex);"next" === b.swipeDirection && (T >= b.params.longSwipesRatio ? b.slideTo(w + b.params.slidesPerGroup) : b.slideTo(w)), "prev" === b.swipeDirection && (T > 1 - b.params.longSwipesRatio ? b.slideTo(w + b.params.slidesPerGroup) : b.slideTo(w));
	          } else {
	            if (!b.params.shortSwipes) return void b.slideTo(b.activeIndex);"next" === b.swipeDirection && b.slideTo(w + b.params.slidesPerGroup), "prev" === b.swipeDirection && b.slideTo(w);
	          }
	        }
	      }, b._slideTo = function (e, a) {
	        return b.slideTo(e, a, !0, !0);
	      }, b.slideTo = function (e, a, t, i) {
	        "undefined" == typeof t && (t = !0), "undefined" == typeof e && (e = 0), 0 > e && (e = 0), b.snapIndex = Math.floor(e / b.params.slidesPerGroup), b.snapIndex >= b.snapGrid.length && (b.snapIndex = b.snapGrid.length - 1);var r = -b.snapGrid[b.snapIndex];b.params.autoplay && b.autoplaying && (i || !b.params.autoplayDisableOnInteraction ? b.pauseAutoplay(a) : b.stopAutoplay()), b.updateProgress(r);for (var s = 0; s < b.slidesGrid.length; s++) {
	          -Math.floor(100 * r) >= Math.floor(100 * b.slidesGrid[s]) && (e = s);
	        }return !b.params.allowSwipeToNext && r < b.translate && r < b.minTranslate() ? !1 : !b.params.allowSwipeToPrev && r > b.translate && r > b.maxTranslate() && (b.activeIndex || 0) !== e ? !1 : ("undefined" == typeof a && (a = b.params.speed), b.previousIndex = b.activeIndex || 0, b.activeIndex = e, b.rtl && -r === b.translate || !b.rtl && r === b.translate ? (b.params.autoHeight && b.updateAutoHeight(), b.updateClasses(), "slide" !== b.params.effect && b.setWrapperTranslate(r), !1) : (b.updateClasses(), b.onTransitionStart(t), 0 === a ? (b.setWrapperTranslate(r), b.setWrapperTransition(0), b.onTransitionEnd(t)) : (b.setWrapperTranslate(r), b.setWrapperTransition(a), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function () {
	          b && b.onTransitionEnd(t);
	        }))), !0));
	      }, b.onTransitionStart = function (e) {
	        "undefined" == typeof e && (e = !0), b.params.autoHeight && b.updateAutoHeight(), b.lazy && b.lazy.onTransitionStart(), e && (b.emit("onTransitionStart", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeStart", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextStart", b) : b.emit("onSlidePrevStart", b)));
	      }, b.onTransitionEnd = function (e) {
	        b.animating = !1, b.setWrapperTransition(0), "undefined" == typeof e && (e = !0), b.lazy && b.lazy.onTransitionEnd(), e && (b.emit("onTransitionEnd", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeEnd", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextEnd", b) : b.emit("onSlidePrevEnd", b))), b.params.hashnav && b.hashnav && b.hashnav.setHash();
	      }, b.slideNext = function (e, a, t) {
	        if (b.params.loop) {
	          if (b.animating) return !1;b.fixLoop();b.container[0].clientLeft;return b.slideTo(b.activeIndex + b.params.slidesPerGroup, a, e, t);
	        }return b.slideTo(b.activeIndex + b.params.slidesPerGroup, a, e, t);
	      }, b._slideNext = function (e) {
	        return b.slideNext(!0, e, !0);
	      }, b.slidePrev = function (e, a, t) {
	        if (b.params.loop) {
	          if (b.animating) return !1;b.fixLoop();b.container[0].clientLeft;return b.slideTo(b.activeIndex - 1, a, e, t);
	        }return b.slideTo(b.activeIndex - 1, a, e, t);
	      }, b._slidePrev = function (e) {
	        return b.slidePrev(!0, e, !0);
	      }, b.slideReset = function (e, a, t) {
	        return b.slideTo(b.activeIndex, a, e);
	      }, b.setWrapperTransition = function (e, a) {
	        b.wrapper.transition(e), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTransition(e), b.params.parallax && b.parallax && b.parallax.setTransition(e), b.params.scrollbar && b.scrollbar && b.scrollbar.setTransition(e), b.params.control && b.controller && b.controller.setTransition(e, a), b.emit("onSetTransition", b, e);
	      }, b.setWrapperTranslate = function (e, a, t) {
	        var i = 0,
	            r = 0,
	            n = 0;b.isHorizontal() ? i = b.rtl ? -e : e : r = e, b.params.roundLengths && (i = s(i), r = s(r)), b.params.virtualTranslate || (b.support.transforms3d ? b.wrapper.transform("translate3d(" + i + "px, " + r + "px, " + n + "px)") : b.wrapper.transform("translate(" + i + "px, " + r + "px)")), b.translate = b.isHorizontal() ? i : r;var o,
	            l = b.maxTranslate() - b.minTranslate();o = 0 === l ? 0 : (e - b.minTranslate()) / l, o !== b.progress && b.updateProgress(e), a && b.updateActiveIndex(), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTranslate(b.translate), b.params.parallax && b.parallax && b.parallax.setTranslate(b.translate), b.params.scrollbar && b.scrollbar && b.scrollbar.setTranslate(b.translate), b.params.control && b.controller && b.controller.setTranslate(b.translate, t), b.emit("onSetTranslate", b, b.translate);
	      }, b.getTranslate = function (e, a) {
	        var t, i, r, s;return "undefined" == typeof a && (a = "x"), b.params.virtualTranslate ? b.rtl ? -b.translate : b.translate : (r = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (i = r.transform || r.webkitTransform, i.split(",").length > 6 && (i = i.split(", ").map(function (e) {
	          return e.replace(",", ".");
	        }).join(", ")), s = new window.WebKitCSSMatrix("none" === i ? "" : i)) : (s = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), t = s.toString().split(",")), "x" === a && (i = window.WebKitCSSMatrix ? s.m41 : 16 === t.length ? parseFloat(t[12]) : parseFloat(t[4])), "y" === a && (i = window.WebKitCSSMatrix ? s.m42 : 16 === t.length ? parseFloat(t[13]) : parseFloat(t[5])), b.rtl && i && (i = -i), i || 0);
	      }, b.getWrapperTranslate = function (e) {
	        return "undefined" == typeof e && (e = b.isHorizontal() ? "x" : "y"), b.getTranslate(b.wrapper[0], e);
	      }, b.observers = [], b.initObservers = function () {
	        if (b.params.observeParents) for (var e = b.container.parents(), a = 0; a < e.length; a++) {
	          l(e[a]);
	        }l(b.container[0], { childList: !1 }), l(b.wrapper[0], { attributes: !1 });
	      }, b.disconnectObservers = function () {
	        for (var e = 0; e < b.observers.length; e++) {
	          b.observers[e].disconnect();
	        }b.observers = [];
	      }, b.createLoop = function () {
	        b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove();var e = b.wrapper.children("." + b.params.slideClass);"auto" !== b.params.slidesPerView || b.params.loopedSlides || (b.params.loopedSlides = e.length), b.loopedSlides = parseInt(b.params.loopedSlides || b.params.slidesPerView, 10), b.loopedSlides = b.loopedSlides + b.params.loopAdditionalSlides, b.loopedSlides > e.length && (b.loopedSlides = e.length);var t,
	            i = [],
	            r = [];for (e.each(function (t, s) {
	          var n = a(this);t < b.loopedSlides && r.push(s), t < e.length && t >= e.length - b.loopedSlides && i.push(s), n.attr("data-swiper-slide-index", t);
	        }), t = 0; t < r.length; t++) {
	          b.wrapper.append(a(r[t].cloneNode(!0)).addClass(b.params.slideDuplicateClass));
	        }for (t = i.length - 1; t >= 0; t--) {
	          b.wrapper.prepend(a(i[t].cloneNode(!0)).addClass(b.params.slideDuplicateClass));
	        }
	      }, b.destroyLoop = function () {
	        b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove(), b.slides.removeAttr("data-swiper-slide-index");
	      }, b.fixLoop = function () {
	        var e;b.activeIndex < b.loopedSlides ? (e = b.slides.length - 3 * b.loopedSlides + b.activeIndex, e += b.loopedSlides, b.slideTo(e, 0, !1, !0)) : ("auto" === b.params.slidesPerView && b.activeIndex >= 2 * b.loopedSlides || b.activeIndex > b.slides.length - 2 * b.params.slidesPerView) && (e = -b.slides.length + b.activeIndex + b.loopedSlides, e += b.loopedSlides, b.slideTo(e, 0, !1, !0));
	      }, b.appendSlide = function (e) {
	        if (b.params.loop && b.destroyLoop(), "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e.length) for (var a = 0; a < e.length; a++) {
	          e[a] && b.wrapper.append(e[a]);
	        } else b.wrapper.append(e);b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0);
	      }, b.prependSlide = function (e) {
	        b.params.loop && b.destroyLoop();var a = b.activeIndex + 1;if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e.length) {
	          for (var t = 0; t < e.length; t++) {
	            e[t] && b.wrapper.prepend(e[t]);
	          }a = b.activeIndex + e.length;
	        } else b.wrapper.prepend(e);b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.slideTo(a, 0, !1);
	      }, b.removeSlide = function (e) {
	        b.params.loop && (b.destroyLoop(), b.slides = b.wrapper.children("." + b.params.slideClass));var a,
	            t = b.activeIndex;if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e.length) {
	          for (var i = 0; i < e.length; i++) {
	            a = e[i], b.slides[a] && b.slides.eq(a).remove(), t > a && t--;
	          }t = Math.max(t, 0);
	        } else a = e, b.slides[a] && b.slides.eq(a).remove(), t > a && t--, t = Math.max(t, 0);b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.params.loop ? b.slideTo(t + b.loopedSlides, 0, !1) : b.slideTo(t, 0, !1);
	      }, b.removeAllSlides = function () {
	        for (var e = [], a = 0; a < b.slides.length; a++) {
	          e.push(a);
	        }b.removeSlide(e);
	      }, b.effects = { fade: { setTranslate: function setTranslate() {
	            for (var e = 0; e < b.slides.length; e++) {
	              var a = b.slides.eq(e),
	                  t = a[0].swiperSlideOffset,
	                  i = -t;b.params.virtualTranslate || (i -= b.translate);var r = 0;b.isHorizontal() || (r = i, i = 0);var s = b.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress, -1), 0);a.css({ opacity: s }).transform("translate3d(" + i + "px, " + r + "px, 0px)");
	            }
	          }, setTransition: function setTransition(e) {
	            if (b.slides.transition(e), b.params.virtualTranslate && 0 !== e) {
	              var a = !1;b.slides.transitionEnd(function () {
	                if (!a && b) {
	                  a = !0, b.animating = !1;for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) {
	                    b.wrapper.trigger(e[t]);
	                  }
	                }
	              });
	            }
	          } }, flip: { setTranslate: function setTranslate() {
	            for (var e = 0; e < b.slides.length; e++) {
	              var t = b.slides.eq(e),
	                  i = t[0].progress;b.params.flip.limitRotation && (i = Math.max(Math.min(t[0].progress, 1), -1));var r = t[0].swiperSlideOffset,
	                  s = -180 * i,
	                  n = s,
	                  o = 0,
	                  l = -r,
	                  p = 0;if (b.isHorizontal() ? b.rtl && (n = -n) : (p = l, l = 0, o = -n, n = 0), t[0].style.zIndex = -Math.abs(Math.round(i)) + b.slides.length, b.params.flip.slideShadows) {
	                var d = b.isHorizontal() ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
	                    u = b.isHorizontal() ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");0 === d.length && (d = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), t.append(d)), 0 === u.length && (u = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), t.append(u)), d.length && (d[0].style.opacity = Math.max(-i, 0)), u.length && (u[0].style.opacity = Math.max(i, 0));
	              }t.transform("translate3d(" + l + "px, " + p + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)");
	            }
	          }, setTransition: function setTransition(e) {
	            if (b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), b.params.virtualTranslate && 0 !== e) {
	              var t = !1;b.slides.eq(b.activeIndex).transitionEnd(function () {
	                if (!t && b && a(this).hasClass(b.params.slideActiveClass)) {
	                  t = !0, b.animating = !1;for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], i = 0; i < e.length; i++) {
	                    b.wrapper.trigger(e[i]);
	                  }
	                }
	              });
	            }
	          } }, cube: { setTranslate: function setTranslate() {
	            var e,
	                t = 0;b.params.cube.shadow && (b.isHorizontal() ? (e = b.wrapper.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), b.wrapper.append(e)), e.css({ height: b.width + "px" })) : (e = b.container.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), b.container.append(e))));for (var i = 0; i < b.slides.length; i++) {
	              var r = b.slides.eq(i),
	                  s = 90 * i,
	                  n = Math.floor(s / 360);b.rtl && (s = -s, n = Math.floor(-s / 360));var o = Math.max(Math.min(r[0].progress, 1), -1),
	                  l = 0,
	                  p = 0,
	                  d = 0;i % 4 === 0 ? (l = 4 * -n * b.size, d = 0) : (i - 1) % 4 === 0 ? (l = 0, d = 4 * -n * b.size) : (i - 2) % 4 === 0 ? (l = b.size + 4 * n * b.size, d = b.size) : (i - 3) % 4 === 0 && (l = -b.size, d = 3 * b.size + 4 * b.size * n), b.rtl && (l = -l), b.isHorizontal() || (p = l, l = 0);var u = "rotateX(" + (b.isHorizontal() ? 0 : -s) + "deg) rotateY(" + (b.isHorizontal() ? s : 0) + "deg) translate3d(" + l + "px, " + p + "px, " + d + "px)";if (1 >= o && o > -1 && (t = 90 * i + 90 * o, b.rtl && (t = 90 * -i - 90 * o)), r.transform(u), b.params.cube.slideShadows) {
	                var c = b.isHorizontal() ? r.find(".swiper-slide-shadow-left") : r.find(".swiper-slide-shadow-top"),
	                    m = b.isHorizontal() ? r.find(".swiper-slide-shadow-right") : r.find(".swiper-slide-shadow-bottom");0 === c.length && (c = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), r.append(c)), 0 === m.length && (m = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), r.append(m)), c.length && (c[0].style.opacity = Math.max(-o, 0)), m.length && (m[0].style.opacity = Math.max(o, 0));
	              }
	            }if (b.wrapper.css({ "-webkit-transform-origin": "50% 50% -" + b.size / 2 + "px", "-moz-transform-origin": "50% 50% -" + b.size / 2 + "px", "-ms-transform-origin": "50% 50% -" + b.size / 2 + "px", "transform-origin": "50% 50% -" + b.size / 2 + "px" }), b.params.cube.shadow) if (b.isHorizontal()) e.transform("translate3d(0px, " + (b.width / 2 + b.params.cube.shadowOffset) + "px, " + -b.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + b.params.cube.shadowScale + ")");else {
	              var f = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
	                  h = 1.5 - (Math.sin(2 * f * Math.PI / 360) / 2 + Math.cos(2 * f * Math.PI / 360) / 2),
	                  g = b.params.cube.shadowScale,
	                  v = b.params.cube.shadowScale / h,
	                  w = b.params.cube.shadowOffset;e.transform("scale3d(" + g + ", 1, " + v + ") translate3d(0px, " + (b.height / 2 + w) + "px, " + -b.height / 2 / v + "px) rotateX(-90deg)");
	            }var y = b.isSafari || b.isUiWebView ? -b.size / 2 : 0;b.wrapper.transform("translate3d(0px,0," + y + "px) rotateX(" + (b.isHorizontal() ? 0 : t) + "deg) rotateY(" + (b.isHorizontal() ? -t : 0) + "deg)");
	          }, setTransition: function setTransition(e) {
	            b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), b.params.cube.shadow && !b.isHorizontal() && b.container.find(".swiper-cube-shadow").transition(e);
	          } }, coverflow: { setTranslate: function setTranslate() {
	            for (var e = b.translate, t = b.isHorizontal() ? -e + b.width / 2 : -e + b.height / 2, i = b.isHorizontal() ? b.params.coverflow.rotate : -b.params.coverflow.rotate, r = b.params.coverflow.depth, s = 0, n = b.slides.length; n > s; s++) {
	              var o = b.slides.eq(s),
	                  l = b.slidesSizesGrid[s],
	                  p = o[0].swiperSlideOffset,
	                  d = (t - p - l / 2) / l * b.params.coverflow.modifier,
	                  u = b.isHorizontal() ? i * d : 0,
	                  c = b.isHorizontal() ? 0 : i * d,
	                  m = -r * Math.abs(d),
	                  f = b.isHorizontal() ? 0 : b.params.coverflow.stretch * d,
	                  h = b.isHorizontal() ? b.params.coverflow.stretch * d : 0;Math.abs(h) < .001 && (h = 0), Math.abs(f) < .001 && (f = 0), Math.abs(m) < .001 && (m = 0), Math.abs(u) < .001 && (u = 0), Math.abs(c) < .001 && (c = 0);var g = "translate3d(" + h + "px," + f + "px," + m + "px)  rotateX(" + c + "deg) rotateY(" + u + "deg)";if (o.transform(g), o[0].style.zIndex = -Math.abs(Math.round(d)) + 1, b.params.coverflow.slideShadows) {
	                var v = b.isHorizontal() ? o.find(".swiper-slide-shadow-left") : o.find(".swiper-slide-shadow-top"),
	                    w = b.isHorizontal() ? o.find(".swiper-slide-shadow-right") : o.find(".swiper-slide-shadow-bottom");0 === v.length && (v = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), o.append(v)), 0 === w.length && (w = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), o.append(w)), v.length && (v[0].style.opacity = d > 0 ? d : 0), w.length && (w[0].style.opacity = -d > 0 ? -d : 0);
	              }
	            }if (b.browser.ie) {
	              var y = b.wrapper[0].style;y.perspectiveOrigin = t + "px 50%";
	            }
	          }, setTransition: function setTransition(e) {
	            b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e);
	          } } }, b.lazy = { initialImageLoaded: !1, loadImageInSlide: function loadImageInSlide(e, t) {
	          if ("undefined" != typeof e && ("undefined" == typeof t && (t = !0), 0 !== b.slides.length)) {
	            var i = b.slides.eq(e),
	                r = i.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");!i.hasClass("swiper-lazy") || i.hasClass("swiper-lazy-loaded") || i.hasClass("swiper-lazy-loading") || (r = r.add(i[0])), 0 !== r.length && r.each(function () {
	              var e = a(this);e.addClass("swiper-lazy-loading");var r = e.attr("data-background"),
	                  s = e.attr("data-src"),
	                  n = e.attr("data-srcset");b.loadImage(e[0], s || r, n, !1, function () {
	                if (r ? (e.css("background-image", "url(" + r + ")"), e.removeAttr("data-background")) : (n && (e.attr("srcset", n), e.removeAttr("data-srcset")), s && (e.attr("src", s), e.removeAttr("data-src"))), e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"), i.find(".swiper-lazy-preloader, .preloader").remove(), b.params.loop && t) {
	                  var a = i.attr("data-swiper-slide-index");if (i.hasClass(b.params.slideDuplicateClass)) {
	                    var o = b.wrapper.children('[data-swiper-slide-index="' + a + '"]:not(.' + b.params.slideDuplicateClass + ")");b.lazy.loadImageInSlide(o.index(), !1);
	                  } else {
	                    var l = b.wrapper.children("." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + a + '"]');b.lazy.loadImageInSlide(l.index(), !1);
	                  }
	                }b.emit("onLazyImageReady", b, i[0], e[0]);
	              }), b.emit("onLazyImageLoad", b, i[0], e[0]);
	            });
	          }
	        }, load: function load() {
	          var e;if (b.params.watchSlidesVisibility) b.wrapper.children("." + b.params.slideVisibleClass).each(function () {
	            b.lazy.loadImageInSlide(a(this).index());
	          });else if (b.params.slidesPerView > 1) for (e = b.activeIndex; e < b.activeIndex + b.params.slidesPerView; e++) {
	            b.slides[e] && b.lazy.loadImageInSlide(e);
	          } else b.lazy.loadImageInSlide(b.activeIndex);if (b.params.lazyLoadingInPrevNext) if (b.params.slidesPerView > 1 || b.params.lazyLoadingInPrevNextAmount && b.params.lazyLoadingInPrevNextAmount > 1) {
	            var t = b.params.lazyLoadingInPrevNextAmount,
	                i = b.params.slidesPerView,
	                r = Math.min(b.activeIndex + i + Math.max(t, i), b.slides.length),
	                s = Math.max(b.activeIndex - Math.max(i, t), 0);for (e = b.activeIndex + b.params.slidesPerView; r > e; e++) {
	              b.slides[e] && b.lazy.loadImageInSlide(e);
	            }for (e = s; e < b.activeIndex; e++) {
	              b.slides[e] && b.lazy.loadImageInSlide(e);
	            }
	          } else {
	            var n = b.wrapper.children("." + b.params.slideNextClass);n.length > 0 && b.lazy.loadImageInSlide(n.index());var o = b.wrapper.children("." + b.params.slidePrevClass);o.length > 0 && b.lazy.loadImageInSlide(o.index());
	          }
	        }, onTransitionStart: function onTransitionStart() {
	          b.params.lazyLoading && (b.params.lazyLoadingOnTransitionStart || !b.params.lazyLoadingOnTransitionStart && !b.lazy.initialImageLoaded) && b.lazy.load();
	        }, onTransitionEnd: function onTransitionEnd() {
	          b.params.lazyLoading && !b.params.lazyLoadingOnTransitionStart && b.lazy.load();
	        } }, b.scrollbar = { isTouched: !1, setDragPosition: function setDragPosition(e) {
	          var a = b.scrollbar,
	              t = b.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY,
	              i = t - a.track.offset()[b.isHorizontal() ? "left" : "top"] - a.dragSize / 2,
	              r = -b.minTranslate() * a.moveDivider,
	              s = -b.maxTranslate() * a.moveDivider;r > i ? i = r : i > s && (i = s), i = -i / a.moveDivider, b.updateProgress(i), b.setWrapperTranslate(i, !0);
	        }, dragStart: function dragStart(e) {
	          var a = b.scrollbar;a.isTouched = !0, e.preventDefault(), e.stopPropagation(), a.setDragPosition(e), clearTimeout(a.dragTimeout), a.track.transition(0), b.params.scrollbarHide && a.track.css("opacity", 1), b.wrapper.transition(100), a.drag.transition(100), b.emit("onScrollbarDragStart", b);
	        }, dragMove: function dragMove(e) {
	          var a = b.scrollbar;a.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, a.setDragPosition(e), b.wrapper.transition(0), a.track.transition(0), a.drag.transition(0), b.emit("onScrollbarDragMove", b));
	        }, dragEnd: function dragEnd(e) {
	          var a = b.scrollbar;a.isTouched && (a.isTouched = !1, b.params.scrollbarHide && (clearTimeout(a.dragTimeout), a.dragTimeout = setTimeout(function () {
	            a.track.css("opacity", 0), a.track.transition(400);
	          }, 1e3)), b.emit("onScrollbarDragEnd", b), b.params.scrollbarSnapOnRelease && b.slideReset());
	        }, enableDraggable: function enableDraggable() {
	          var e = b.scrollbar,
	              t = b.support.touch ? e.track : document;a(e.track).on(b.touchEvents.start, e.dragStart), a(t).on(b.touchEvents.move, e.dragMove), a(t).on(b.touchEvents.end, e.dragEnd);
	        }, disableDraggable: function disableDraggable() {
	          var e = b.scrollbar,
	              t = b.support.touch ? e.track : document;a(e.track).off(b.touchEvents.start, e.dragStart), a(t).off(b.touchEvents.move, e.dragMove), a(t).off(b.touchEvents.end, e.dragEnd);
	        }, set: function set() {
	          if (b.params.scrollbar) {
	            var e = b.scrollbar;e.track = a(b.params.scrollbar), e.drag = e.track.find(".swiper-scrollbar-drag"), 0 === e.drag.length && (e.drag = a('<div class="swiper-scrollbar-drag"></div>'), e.track.append(e.drag)), e.drag[0].style.width = "", e.drag[0].style.height = "", e.trackSize = b.isHorizontal() ? e.track[0].offsetWidth : e.track[0].offsetHeight, e.divider = b.size / b.virtualSize, e.moveDivider = e.divider * (e.trackSize / b.size), e.dragSize = e.trackSize * e.divider, b.isHorizontal() ? e.drag[0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", e.divider >= 1 ? e.track[0].style.display = "none" : e.track[0].style.display = "", b.params.scrollbarHide && (e.track[0].style.opacity = 0);
	          }
	        }, setTranslate: function setTranslate() {
	          if (b.params.scrollbar) {
	            var e,
	                a = b.scrollbar,
	                t = (b.translate || 0, a.dragSize);e = (a.trackSize - a.dragSize) * b.progress, b.rtl && b.isHorizontal() ? (e = -e, e > 0 ? (t = a.dragSize - e, e = 0) : -e + a.dragSize > a.trackSize && (t = a.trackSize + e)) : 0 > e ? (t = a.dragSize + e, e = 0) : e + a.dragSize > a.trackSize && (t = a.trackSize - e), b.isHorizontal() ? (b.support.transforms3d ? a.drag.transform("translate3d(" + e + "px, 0, 0)") : a.drag.transform("translateX(" + e + "px)"), a.drag[0].style.width = t + "px") : (b.support.transforms3d ? a.drag.transform("translate3d(0px, " + e + "px, 0)") : a.drag.transform("translateY(" + e + "px)"), a.drag[0].style.height = t + "px"), b.params.scrollbarHide && (clearTimeout(a.timeout), a.track[0].style.opacity = 1, a.timeout = setTimeout(function () {
	              a.track[0].style.opacity = 0, a.track.transition(400);
	            }, 1e3));
	          }
	        }, setTransition: function setTransition(e) {
	          b.params.scrollbar && b.scrollbar.drag.transition(e);
	        } }, b.controller = { LinearSpline: function LinearSpline(e, a) {
	          this.x = e, this.y = a, this.lastIndex = e.length - 1;var t, i;this.x.length;this.interpolate = function (e) {
	            return e ? (i = r(this.x, e), t = i - 1, (e - this.x[t]) * (this.y[i] - this.y[t]) / (this.x[i] - this.x[t]) + this.y[t]) : 0;
	          };var r = function () {
	            var e, a, t;return function (i, r) {
	              for (a = -1, e = i.length; e - a > 1;) {
	                i[t = e + a >> 1] <= r ? a = t : e = t;
	              }return e;
	            };
	          }();
	        }, getInterpolateFunction: function getInterpolateFunction(e) {
	          b.controller.spline || (b.controller.spline = b.params.loop ? new b.controller.LinearSpline(b.slidesGrid, e.slidesGrid) : new b.controller.LinearSpline(b.snapGrid, e.snapGrid));
	        }, setTranslate: function setTranslate(e, a) {
	          function i(a) {
	            e = a.rtl && "horizontal" === a.params.direction ? -b.translate : b.translate, "slide" === b.params.controlBy && (b.controller.getInterpolateFunction(a), s = -b.controller.spline.interpolate(-e)), s && "container" !== b.params.controlBy || (r = (a.maxTranslate() - a.minTranslate()) / (b.maxTranslate() - b.minTranslate()), s = (e - b.minTranslate()) * r + a.minTranslate()), b.params.controlInverse && (s = a.maxTranslate() - s), a.updateProgress(s), a.setWrapperTranslate(s, !1, b), a.updateActiveIndex();
	          }var r,
	              s,
	              n = b.params.control;if (b.isArray(n)) for (var o = 0; o < n.length; o++) {
	            n[o] !== a && n[o] instanceof t && i(n[o]);
	          } else n instanceof t && a !== n && i(n);
	        }, setTransition: function setTransition(e, a) {
	          function i(a) {
	            a.setWrapperTransition(e, b), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function () {
	              s && (a.params.loop && "slide" === b.params.controlBy && a.fixLoop(), a.onTransitionEnd());
	            }));
	          }var r,
	              s = b.params.control;if (b.isArray(s)) for (r = 0; r < s.length; r++) {
	            s[r] !== a && s[r] instanceof t && i(s[r]);
	          } else s instanceof t && a !== s && i(s);
	        } }, b.hashnav = { init: function init() {
	          if (b.params.hashnav) {
	            b.hashnav.initialized = !0;var e = document.location.hash.replace("#", "");if (e) for (var a = 0, t = 0, i = b.slides.length; i > t; t++) {
	              var r = b.slides.eq(t),
	                  s = r.attr("data-hash");if (s === e && !r.hasClass(b.params.slideDuplicateClass)) {
	                var n = r.index();b.slideTo(n, a, b.params.runCallbacksOnInit, !0);
	              }
	            }
	          }
	        }, setHash: function setHash() {
	          b.hashnav.initialized && b.params.hashnav && (document.location.hash = b.slides.eq(b.activeIndex).attr("data-hash") || "");
	        } }, b.disableKeyboardControl = function () {
	        b.params.keyboardControl = !1, a(document).off("keydown", p);
	      }, b.enableKeyboardControl = function () {
	        b.params.keyboardControl = !0, a(document).on("keydown", p);
	      }, b.mousewheel = { event: !1, lastScrollTime: new window.Date().getTime() }, b.params.mousewheelControl) {
	        try {
	          new window.WheelEvent("wheel"), b.mousewheel.event = "wheel";
	        } catch (O) {}b.mousewheel.event || void 0 === document.onmousewheel || (b.mousewheel.event = "mousewheel"), b.mousewheel.event || (b.mousewheel.event = "DOMMouseScroll");
	      }b.disableMousewheelControl = function () {
	        return b.mousewheel.event ? (b.container.off(b.mousewheel.event, d), !0) : !1;
	      }, b.enableMousewheelControl = function () {
	        return b.mousewheel.event ? (b.container.on(b.mousewheel.event, d), !0) : !1;
	      }, b.parallax = { setTranslate: function setTranslate() {
	          b.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
	            u(this, b.progress);
	          }), b.slides.each(function () {
	            var e = a(this);e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
	              var a = Math.min(Math.max(e[0].progress, -1), 1);u(this, a);
	            });
	          });
	        }, setTransition: function setTransition(e) {
	          "undefined" == typeof e && (e = b.params.speed), b.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
	            var t = a(this),
	                i = parseInt(t.attr("data-swiper-parallax-duration"), 10) || e;0 === e && (i = 0), t.transition(i);
	          });
	        } }, b._plugins = [];for (var N in b.plugins) {
	        var R = b.plugins[N](b, b.params[N]);R && b._plugins.push(R);
	      }return b.callPlugins = function (e) {
	        for (var a = 0; a < b._plugins.length; a++) {
	          e in b._plugins[a] && b._plugins[a][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	        }
	      }, b.emitterEventListeners = {}, b.emit = function (e) {
	        b.params[e] && b.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);var a;if (b.emitterEventListeners[e]) for (a = 0; a < b.emitterEventListeners[e].length; a++) {
	          b.emitterEventListeners[e][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	        }b.callPlugins && b.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	      }, b.on = function (e, a) {
	        return e = c(e), b.emitterEventListeners[e] || (b.emitterEventListeners[e] = []), b.emitterEventListeners[e].push(a), b;
	      }, b.off = function (e, a) {
	        var t;if (e = c(e), "undefined" == typeof a) return b.emitterEventListeners[e] = [], b;if (b.emitterEventListeners[e] && 0 !== b.emitterEventListeners[e].length) {
	          for (t = 0; t < b.emitterEventListeners[e].length; t++) {
	            b.emitterEventListeners[e][t] === a && b.emitterEventListeners[e].splice(t, 1);
	          }return b;
	        }
	      }, b.once = function (e, a) {
	        e = c(e);var t = function t() {
	          a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), b.off(e, t);
	        };return b.on(e, t), b;
	      }, b.a11y = { makeFocusable: function makeFocusable(e) {
	          return e.attr("tabIndex", "0"), e;
	        }, addRole: function addRole(e, a) {
	          return e.attr("role", a), e;
	        }, addLabel: function addLabel(e, a) {
	          return e.attr("aria-label", a), e;
	        }, disable: function disable(e) {
	          return e.attr("aria-disabled", !0), e;
	        }, enable: function enable(e) {
	          return e.attr("aria-disabled", !1), e;
	        }, onEnterKey: function onEnterKey(e) {
	          13 === e.keyCode && (a(e.target).is(b.params.nextButton) ? (b.onClickNext(e), b.isEnd ? b.a11y.notify(b.params.lastSlideMessage) : b.a11y.notify(b.params.nextSlideMessage)) : a(e.target).is(b.params.prevButton) && (b.onClickPrev(e), b.isBeginning ? b.a11y.notify(b.params.firstSlideMessage) : b.a11y.notify(b.params.prevSlideMessage)), a(e.target).is("." + b.params.bulletClass) && a(e.target)[0].click());
	        }, liveRegion: a('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'), notify: function notify(e) {
	          var a = b.a11y.liveRegion;0 !== a.length && (a.html(""), a.html(e));
	        }, init: function init() {
	          if (b.params.nextButton) {
	            var e = a(b.params.nextButton);b.a11y.makeFocusable(e), b.a11y.addRole(e, "button"), b.a11y.addLabel(e, b.params.nextSlideMessage);
	          }if (b.params.prevButton) {
	            var t = a(b.params.prevButton);b.a11y.makeFocusable(t), b.a11y.addRole(t, "button"), b.a11y.addLabel(t, b.params.prevSlideMessage);
	          }a(b.container).append(b.a11y.liveRegion);
	        }, initPagination: function initPagination() {
	          b.params.pagination && b.params.paginationClickable && b.bullets && b.bullets.length && b.bullets.each(function () {
	            var e = a(this);b.a11y.makeFocusable(e), b.a11y.addRole(e, "button"), b.a11y.addLabel(e, b.params.paginationBulletMessage.replace(/{{index}}/, e.index() + 1));
	          });
	        }, destroy: function destroy() {
	          b.a11y.liveRegion && b.a11y.liveRegion.length > 0 && b.a11y.liveRegion.remove();
	        } }, b.init = function () {
	        b.params.loop && b.createLoop(), b.updateContainerSize(), b.updateSlidesSize(), b.updatePagination(), b.params.scrollbar && b.scrollbar && (b.scrollbar.set(), b.params.scrollbarDraggable && b.scrollbar.enableDraggable()), "slide" !== b.params.effect && b.effects[b.params.effect] && (b.params.loop || b.updateProgress(), b.effects[b.params.effect].setTranslate()), b.params.loop ? b.slideTo(b.params.initialSlide + b.loopedSlides, 0, b.params.runCallbacksOnInit) : (b.slideTo(b.params.initialSlide, 0, b.params.runCallbacksOnInit), 0 === b.params.initialSlide && (b.parallax && b.params.parallax && b.parallax.setTranslate(), b.lazy && b.params.lazyLoading && (b.lazy.load(), b.lazy.initialImageLoaded = !0))), b.attachEvents(), b.params.observer && b.support.observer && b.initObservers(), b.params.preloadImages && !b.params.lazyLoading && b.preloadImages(), b.params.autoplay && b.startAutoplay(), b.params.keyboardControl && b.enableKeyboardControl && b.enableKeyboardControl(), b.params.mousewheelControl && b.enableMousewheelControl && b.enableMousewheelControl(), b.params.hashnav && b.hashnav && b.hashnav.init(), b.params.a11y && b.a11y && b.a11y.init(), b.emit("onInit", b);
	      }, b.cleanupStyles = function () {
	        b.container.removeClass(b.classNames.join(" ")).removeAttr("style"), b.wrapper.removeAttr("style"), b.slides && b.slides.length && b.slides.removeClass([b.params.slideVisibleClass, b.params.slideActiveClass, b.params.slideNextClass, b.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), b.paginationContainer && b.paginationContainer.length && b.paginationContainer.removeClass(b.params.paginationHiddenClass), b.bullets && b.bullets.length && b.bullets.removeClass(b.params.bulletActiveClass), b.params.prevButton && a(b.params.prevButton).removeClass(b.params.buttonDisabledClass), b.params.nextButton && a(b.params.nextButton).removeClass(b.params.buttonDisabledClass), b.params.scrollbar && b.scrollbar && (b.scrollbar.track && b.scrollbar.track.length && b.scrollbar.track.removeAttr("style"), b.scrollbar.drag && b.scrollbar.drag.length && b.scrollbar.drag.removeAttr("style"));
	      }, b.destroy = function (e, a) {
	        b.detachEvents(), b.stopAutoplay(), b.params.scrollbar && b.scrollbar && b.params.scrollbarDraggable && b.scrollbar.disableDraggable(), b.params.loop && b.destroyLoop(), a && b.cleanupStyles(), b.disconnectObservers(), b.params.keyboardControl && b.disableKeyboardControl && b.disableKeyboardControl(), b.params.mousewheelControl && b.disableMousewheelControl && b.disableMousewheelControl(), b.params.a11y && b.a11y && b.a11y.destroy(), b.emit("onDestroy"), e !== !1 && (b = null);
	      }, b.init(), b;
	    }
	  };t.prototype = { isSafari: function () {
	      var e = navigator.userAgent.toLowerCase();return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0;
	    }(), isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent), isArray: function isArray(e) {
	      return "[object Array]" === Object.prototype.toString.apply(e);
	    }, browser: { ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
	      ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1 }, device: function () {
	      var e = navigator.userAgent,
	          a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
	          t = e.match(/(iPad).*OS\s([\d_]+)/),
	          i = e.match(/(iPod)(.*OS\s([\d_]+))?/),
	          r = !t && e.match(/(iPhone\sOS)\s([\d_]+)/);return { ios: t || r || i, android: a };
	    }(), support: { touch: window.Modernizr && Modernizr.touch === !0 || function () {
	        return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
	      }(), transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function () {
	        var e = document.createElement("div").style;return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e;
	      }(), flexbox: function () {
	        for (var e = document.createElement("div").style, a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), t = 0; t < a.length; t++) {
	          if (a[t] in e) return !0;
	        }
	      }(), observer: function () {
	        return "MutationObserver" in window || "WebkitMutationObserver" in window;
	      }() }, plugins: {} };for (var i = function () {
	    var e = function e(_e) {
	      var a = this,
	          t = 0;for (t = 0; t < _e.length; t++) {
	        a[t] = _e[t];
	      }return a.length = _e.length, this;
	    },
	        a = function a(_a, t) {
	      var i = [],
	          r = 0;if (_a && !t && _a instanceof e) return _a;if (_a) if ("string" == typeof _a) {
	        var s,
	            n,
	            o = _a.trim();if (o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
	          var l = "div";for (0 === o.indexOf("<li") && (l = "ul"), 0 === o.indexOf("<tr") && (l = "tbody"), (0 === o.indexOf("<td") || 0 === o.indexOf("<th")) && (l = "tr"), 0 === o.indexOf("<tbody") && (l = "table"), 0 === o.indexOf("<option") && (l = "select"), n = document.createElement(l), n.innerHTML = _a, r = 0; r < n.childNodes.length; r++) {
	            i.push(n.childNodes[r]);
	          }
	        } else for (s = t || "#" !== _a[0] || _a.match(/[ .<>:~]/) ? (t || document).querySelectorAll(_a) : [document.getElementById(_a.split("#")[1])], r = 0; r < s.length; r++) {
	          s[r] && i.push(s[r]);
	        }
	      } else if (_a.nodeType || _a === window || _a === document) i.push(_a);else if (_a.length > 0 && _a[0].nodeType) for (r = 0; r < _a.length; r++) {
	        i.push(_a[r]);
	      }return new e(i);
	    };return e.prototype = { addClass: function addClass(e) {
	        if ("undefined" == typeof e) return this;for (var a = e.split(" "), t = 0; t < a.length; t++) {
	          for (var i = 0; i < this.length; i++) {
	            this[i].classList.add(a[t]);
	          }
	        }return this;
	      }, removeClass: function removeClass(e) {
	        for (var a = e.split(" "), t = 0; t < a.length; t++) {
	          for (var i = 0; i < this.length; i++) {
	            this[i].classList.remove(a[t]);
	          }
	        }return this;
	      }, hasClass: function hasClass(e) {
	        return this[0] ? this[0].classList.contains(e) : !1;
	      }, toggleClass: function toggleClass(e) {
	        for (var a = e.split(" "), t = 0; t < a.length; t++) {
	          for (var i = 0; i < this.length; i++) {
	            this[i].classList.toggle(a[t]);
	          }
	        }return this;
	      }, attr: function attr(e, a) {
	        if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;for (var t = 0; t < this.length; t++) {
	          if (2 === arguments.length) this[t].setAttribute(e, a);else for (var i in e) {
	            this[t][i] = e[i], this[t].setAttribute(i, e[i]);
	          }
	        }return this;
	      }, removeAttr: function removeAttr(e) {
	        for (var a = 0; a < this.length; a++) {
	          this[a].removeAttribute(e);
	        }return this;
	      }, data: function data(e, a) {
	        if ("undefined" != typeof a) {
	          for (var t = 0; t < this.length; t++) {
	            var i = this[t];i.dom7ElementDataStorage || (i.dom7ElementDataStorage = {}), i.dom7ElementDataStorage[e] = a;
	          }return this;
	        }if (this[0]) {
	          var r = this[0].getAttribute("data-" + e);return r ? r : this[0].dom7ElementDataStorage && e in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[e] : void 0;
	        }
	      }, transform: function transform(e) {
	        for (var a = 0; a < this.length; a++) {
	          var t = this[a].style;t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e;
	        }return this;
	      }, transition: function transition(e) {
	        "string" != typeof e && (e += "ms");for (var a = 0; a < this.length; a++) {
	          var t = this[a].style;t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e;
	        }return this;
	      }, on: function on(e, t, i, r) {
	        function s(e) {
	          var r = e.target;if (a(r).is(t)) i.call(r, e);else for (var s = a(r).parents(), n = 0; n < s.length; n++) {
	            a(s[n]).is(t) && i.call(s[n], e);
	          }
	        }var n,
	            o,
	            l = e.split(" ");for (n = 0; n < this.length; n++) {
	          if ("function" == typeof t || t === !1) for ("function" == typeof t && (i = arguments[1], r = arguments[2] || !1), o = 0; o < l.length; o++) {
	            this[n].addEventListener(l[o], i, r);
	          } else for (o = 0; o < l.length; o++) {
	            this[n].dom7LiveListeners || (this[n].dom7LiveListeners = []), this[n].dom7LiveListeners.push({ listener: i, liveListener: s }), this[n].addEventListener(l[o], s, r);
	          }
	        }return this;
	      }, off: function off(e, a, t, i) {
	        for (var r = e.split(" "), s = 0; s < r.length; s++) {
	          for (var n = 0; n < this.length; n++) {
	            if ("function" == typeof a || a === !1) "function" == typeof a && (t = arguments[1], i = arguments[2] || !1), this[n].removeEventListener(r[s], t, i);else if (this[n].dom7LiveListeners) for (var o = 0; o < this[n].dom7LiveListeners.length; o++) {
	              this[n].dom7LiveListeners[o].listener === t && this[n].removeEventListener(r[s], this[n].dom7LiveListeners[o].liveListener, i);
	            }
	          }
	        }return this;
	      }, once: function once(e, a, t, i) {
	        function r(n) {
	          t(n), s.off(e, a, r, i);
	        }var s = this;"function" == typeof a && (a = !1, t = arguments[1], i = arguments[2]), s.on(e, a, r, i);
	      }, trigger: function trigger(e, a) {
	        for (var t = 0; t < this.length; t++) {
	          var i;try {
	            i = new window.CustomEvent(e, { detail: a, bubbles: !0, cancelable: !0 });
	          } catch (r) {
	            i = document.createEvent("Event"), i.initEvent(e, !0, !0), i.detail = a;
	          }this[t].dispatchEvent(i);
	        }return this;
	      }, transitionEnd: function transitionEnd(e) {
	        function a(s) {
	          if (s.target === this) for (e.call(this, s), t = 0; t < i.length; t++) {
	            r.off(i[t], a);
	          }
	        }var t,
	            i = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
	            r = this;if (e) for (t = 0; t < i.length; t++) {
	          r.on(i[t], a);
	        }return this;
	      }, width: function width() {
	        return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null;
	      }, outerWidth: function outerWidth(e) {
	        return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null;
	      }, height: function height() {
	        return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null;
	      }, outerHeight: function outerHeight(e) {
	        return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null;
	      }, offset: function offset() {
	        if (this.length > 0) {
	          var e = this[0],
	              a = e.getBoundingClientRect(),
	              t = document.body,
	              i = e.clientTop || t.clientTop || 0,
	              r = e.clientLeft || t.clientLeft || 0,
	              s = window.pageYOffset || e.scrollTop,
	              n = window.pageXOffset || e.scrollLeft;return { top: a.top + s - i, left: a.left + n - r };
	        }return null;
	      }, css: function css(e, a) {
	        var t;if (1 === arguments.length) {
	          if ("string" != typeof e) {
	            for (t = 0; t < this.length; t++) {
	              for (var i in e) {
	                this[t].style[i] = e[i];
	              }
	            }return this;
	          }if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(e);
	        }if (2 === arguments.length && "string" == typeof e) {
	          for (t = 0; t < this.length; t++) {
	            this[t].style[e] = a;
	          }return this;
	        }return this;
	      }, each: function each(e) {
	        for (var a = 0; a < this.length; a++) {
	          e.call(this[a], a, this[a]);
	        }return this;
	      }, html: function html(e) {
	        if ("undefined" == typeof e) return this[0] ? this[0].innerHTML : void 0;for (var a = 0; a < this.length; a++) {
	          this[a].innerHTML = e;
	        }return this;
	      }, text: function text(e) {
	        if ("undefined" == typeof e) return this[0] ? this[0].textContent.trim() : null;for (var a = 0; a < this.length; a++) {
	          this[a].textContent = e;
	        }return this;
	      }, is: function is(t) {
	        if (!this[0]) return !1;var i, r;if ("string" == typeof t) {
	          var s = this[0];if (s === document) return t === document;if (s === window) return t === window;if (s.matches) return s.matches(t);if (s.webkitMatchesSelector) return s.webkitMatchesSelector(t);if (s.mozMatchesSelector) return s.mozMatchesSelector(t);if (s.msMatchesSelector) return s.msMatchesSelector(t);for (i = a(t), r = 0; r < i.length; r++) {
	            if (i[r] === this[0]) return !0;
	          }return !1;
	        }if (t === document) return this[0] === document;if (t === window) return this[0] === window;if (t.nodeType || t instanceof e) {
	          for (i = t.nodeType ? [t] : t, r = 0; r < i.length; r++) {
	            if (i[r] === this[0]) return !0;
	          }return !1;
	        }return !1;
	      }, index: function index() {
	        if (this[0]) {
	          for (var e = this[0], a = 0; null !== (e = e.previousSibling);) {
	            1 === e.nodeType && a++;
	          }return a;
	        }
	      }, eq: function eq(a) {
	        if ("undefined" == typeof a) return this;var t,
	            i = this.length;return a > i - 1 ? new e([]) : 0 > a ? (t = i + a, new e(0 > t ? [] : [this[t]])) : new e([this[a]]);
	      }, append: function append(a) {
	        var t, i;for (t = 0; t < this.length; t++) {
	          if ("string" == typeof a) {
	            var r = document.createElement("div");for (r.innerHTML = a; r.firstChild;) {
	              this[t].appendChild(r.firstChild);
	            }
	          } else if (a instanceof e) for (i = 0; i < a.length; i++) {
	            this[t].appendChild(a[i]);
	          } else this[t].appendChild(a);
	        }return this;
	      }, prepend: function prepend(a) {
	        var t, i;for (t = 0; t < this.length; t++) {
	          if ("string" == typeof a) {
	            var r = document.createElement("div");for (r.innerHTML = a, i = r.childNodes.length - 1; i >= 0; i--) {
	              this[t].insertBefore(r.childNodes[i], this[t].childNodes[0]);
	            }
	          } else if (a instanceof e) for (i = 0; i < a.length; i++) {
	            this[t].insertBefore(a[i], this[t].childNodes[0]);
	          } else this[t].insertBefore(a, this[t].childNodes[0]);
	        }return this;
	      }, insertBefore: function insertBefore(e) {
	        for (var t = a(e), i = 0; i < this.length; i++) {
	          if (1 === t.length) t[0].parentNode.insertBefore(this[i], t[0]);else if (t.length > 1) for (var r = 0; r < t.length; r++) {
	            t[r].parentNode.insertBefore(this[i].cloneNode(!0), t[r]);
	          }
	        }
	      }, insertAfter: function insertAfter(e) {
	        for (var t = a(e), i = 0; i < this.length; i++) {
	          if (1 === t.length) t[0].parentNode.insertBefore(this[i], t[0].nextSibling);else if (t.length > 1) for (var r = 0; r < t.length; r++) {
	            t[r].parentNode.insertBefore(this[i].cloneNode(!0), t[r].nextSibling);
	          }
	        }
	      }, next: function next(t) {
	        return new e(this.length > 0 ? t ? this[0].nextElementSibling && a(this[0].nextElementSibling).is(t) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : []);
	      }, nextAll: function nextAll(t) {
	        var i = [],
	            r = this[0];if (!r) return new e([]);for (; r.nextElementSibling;) {
	          var s = r.nextElementSibling;t ? a(s).is(t) && i.push(s) : i.push(s), r = s;
	        }return new e(i);
	      }, prev: function prev(t) {
	        return new e(this.length > 0 ? t ? this[0].previousElementSibling && a(this[0].previousElementSibling).is(t) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : []);
	      }, prevAll: function prevAll(t) {
	        var i = [],
	            r = this[0];if (!r) return new e([]);for (; r.previousElementSibling;) {
	          var s = r.previousElementSibling;t ? a(s).is(t) && i.push(s) : i.push(s), r = s;
	        }return new e(i);
	      }, parent: function parent(e) {
	        for (var t = [], i = 0; i < this.length; i++) {
	          e ? a(this[i].parentNode).is(e) && t.push(this[i].parentNode) : t.push(this[i].parentNode);
	        }return a(a.unique(t));
	      }, parents: function parents(e) {
	        for (var t = [], i = 0; i < this.length; i++) {
	          for (var r = this[i].parentNode; r;) {
	            e ? a(r).is(e) && t.push(r) : t.push(r), r = r.parentNode;
	          }
	        }return a(a.unique(t));
	      }, find: function find(a) {
	        for (var t = [], i = 0; i < this.length; i++) {
	          for (var r = this[i].querySelectorAll(a), s = 0; s < r.length; s++) {
	            t.push(r[s]);
	          }
	        }return new e(t);
	      }, children: function children(t) {
	        for (var i = [], r = 0; r < this.length; r++) {
	          for (var s = this[r].childNodes, n = 0; n < s.length; n++) {
	            t ? 1 === s[n].nodeType && a(s[n]).is(t) && i.push(s[n]) : 1 === s[n].nodeType && i.push(s[n]);
	          }
	        }return new e(a.unique(i));
	      }, remove: function remove() {
	        for (var e = 0; e < this.length; e++) {
	          this[e].parentNode && this[e].parentNode.removeChild(this[e]);
	        }return this;
	      }, add: function add() {
	        var e,
	            t,
	            i = this;for (e = 0; e < arguments.length; e++) {
	          var r = a(arguments[e]);for (t = 0; t < r.length; t++) {
	            i[i.length] = r[t], i.length++;
	          }
	        }return i;
	      } }, a.fn = e.prototype, a.unique = function (e) {
	      for (var a = [], t = 0; t < e.length; t++) {
	        -1 === a.indexOf(e[t]) && a.push(e[t]);
	      }return a;
	    }, a;
	  }(), r = ["jQuery", "Zepto", "Dom7"], s = 0; s < r.length; s++) {
	    window[r[s]] && e(window[r[s]]);
	  }var n;n = "undefined" == typeof i ? window.Dom7 || window.Zepto || window.jQuery : i, n && ("transitionEnd" in n.fn || (n.fn.transitionEnd = function (e) {
	    function a(s) {
	      if (s.target === this) for (e.call(this, s), t = 0; t < i.length; t++) {
	        r.off(i[t], a);
	      }
	    }var t,
	        i = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
	        r = this;if (e) for (t = 0; t < i.length; t++) {
	      r.on(i[t], a);
	    }return this;
	  }), "transform" in n.fn || (n.fn.transform = function (e) {
	    for (var a = 0; a < this.length; a++) {
	      var t = this[a].style;t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e;
	    }return this;
	  }), "transition" in n.fn || (n.fn.transition = function (e) {
	    "string" != typeof e && (e += "ms");for (var a = 0; a < this.length; a++) {
	      var t = this[a].style;t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e;
	    }return this;
	  })), window.Swiper = t;
	}(),  true ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function () {
	  "use strict";
	  return window.Swiper;
	});
	//# sourceMappingURL=maps/swiper.min.js.map

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _preloader = __webpack_require__(4);

	var _preloader2 = _interopRequireDefault(_preloader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//	Main
	var List = function List() {

		var selector = '.js-image-list';
		var container = document.querySelector(selector);
		// const item = container.querySelector('li');

		function init() {
			if (!container) return;
			requestImages();
			buildLayout();
		}

		function requestImages() {
			//	preload all specified image paths
			new _preloader2.default(window.imageList, {
				onComplete: function onComplete(loaded, errors) {
					return buildLayout;
				}
			});
		}

		function shuffleArray(array) {
			var currentIndex = array.length,
			    temporaryValue,
			    randomIndex;

			// While there remain elements to shuffle...
			while (0 !== currentIndex) {

				// Pick a remaining element...
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				// And swap it with the current element.
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}

			return array;
		}

		function buildLayout() {
			var shuffledList = shuffleArray(window.imageList);
			var nodeList = [];
			shuffledList.forEach(function (src) {
				nodeList.push('<img src="' + src + '">');
			});
			container.innerHTML = nodeList.join('');
			addMasonryLayout();
		}

		function addMasonryLayout() {
			imagesLoaded(container, function () {
				var layout = new Packery(container, {
					itemSelector: '.js-image-list img',
					gutter: 8,
					percentPosition: true,
					transitionDuration: 0
				});
				container.classList.add('has-loaded');
			});
			// bindEvents();
		}

		// function bindEvents () {
		// 	NodeList.prototype.forEach = Array.prototype.forEach;
		// 	let images = container.querySelectorAll('img');
		// 	images.forEach(img => img.addEventListener('click', eventClick));
		// }
		// function eventClick(e) {
		// 	// if (e.target.classList.contains('picked')) {

		// 	// }
		// 	// images.forEach(img => img.classList.remove('picked'));
		// 	// container.classList.remove('image-list--option-selected');
		// 	// // e.target.style.top = 0;
		// 	// // e.target.style.left = 0;
		// 	// // e.target.style.right = 0;
		// 	// // e.target.style.bottom = 0;
		// 	// container.classList.add('image-list--option-selected');
		// 	// e.target.classList.add('picked');
		// }

		init();
	}; //	Carousel
	//-----------------------------------

	//	Dependencies

	module.exports = List;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var preLoader = function preLoader(images, options) {
	    this.options = {
	        pipeline: false,
	        auto: true,
	        /* onProgress: function(){}, */
	        /* onError: function(){}, */
	        onComplete: function onComplete() {}
	    };

	    options && (typeof options === 'undefined' ? 'undefined' : _typeof(options)) == 'object' && this.setOptions(options);

	    this.addQueue(images);
	    this.queue.length && this.options.auto && this.processQueue();
	};

	preLoader.prototype.setOptions = function (options) {
	    // shallow copy
	    var o = this.options,
	        key;

	    for (key in options) {
	        options.hasOwnProperty(key) && (o[key] = options[key]);
	    }return this;
	};

	preLoader.prototype.addQueue = function (images) {
	    // stores a local array, dereferenced from original
	    this.queue = images.slice();

	    return this;
	};

	preLoader.prototype.reset = function () {
	    // reset the arrays
	    this.completed = [];
	    this.errors = [];

	    return this;
	};

	preLoader.prototype.load = function (src, index) {
	    var image = new Image(),
	        self = this,
	        o = this.options;

	    // set some event handlers
	    image.onerror = image.onabort = function () {
	        this.onerror = this.onabort = this.onload = null;

	        self.errors.push(src);
	        o.onError && o.onError.call(self, src);
	        checkProgress.call(self, src);
	        o.pipeline && self.loadNext(index);
	    };

	    image.onload = function () {
	        this.onerror = this.onabort = this.onload = null;

	        // store progress. this === image
	        self.completed.push(src); // this.src may differ
	        checkProgress.call(self, src, this);
	        o.pipeline && self.loadNext(index);
	    };

	    // actually load
	    image.src = src;

	    return this;
	};

	preLoader.prototype.loadNext = function (index) {
	    // when pipeline loading is enabled, calls next item
	    index++;
	    this.queue[index] && this.load(this.queue[index], index);

	    return this;
	};

	preLoader.prototype.processQueue = function () {
	    // runs through all queued items.
	    var i = 0,
	        queue = this.queue,
	        len = queue.length;

	    // process all queue items
	    this.reset();

	    if (!this.options.pipeline) for (; i < len; ++i) {
	        this.load(queue[i], i);
	    } else this.load(queue[0], 0);

	    return this;
	};

	function checkProgress(src, image) {
	    // intermediate checker for queue remaining. not exported.
	    // called on preLoader instance as scope
	    var args = [],
	        o = this.options;

	    // call onProgress
	    o.onProgress && src && o.onProgress.call(this, src, image, this.completed.length);

	    if (this.completed.length + this.errors.length === this.queue.length) {
	        args.push(this.completed);
	        this.errors.length && args.push(this.errors);
	        o.onComplete.apply(this, args);
	    }

	    return this;
	}

	if (true) {
	    // we have an AMD loader.
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	        return preLoader;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
	    undefined.preLoader = preLoader;
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	// Set Array prototype on NodeList for forEach() support
	// https://gist.github.com/paulirish/12fb951a8b893a454b32#gistcomment-1474959

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	NodeList.prototype.forEach = Array.prototype.forEach;

	/**
	 * @param {object} options Object containing configuration overrides
	 */
	var Frdialogmodal = function Frdialogmodal() {
		var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		var _ref$selector = _ref.selector;
		var selector = _ref$selector === undefined ? '.js-fr-dialogmodal' : _ref$selector;
		var _ref$modalSelector = _ref.modalSelector;
		var modalSelector = _ref$modalSelector === undefined ? '.js-fr-dialogmodal-modal' : _ref$modalSelector;
		var _ref$openSelector = _ref.openSelector;
		var openSelector = _ref$openSelector === undefined ? '.js-fr-dialogmodal-open' : _ref$openSelector;
		var _ref$closeSelector = _ref.closeSelector;
		var closeSelector = _ref$closeSelector === undefined ? '.js-fr-dialogmodal-close' : _ref$closeSelector;
		var _ref$isAlert = _ref.isAlert;
		var isAlert = _ref$isAlert === undefined ? false : _ref$isAlert;
		var _ref$readyClass = _ref.readyClass;
		var readyClass = _ref$readyClass === undefined ? 'fr-dialogmodal--is-ready' : _ref$readyClass;
		var _ref$activeClass = _ref.activeClass;
		var activeClass = _ref$activeClass === undefined ? 'fr-dialogmodal--is-active' : _ref$activeClass;

		// CONSTANTS
		var doc = document;
		var docEl = doc.documentElement;

		// SUPPORTS
		if (!('querySelector' in doc) || !('addEventListener' in window) || !docEl.classList) return;

		// SETUP
		// set accordion element NodeLists
		var containers = doc.querySelectorAll(selector);
		var focusableSelectors = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex^="-"])'];
		//	TEMP
		var currButtonOpen = null;
		var currModal = null;
		//	elements within tab
		var focusableElements = null;

		//	UTILS
		function _defer(fn) {
			//	wrapped in setTimeout to delay binding until previous rendering has completed
			if (typeof fn === 'function') setTimeout(fn, 0);
		}

		//	A11Y
		function _addA11y(container) {
			var modal = container.querySelector(modalSelector);
			var modalDoc = modal.querySelector('[role="document"]');
			var role = isAlert ? 'alertdialog' : 'dialog';
			//	add relevant roles and properties
			container.setAttribute('aria-hidden', true);
			modal.setAttribute('role', role);
			modal.setAttribute('aria-describedby', modalDoc.getAttribute('id'));
		}
		function _removeA11y(container) {
			var modal = container.querySelector(modalSelector);
			//	add relevant roles and properties
			container.removeAttribute('aria-hidden');
			modal.removeAttribute('role');
			modal.removeAttribute('aria-describedby');
		}

		//	ACTIONS
		function _showModal(container, modal) {
			//	show container and focus the modal
			container.setAttribute('aria-hidden', false);
			modal.setAttribute('tabindex', -1);
			modal.focus();
			//	update bound events
			_defer(_bindDocKey);
			_defer(_bindClosePointer);
			//	if contents are not interactive, bind click off
			if (!isAlert) _defer(_bindContainerPointer);
			//	reset scroll
			modal.scrollTop = 0;
			//	update style hook
			container.classList.add(activeClass);
			//	set first/last focusable elements
			focusableElements = [].slice.call(modal.querySelectorAll(focusableSelectors.join()));
		}
		function _hideModal(modal) {
			var returnfocus = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

			//	get container element
			var container = modal.parentElement;
			//	show container and focus the modal
			container.setAttribute('aria-hidden', true);
			modal.removeAttribute('tabindex');
			//	update bound events
			_unbindDocKey();
			_unbindClosePointer();
			//	if contents are not interactive, unbind click off
			if (!isAlert) _unbindContainerPointer();
			//	update style hook
			container.classList.remove(activeClass);
			//	return focus to button that opened the modal and reset the reference
			if (returnfocus) {
				currButtonOpen.focus();
				currButtonOpen = null;
			}
		}
		function _handleTabEvent(e) {
			//	get the index of the current active element within the modal
			var focusedIndex = focusableElements.indexOf(doc.activeElement);
			//	handle TAB event if need to skip
			//	if first element is focused and shiftkey is in use
			if (e.shiftKey && (focusedIndex === 0 || focusedIndex === -1)) {
				//	focus last item within modal
				focusableElements[focusableElements.length - 1].focus();
				e.preventDefault();
				//	if last element is focused and shiftkey is not in use
			} else if (!e.shiftKey && focusedIndex === focusableElements.length - 1) {
					//	focus first item within modal
					focusableElements[0].focus();
					e.preventDefault();
				}
		}

		//	EVENTS
		function _eventOpenPointer(e) {
			//	get related elements
			var button = e.target;
			var container = doc.getElementById(button.getAttribute('aria-controls'));
			var modal = container.querySelector(modalSelector);
			//	save element references
			currButtonOpen = button;
			currModal = modal;
			//	show modal
			_showModal(container, modal);
		}
		function _eventClosePointer() {
			_hideModal(currModal);
		}
		function _eventContainerPointer(e) {
			var container = currModal.parentElement;
			//	check if target is modal container (but not modal)
			if (e.target === container) _hideModal(currModal);
		}
		function _eventDocKey(e) {
			//	ESC key
			if (e.keyCode === 27) _hideModal(currModal);
			//	TAB key
			if (e.keyCode === 9) _handleTabEvent(e);
		}

		//	BIND EVENTS
		function _bindOpenPointers(container) {
			var id = container.getAttribute('id');
			var buttons = doc.querySelectorAll(openSelector + '[aria-controls="' + id + '"]');
			buttons.forEach(function (button) {
				return button.addEventListener('click', _eventOpenPointer);
			});
		}
		function _bindClosePointer() {
			var modal = arguments.length <= 0 || arguments[0] === undefined ? currModal : arguments[0];

			var button = modal.querySelector(closeSelector);
			button.addEventListener('click', _eventClosePointer);
		}
		function _bindContainerPointer() {
			var modal = arguments.length <= 0 || arguments[0] === undefined ? currModal : arguments[0];

			var container = modal.parentElement;
			container.addEventListener('click', _eventContainerPointer);
		}
		function _bindDocKey() {
			doc.addEventListener('keydown', _eventDocKey);
		}

		//	UNBIND EVENTS
		function _unbindOpenPointers(container) {
			var id = container.getAttribute('id');
			var buttons = doc.querySelectorAll(openSelector + '[aria-controls="' + id + '"]');
			buttons.forEach(function (button) {
				return button.removeEventListener('click', _eventOpenPointer);
			});
		}
		function _unbindClosePointer() {
			var modal = arguments.length <= 0 || arguments[0] === undefined ? currModal : arguments[0];

			var button = modal.querySelector(closeSelector);
			button.removeEventListener('click', _eventClosePointer);
		}
		function _unbindContainerPointer() {
			var container = currModal.parentElement;
			container.removeEventListener('click', _eventContainerPointer);
		}
		function _unbindDocKey() {
			doc.removeEventListener('keydown', _eventDocKey);
		}

		//	DESTROY
		function destroy() {
			//	loop through available modals
			containers.forEach(function (container) {
				var modal = container.querySelector(modalSelector);
				modal.removeAttribute('tabindex');
				_removeA11y(container);
				_unbindOpenPointers(container);
				_unbindClosePointer(modal);
				_unbindContainerPointer(modal);
				//	remove ready, active style hooks
				container.classList.remove(readyClass, activeClass);
			});
			_unbindDocKey();
		}

		//	INIT
		function init() {
			//	cancel if no modals found
			if (!containers.length) return;
			//	loop through available modals
			containers.forEach(function (container) {
				_addA11y(container);
				_bindOpenPointers(container);
				// set ready style hook
				container.classList.add(readyClass);
			});
		}
		init();

		// REVEAL API
		return {
			init: init,
			destroy: destroy
		};
	};

	// module exports
	exports.default = Frdialogmodal;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	// Set Array prototype on NodeList for forEach() support
	// https://gist.github.com/paulirish/12fb951a8b893a454b32#gistcomment-1474959

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	NodeList.prototype.forEach = Array.prototype.forEach;

	/**
	 * @param {object} options Object containing configuration overrides
	 */
	var Frtabs = function Frtabs() {
		var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		var _ref$selector = _ref.selector;
		var selector = _ref$selector === undefined ? '.js-fr-tabs' : _ref$selector;
		var _ref$tablistSelector = _ref.tablistSelector;
		var tablistSelector = _ref$tablistSelector === undefined ? '.js-fr-tabs__tablist' : _ref$tablistSelector;
		var _ref$tabpanelSelector = _ref.tabpanelSelector;
		var tabpanelSelector = _ref$tabpanelSelector === undefined ? '.js-fr-tabs__panel' : _ref$tabpanelSelector;
		var _ref$tabsReadyClass = _ref.tabsReadyClass;
		var tabsReadyClass = _ref$tabsReadyClass === undefined ? 'fr-tabs--is-ready' : _ref$tabsReadyClass;

		// CONSTANTS
		var doc = document;
		var docEl = doc.documentElement;

		// SUPPORTS
		if (!('querySelector' in doc) || !('addEventListener' in window) || !docEl.classList) return;

		// SETUP
		// set tab element NodeList
		var tabContainers = doc.querySelectorAll(selector);

		// A11Y
		function _addA11y(tabContainer) {
			// get tab elements
			var tabLists = tabContainer.querySelectorAll(tablistSelector);
			var tabListItems = tabContainer.querySelectorAll(tablistSelector + ' li');
			var tabs = tabContainer.querySelectorAll(tablistSelector + ' a');
			var tabpanels = tabContainer.querySelectorAll(tabpanelSelector);

			// add roles, properties, states
			tabLists.forEach(function (tabList) {
				tabList.setAttribute('role', 'tablist');
			});

			tabListItems.forEach(function (tabItem) {
				tabItem.setAttribute('role', 'presentation');
			});

			tabs.forEach(function (tab) {
				tab.setAttribute('role', 'tab');
				tab.setAttribute('aria-controls', tab.hash.substring(1));
			});

			tabpanels.forEach(function (tabpanel) {
				tabpanel.setAttribute('role', 'tabpanel');
				// make first child of tabpanel focusable if available
				tabpanel.setAttribute('tabindex', 0);
			});
		}

		function _removeA11y(tabContainer) {
			// get tab elements
			var tabLists = tabContainer.querySelectorAll(tablistSelector);
			var tabListItems = tabContainer.querySelectorAll(tablistSelector + ' li');
			var tabs = tabContainer.querySelectorAll(tablistSelector + ' a');
			var tabpanels = tabContainer.querySelectorAll(tabpanelSelector);

			// remove roles, properties, states
			tabLists.forEach(function (tabList) {
				tabList.removeAttribute('role');
			});

			tabListItems.forEach(function (tabItem) {
				tabItem.removeAttribute('role');
			});

			tabs.forEach(function (tab) {
				tab.removeAttribute('role');
				tab.removeAttribute('aria-controls');
				tab.removeAttribute('aria-selected');
				tab.removeAttribute('tabindex');
			});

			tabpanels.forEach(function (tabpanel) {
				tabpanel.removeAttribute('role');
				tabpanel.removeAttribute('aria-hidden');
				// remove first child focusability if present
				tabpanel.removeAttribute('tabindex');
			});
		}

		// ACTIONS
		function _showTab(target) {
			var giveFocus = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

			// get context of tab container (this sucks - look at implementing equivalent .closest() method)
			var thisContainer = target.parentNode.parentNode.parentNode;

			var siblingTabs = thisContainer.querySelectorAll(tablistSelector + ' a');
			var siblingTabpanels = thisContainer.querySelectorAll(tabpanelSelector);

			// set inactives
			siblingTabs.forEach(function (tab) {
				tab.setAttribute('tabindex', -1);
				tab.removeAttribute('aria-selected');
			});
			siblingTabpanels.forEach(function (tabpanel) {
				tabpanel.setAttribute('aria-hidden', 'true');
			});

			// set actives and focus
			target.setAttribute('tabindex', 0);
			target.setAttribute('aria-selected', 'true');
			if (giveFocus) target.focus();
			doc.getElementById(target.getAttribute('aria-controls')).removeAttribute('aria-hidden');
		}

		// EVENTS
		function _eventTabClick(e) {
			_showTab(e.target);
			e.preventDefault(); // look into remove id/settimeout/reinstate id as an alternative to preventDefault
		}

		function _eventTabKeydown(e) {
			// collect tab targets, and their parents' prev/next (or first/last - this is honkin dom traversing)
			var currentTab = e.target;
			var previousTabItem = currentTab.parentNode.previousElementSibling || currentTab.parentNode.parentNode.lastElementChild;
			var nextTabItem = currentTab.parentNode.nextElementSibling || currentTab.parentNode.parentNode.firstElementChild;

			// catch left/right and up/down arrow key events
			// if new next/prev tab available, show it by passing tab anchor to _showTab method
			switch (e.keyCode) {
				case 37:
				case 38:
					_showTab(previousTabItem.querySelector('[role="tab"]'));
					e.preventDefault();
					break;
				case 39:
				case 40:
					_showTab(nextTabItem.querySelector('[role="tab"]'));
					e.preventDefault();
					break;
				default:
					break;
			}
		}

		// BINDINGS
		function _bindTabsEvents(tabContainer) {
			var tabs = tabContainer.querySelectorAll(tablistSelector + ' a');
			// bind all tab click and keydown events
			tabs.forEach(function (tab) {
				tab.addEventListener('click', _eventTabClick);
				tab.addEventListener('keydown', _eventTabKeydown);
			});
		}

		function _unbindTabsEvents(tabContainer) {
			var tabs = tabContainer.querySelectorAll(tablistSelector + ' a');
			// unbind all tab click and keydown events
			tabs.forEach(function (tab) {
				tab.removeEventListener('click', _eventTabClick);
				tab.removeEventListener('keydown', _eventTabKeydown);
			});
		}

		// DESTROY
		function destroy() {
			tabContainers.forEach(function (tabContainer) {
				_removeA11y(tabContainer);
				_unbindTabsEvents(tabContainer);
				tabContainer.classList.remove(tabsReadyClass);
			});
		}

		// INIT
		function init() {
			if (tabContainers.length) {
				tabContainers.forEach(function (tabContainer) {
					_addA11y(tabContainer);
					_bindTabsEvents(tabContainer);
					// set all first tabs active on init
					_showTab(tabContainer.querySelectorAll(tablistSelector + ' a')[0], false);
					// set ready style hook
					tabContainer.classList.add(tabsReadyClass);
				});
			}
		}
		init();

		// REVEAL API
		return {
			init: init,
			destroy: destroy
		};
	};

	// module exports
	exports.default = Frtabs;

/***/ }
/******/ ]);