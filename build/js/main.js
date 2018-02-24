'use strict';

var _createClass = function() {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	return function(Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);
		if (staticProps) defineProperties(Constructor, staticProps);
		return Constructor;
	};
}();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

//
// CLASS - Slider
// =================================================================
var Slider = function() {
	function Slider(selector, options) {
		_classCallCheck(this, Slider);

		this.options = options;
		this.slider = selector.bxSlider(this.options());

		this.watch();
	}

	_createClass(Slider, [{
		key: 'getSettings',
		value: function getSettings() {
			return this.options();
		}
	}, {
		key: 'reloadSettings',
		value: function reloadSettings() {
			this.slider.reloadSlider($.extend(this.getSettings(), {
				startSlide: this.slider.getCurrentSlide()
			}));
		}
	}, {
		key: 'watch',
		value: function watch() {
			var slider = this;

			$(window).on('resize load', function() {
				setTimeout(slider.reloadSettings(), 500);
			});
		}
	}]);

	return Slider;
}();

function createSlider(selector, options) {
	return new Slider(selector, options);
}

/* Get Device Width */
function getWidth() {
	if (self.innerWidth) {
		return self.innerWidth;
	}

	if (document.documentElement && document.documentElement.clientWidth) {
		return document.documentElement.clientWidth;
	}

	if (document.body) {
		return document.body.clientWidth;
	}
}

function dropdown(triger, menu) {
	$(triger).hover(function(event) {
		$(event.currentTarget).find(menu).stop(true, true).fadeIn(300);
	}, function(event) {
		$(event.currentTarget).find(menu).stop(true, true).fadeOut(150);
	});
}

//
// CLASS - Mobile Menu
// =================================================================

var Menu = function() {
	function Menu() {
		var _this = this;

		_classCallCheck(this, Menu);

		this.closeMobileMenuOnOutOfClick();
		$('.js-nav-toggle').on('click', function() {
			_this.setMenuBlockHeight();
			_this.toggleSubMenu();
			_this.toggleMenuVisibility();
			_this.toggleMenuTriggerClass();
			_this.toggleBodyBackground();
		});
	}
	/* eslint class-methods-use-this: ["error", { 
 	"exceptMethods": [
 		"toggleMenuVisibility",
 		"toggleBodyBackground",
 		"toggleMenuTriggerClass",
 		"closeMobileMenuOnOutOfClick",
 		"setMenuBlockHeight",
 		"toggleSubMenu",
 	] }] 
 */

	_createClass(Menu, [{
		key: 'toggleSubMenu',
		value: function toggleSubMenu() {
			$('.mobile-nav__item').on('click', 'i', function(event) {
				$(event.currentTarget).parent().toggleClass('is--current');
			});
		}
	}, {
		key: 'setMenuBlockHeight',
		value: function setMenuBlockHeight() {
			$('.mobile-nav__block').each(function(index, element) {
				var height = $(element).height();

				$(element).height(height);
			});
		}
	}, {
		key: 'toggleMenuVisibility',
		value: function toggleMenuVisibility() {
			$('.mobile-nav').toggleClass('is--visible');
		}
	}, {
		key: 'toggleBodyBackground',
		value: function toggleBodyBackground() {
			$('body').toggleClass('is--mobile-active');
		}
	}, {
		key: 'toggleMenuTriggerClass',
		value: function toggleMenuTriggerClass() {
			$('.js-nav-toggle').toggleClass('is--active');
		}
	}, {
		key: 'closeMobileMenuOnOutOfClick',
		value: function closeMobileMenuOnOutOfClick() {
			var _this2 = this;

			$('body').mouseup(function(e) {
				var subject = $('.is--visible');

				if (subject.length && !$(e.target).hasClass('js-nav-toggle') && !$(e.target).hasClass('icon-nav') && e.target.className !== subject.attr('class') && !subject.has(e.target).length) {
					_this2.toggleMenuVisibility();
					_this2.toggleBodyBackground();
					_this2.toggleMenuTriggerClass();
				}
			});
		}
	}]);

	return Menu;
}();

function initMenu() {
	return new Menu();
}
initMenu();

//
// Modal Popup
// =================================================================
$.arcticmodal('setDefault', {
	afterClose: function afterClose() {
		$('body').css({
			'overflow': 'auto',
			'margin-right': '0px'
		});
	}
});

