//
// CLASS - Slider
// =================================================================
class Slider {
	constructor(selector, options) {
		this.options = options;
		this.slider = selector.bxSlider(this.options());

		this.watch();
	}

	getSettings() {
		return this.options();
	}

	reloadSettings() {
		this.slider.reloadSlider($.extend(this.getSettings(), {startSlide: this.slider.getCurrentSlide()}));
	}

	watch() {
		let slider = this;

		$(window).on('resize load', () => {
			setTimeout(slider.reloadSettings(), 500);
		});
	}
}

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
	$(triger).hover(
		(event) => {
			$(event.currentTarget).find(menu).stop(true, true).fadeIn(300);
		},
		(event) => {
			$(event.currentTarget).find(menu).stop(true, true).fadeOut(150);
		}
	);
}

//
// CLASS - Mobile Menu
// =================================================================
class Menu {
	constructor() {
		this.closeMobileMenuOnOutOfClick();
		$('.js-nav-toggle').on('click', () => {
			this.toggleMenuVisibility();
			this.toggleMenuTriggerClass();
			this.toggleBodyBackground();
		});
	}
	/* eslint class-methods-use-this: ["error", { 
		"exceptMethods": [
			"toggleMenuVisibility",
			"toggleBodyBackground",
			"toggleMenuTriggerClass",
			"closeMobileMenuOnOutOfClick",
		] }] 
	*/
	toggleMenuVisibility() {
		$('.mobile-nav').toggleClass('is--visible');
	}
	toggleBodyBackground() {
		$('body').toggleClass('is--mobile-active');
	}
	toggleMenuTriggerClass() {
		$('.js-nav-toggle').toggleClass('is--active');
	}
	closeMobileMenuOnOutOfClick() {
		$('body').mouseup((e) => {
			let subject = $('.is--visible');

			if (subject.length
				&& !$(e.target).hasClass('js-nav-toggle')
				&& !$(e.target).hasClass('icon-nav')
				&& e.target.className !== subject.attr('class')
				&& !subject.has(e.target).length) {
				this.toggleMenuVisibility();
				this.toggleBodyBackground();
				this.toggleMenuTriggerClass();
			}
		});
	}
}
function initMenu() {
	return new Menu();
}
initMenu();

//
// Modal Popup
// =================================================================
$.arcticmodal('setDefault', {
	afterClose: () => {
		$('body').css({
			'overflow': 'auto',
			'margin-right': '0px',
		});
	},
});

$('[data-modal]').on('click', (e) => {
	e.preventDefault();
	let link = $(e.currentTarget).data('modal');

	if (link) {
		$(`#${link}`).arcticmodal();
	}
});

//
// Slider - Accounts
// =================================================================
if ($('.js-slider-antiques').length) {
	let sliderBlock = $('.js-slider-antiques');
	let options = () =>	{
		let setting = {};
		let	setting1 = {
			maxSlides: 2,
		};
		let setting2 = {
			maxSlides: 4,
		};
		let common = {
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
			prevText: '',
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
// Обработка элемента формы input[type=file]
// =================================================================
function showUploadThumb(input) {
	if (input.files && input.files[0]) {
		let reader = new FileReader();

		reader.onload = (e) => {
			let $thumb = $(`img[data-upload="${$(input).attr('id')}"]`);

			$thumb.attr('src', e.target.result);
		};

		reader.readAsDataURL(input.files[0]);
	}
}
$('input[type=file]').on('change', (event) => {
	let str = $(event.currentTarget).val();
	let $label = $(event.currentTarget).next();
	let labelText = $label.text();
	let i;

	if (str.lastIndexOf('\\')) {
		i = str.lastIndexOf('\\') + 1;
	} else {
		i = str.lastIndexOf('/') + 1;
	}

	let filename = str.slice(i);

	if (filename === '' || filename === undefined) {
		$label.text(labelText);
	} else {
		$label.text(filename);
	}

	showUploadThumb(event.currentTarget);
});
