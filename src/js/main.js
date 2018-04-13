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

//
// CLASS - Mobile Menu
// =================================================================
class Menu {
	constructor() {
		this.closeMobileMenuOnOutOfClick();
		$('.js-nav-toggle').on('click', () => {
			this.setMenuBlockHeight();
			this.toggleSubMenu();
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
			"setMenuBlockHeight",
			"toggleSubMenu",
		] }] 
	*/
	toggleSubMenu() {
		$('.mobile-nav__item').on('click', 'i', (event) => {
			$(event.currentTarget).parent().toggleClass('is--current');
		});
	}
	setMenuBlockHeight() {
		$('.mobile-nav__block').each((index, element) => {
			let height = $(element).height();

			$(element).height(height);
		});
	}
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
// Slider - antiques
// =================================================================
if ($('.js-slider-antiques').length) {
	$('.js-slider-antiques').slick({
		arrows: true,
		nextArrow: '.slider__next',
		prevArrow: '.slider__prev',
		adaptiveHeight: true,
		infinite: true,
		speed: 400,
		slidesToShow: 4,
		slidesToScroll: 1,
		// the magic
		responsive: [{
			breakpoint: 1200,
			settings: {
				slidesToShow: 3,
			},
		}, {
			breakpoint: 860,
			settings: {
				slidesToShow: 2,
			},
		}, {
			breakpoint: 600,
			settings: {
				slidesToShow: 1,
			},
		}],
	});
}

//
// Каталог - навигация
// =================================================================
$('.js-catalogue').on('click', '.js-catalogue-list-toggle', (event) => {
	let arrow = event.currentTarget;

	$(arrow).parent().toggleClass('is--opened');
});

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

//
// Валидация формы отзывов
// =================================================================
$('.js--feedback-form').validate({
	rules: {
		name: {
			required: true,
		},
		subject: {
			required: true,
		},
		comment: {
			required: true,
		},
	},
	messages: {
		subject: {
			required: 'Введите название предмета',
		},
		name: {
			required: 'Введите Ваше имя',
		},
		comment: {
			required: 'Введите Ваш отзыв',
		},
	},
	focusCleanup: true,
	focusInvalid: false,
});

//
// Валидация формы "Задать вопрос"
// =================================================================
$('.js--ask-form').validate({
	rules: {
		phone: {
			required: true,
		},
		comment: {
			required: true,
		},
	},
	messages: {
		phone: {
			required: 'Введите номер телефона',
		},
		comment: {
			required: 'Введите Ваш отзыв',
		},
	},
	focusCleanup: true,
	focusInvalid: false,
	submitHandler: (form) => {
		let uploadedFiles = false;

		$(form).find('.form__upload-file').each((index, element) => {
			uploadedFiles = element.value ? true : uploadedFiles;
		});

		if (uploadedFiles) {
			form.submit();
		} else {
			let message = 'Выберите файл';

			$(form).find('.form__text').before(`<div class="error error--fileupload">${message}</div>`);
			$(form).find('.form__upload-file').eq(0).next().addClass('error');
		}

		return false;
	},
});

//
// Валидация формы "Оценка антиквариата"
// =================================================================
let valuationValidateSettings = {
	rules: {
		phone: {
			required: true,
		},
	},
	messages: {
		phone: {
			required: 'Введите номер телефона',
		},
	},
	focusCleanup: true,
	focusInvalid: false,
	submitHandler: (form) => {
		let uploadedFiles = false;

		$(form).find('.valuation__upload-file').each((index, element) => {
			uploadedFiles = element.value ? true : uploadedFiles;
		});

		if (uploadedFiles) {
			form.submit();
		} else {
			let message = 'Выберите файл';

			if ($(form).find('.error--fileupload').length) {
				return false;
			}

			$(form).find('.valuation__step').eq(0).find('.valuation__step-title').after(`<div class="error error--fileupload">${message}</div>`);
			$(form).find('.valuation__upload-file').eq(0).next().addClass('error error--fileupload');
		}
		return false;
	},
};
let callbackValidateSettings = {
	rules: {
		phone: {
			required: true,
		},
	},
	messages: {
		phone: {
			required: 'Введите номер телефона',
		},
	},
	focusCleanup: true,
	focusInvalid: false,
};

// CALLBACK FORM
$('.js--callback-form').validate(callbackValidateSettings);

// SIDEBAR FORM
$('.js-valuation-form').validate(valuationValidateSettings);

// FOOTER FORM
$('.js-valuation-form--footer').validate(valuationValidateSettings);

// HORIZONTAL FORM
$('.js-valuation-form--horizontal').validate(valuationValidateSettings);

//
// Подключаем fancybox для фото товара
//---------------------------------------------------------------------------------------
let $gallery = $('[rel="gallery"]');

if ($gallery.length) {
	$gallery.fancybox({
		openEffect: 'elastic',
		closeEffect: 'elastic',
		helpers: {
			title: {
				type: 'inside',
			},
		},
	});
}

//
// Раскрытие/скрытие элементов
// =================================================================
$('.js-more-testimonials').on('click', (event) => {
	event.preventDefault();
	let $testimonials = $('.js-testimonials-wrapper');
	let $btn = $(event.currentTarget);

	if ($testimonials.hasClass('is--opened')) {
		$('#ask').arcticmodal();
	} else {
		$testimonials.addClass('is--opened');
		$btn.text('Задать вопрос');
	}
});

//
// Раскрытие/скрытие элементов
// =================================================================
$('.js-how-item').on('click', (event) => {
	event.preventDefault();
	let $feedbackSection = $('.section--feedback');
	let top = $feedbackSection.offset().top - 80;

	$('html, body').animate({scrollTop: top}, 1000);
});

//
// Scroll pane Init
// =================================================================
let $scrollable = $('.js-scroll-pane');

if ($scrollable.length) {
	$scrollable.jScrollPane();
}

//
// Communication Popup
// =================================================================
let $popupCommunication = $('#communication');
let timer = parseInt($.cookie('popupTimer'), 10) || 0;
let visits = parseInt($.cookie('popupVisits'), 10) || 0;
let showPopupAllow = $.cookie('popupAllow') || 'yes';
let showPopupFirstTime = 7000;
let showPopupPage = 4;
let timerIncriment;

function resetTimerCookie() {
	timer = 0;
	$.removeCookie('popupTimer', {path: '/'});
	$.cookie('popupTimer', 0, {path: '/'});
	console.log('resetTimerCookie');
}

function resetVisitsCookie() {
	visits = 0;
	$.removeCookie('popupVisits', {path: '/'});
	$.cookie('popupVisits', 0, {path: '/'});
	console.log('resetVisitsCookie');
}

function popupAllow() {
	showPopupAllow = 'yes';
	$.removeCookie('popupAllow', {path: '/'});
	$.cookie('popupAllow', 'yes', {path: '/'});
	console.log('popupAllow');
}
function popupDisallow() {
	showPopupAllow = 'no';
	$.removeCookie('popupAllow', {path: '/'});
	$.cookie('popupAllow', 'no', {path: '/'});
	console.log('popupDisallow');
}

// Увеличиваем количество просмотренных страниц
$.cookie('popupVisits', ++visits);
if (visits >= showPopupPage) {
	resetVisitsCookie();
	resetTimerCookie();
	popupAllow();
}
console.log('visits', visits);
console.log('allow', showPopupAllow);

if (showPopupAllow === 'yes') {
	// Показывваем попап первый раз через showPopupFirstTime мс
	timerIncriment = setInterval(() => {
		timer += 1000;
		$.removeCookie('popupTimer', {path: '/'});
		$.cookie('popupTimer', timer, {path: '/'});

		// если время пришло, показывваем попап
		if (timer === showPopupFirstTime) {
			$popupCommunication.arcticmodal();
		}

		// сбрасываем таймер на ноль
		if (timer > showPopupFirstTime) {
			resetTimerCookie();
		}

		console.log(parseInt($.cookie('popupTimer'), 10));
	}, 1000);
}

$(document).mouseleave((e) => {
	if (e.clientY <= 0) {
		$popupCommunication.arcticmodal();
		resetTimerCookie();
	}
});

// сбрасываем таймер при закрытии попапа
$('.js--close-communication-popup').on('click', (event) => {
	event.preventDefault();
	$popupCommunication.arcticmodal('close');

	resetTimerCookie();
	resetVisitsCookie();
	popupDisallow();
	clearInterval(timerIncriment);
});