$('[data-modal]').on('click', function(e) {
	e.preventDefault();
	var link = $(e.currentTarget).data('modal');

	if (link) {
		$('#' + link).arcticmodal();
	}
});

//
// Slider - Accounts
// =================================================================
if ($('.js-slider-antiques').length) {
	var sliderBlock = $('.js-slider-antiques');
	var options = function options() {
		var setting = {};
		var setting1 = {
			maxSlides: 2
		};
		var setting2 = {
			maxSlides: 4
		};
		var common = {
			auto: false,
			pager: false,
			slideWidth: 229,
			slideMargin: 52,
			minSlides: 1,
			moveSlides: 1,
			controls: true,
			nextSelector: '.slider__next',
			prevSelector: '.slider__prev',
			nextText: '',
			prevText: ''
		};

		if (window.innerWidth <= 1200) {
			setting = $.extend(setting1, common);
		}
		if (window.innerWidth > 1200) {
			setting = $.extend(setting2, common);
		}

		return setting;
	};

	createSlider(sliderBlock, options);
}

//
// Каталог - навигация
// =================================================================
$('.js-catalogue').on('click', '.js-catalogue-list-toggle', function(event) {
	var arrow = event.currentTarget;

	$(arrow).parent().toggleClass('is--opened');
});

//
// Обработка элемента формы input[type=file]
// =================================================================
function showUploadThumb(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function(e) {
			var $thumb = $('img[data-upload="' + $(input).attr('id') + '"]');

			$thumb.attr('src', e.target.result);
		};

		reader.readAsDataURL(input.files[0]);
	}
}
$('input[type=file]').on('change', function(event) {
	var str = $(event.currentTarget).val();
	var $label = $(event.currentTarget).next();
	var labelText = $label.text();
	var i = void 0;

	if (str.lastIndexOf('\\')) {
		i = str.lastIndexOf('\\') + 1;
	} else {
		i = str.lastIndexOf('/') + 1;
	}

	var filename = str.slice(i);

	if (filename === '' || filename === undefined) {
		$label.text(labelText);
	} else {
		$label.text(filename);
	}

	showUploadThumb(event.currentTarget);
});

//
// Валидация формы отзывов
// =================================================================
$('.js--feedback-form').validate({
	rules: {
		name: {
			required: true
		},
		subject: {
			required: true
		},
		comment: {
			required: true
		}
	},
	messages: {
		subject: {
			required: 'Введите название предмета'
		},
		name: {
			required: 'Введите Ваше имя'
		},
		comment: {
			required: 'Введите Ваш отзыв'
		}
	},
	focusCleanup: true,
	focusInvalid: false
});

//
// Валидация формы "Задать вопрос"
// =================================================================
$('.js--ask-form').validate({
	rules: {
		phone: {
			required: true
		},
		comment: {
			required: true
		}
	},
	messages: {
		phone: {
			required: 'Введите номер телефона'
		},
		comment: {
			required: 'Введите Ваш отзыв'
		}
	},
	focusCleanup: true,
	focusInvalid: false
});

//
// Валидация формы "Оценка антиквариата"
// =================================================================
var valuationValidateSettings = {
	rules: {
		phone: {
			required: true
		}
	},
	messages: {
		phone: {
			required: 'Введите номер телефона'
		}
	},
	focusCleanup: true,
	focusInvalid: false
};

// SIDEBAR FORM
$('.js-valuation-form').validate(valuationValidateSettings);

// FOOTER FORM
$('.js-valuation-form--footer').validate(valuationValidateSettings);

// HORIZONTAL FORM
$('.js-valuation-form--horizontal').validate(valuationValidateSettings);

//
// Подключаем fancybox для фото товара
//---------------------------------------------------------------------------------------
var $gallery = $('[rel="gallery"]');

if ($gallery.length) {
	$gallery.fancybox({
		openEffect: 'elastic',
		closeEffect: 'elastic',
		helpers: {
			title: {
				type: 'inside'
			}
		}
	});
}

//
// Раскрытие/скрытие элементов
// =================================================================
$('.js-more-testimonials').on('click', function() {
	$('.js-testimonials-wrapper').toggleClass('is--opened');
});
