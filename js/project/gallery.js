//	Carousel
//-----------------------------------

//	Dependencies
var Swiper = require('../_vendor/swiper.min');

//	Main
const Gallery = function () {

	const gallerySelector = '.swiper-container';
	const imageSelector = '.js-gallery-image';
	const captionSelector = '.js-gallery-caption';
	const navSelector = '.js-gallery-nav';
	const elemGallery = document.querySelector(gallerySelector);
	const elemCaption = document.querySelector(captionSelector);
	const elemNav = [].slice.call(document.querySelectorAll(navSelector));
	let gallery = {};

	function init () {
		if (elemGallery) build();
	}

	function build () {
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

	function updateCaption (swiper) {
		let galleryImages = elemGallery.querySelectorAll(imageSelector);
		let slideIndex = swiper.activeIndex;
		let currentImage = galleryImages[slideIndex];
		let caption = currentImage.getAttribute('alt');
		elemCaption.innerText = caption;
	}

	function bindNav() {
		elemNav.forEach((elem) => elem.addEventListener('click', eventNavClick));
	}

	function eventNavClick(e) {
		let direction = e.target.getAttribute('data-direction');
		if (direction === 'next') gallery.slideNext();
		if (direction === 'prev') gallery.slidePrev();
	}

	init();
};

module.exports = Gallery;