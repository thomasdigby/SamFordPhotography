$('html').removeClass('no_js');
$('html').addClass('js');

var AppSettings = {
	easing: 'easeInOutQuad'
};

var Main = {

	run: function () {
		//imgLoad.init();
		search.init();
		//imgHighlight.init();
		//Utils.headerFixed();
	}

};

var imgLoad = {
	init: function () {
		$('img').css({'opacity': 0.5});
		$('section').each(function() {
			img = $('img');  
			i = 0;
			(function() {  
			  $(img[i++]).stop().animate({'opacity': 1}, 150, arguments.callee);
			})();
		});
	}
};

var imgHighlight = {
	init: function () {
		imgHighlight.imgHover();
		imgHighlight.navHover();
	},
	imgHover: function() {
		$('section a').on({
			mouseenter: function() {
				$(this).addClass('hover');
				$('section a:not(.hover) img').stop().animate({ 'opacity': 0.8 }, 50, AppSettings.easing);
			},
			mouseleave: function() {
				$(this).removeClass('hover');
				$('section a img').stop().animate({ 'opacity': 1 }, 150, AppSettings.easing);
			}
		});
	},
	navHover: function() {
		$('nav a').on({
			mouseenter: function() {
				var currentSection = $(this).data('index');
				$('section img').stop().animate({ 'opacity': 0.8 }, 50, AppSettings.easing);
				$('section[data-index="' + currentSection + '"] img').animate({ 'opacity': 1 }, 150, AppSettings.easing);
			},
			mouseleave: function() {
				$('section img').stop().animate({ 'opacity': 1 }, 150, AppSettings.easing);
			}
		});
	}
};

var search = {
	
	trigger: '.site_search',
	item: 'main img',

	init: function() {
		search.masonry();
		search.toggle();
		search.filter();
	},
	
	masonry: function() {
		$('main').masonry({
		    itemSelector : 'main a',
		    columnWidth : 280
		});
	},

	toggle: function() {
		$(search.trigger).on('click', function(e) {
			$(this).toggleClass('open');
			$(this).next('input').toggle().focus().attr('value', '');
			e.preventDefault();
		});
	},
	
	filter: function() {
		$(search.trigger).next('input').on('keyup', function () {
			var val = $(this).val(),
				array = val.split(" ");
							
			if (val.length) {
				$(search.item).parent().animate({'opacity': 0.5}, 250, function() {
					//$(search.item).removeClass('filter');
					
					
					$.each(array,function(i){
						var selector = '[data-tags*="' + array[i] + '"]';
						$(search.item + selector).parent().show(250, function() {
							$(this).animate({'opacity': 1}, 250);
						});
						$(search.item + ':not(' + selector + ')').hide(250, search.masonry());
					});

				});
				
			} else {
				//$(search.item).removeClass('filter');
			}
			
		});
	}
	
};

var Utils = {
	
	headerFixed: function() {
		$(window).scroll(function(){
			$('header').css('left', 0 - $(this).scrollLeft());
	    });
	}
	
}

$(document).ready(Main.run());

jQuery.extend(jQuery.easing, {
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t + b;
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	}
});