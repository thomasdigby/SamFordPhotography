//	Carousel
//-----------------------------------

//	Dependencies
import preLoader from '../_vendor/preloader';

//	Main
const List = function () {

	const selector = '.js-image-list';
	const container = document.querySelector(selector);
	// const item = container.querySelector('li');

	function init () {
		if (!container) return;
		requestImages();
		buildLayout();
	}

	function requestImages () {
		//	preload all specified image paths
		new preLoader(window.imageList, {
			onComplete: (loaded, errors) => buildLayout
		});
	}

	function shuffleArray (array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

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

	function buildLayout () {
		let shuffledList = shuffleArray(window.imageList);
		let nodeList = [];
		shuffledList.forEach(src => {
			nodeList.push(`<img src="${src}">`);
		});
		container.innerHTML = nodeList.join('');
		addMasonryLayout();
	}

	function addMasonryLayout () {
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
};

module.exports = List;