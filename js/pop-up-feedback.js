function cookieInit() {
const cookieMessage = document.querySelector('[data-js="cookie"]');

if(!cookieMessage) return

const cookieBtn = cookieMessage.querySelector('[data-js="cookieBtn"]');
const cookieMore = cookieMessage.querySelector('[data-js="cookieMore"]');
const cookieText = cookieMessage.querySelector('[data-js="cookieText"]');
const cookieName = 'cookie_policy';

let currentCookieValue = document.cookie.match(new RegExp("(?:^|; )" + cookieName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));

console.log(currentCookieValue)

if (!currentCookieValue) {
	cookieMessage.style.display = 'flex';
}

cookieMore.addEventListener('click', function () {
	cookieText.classList.add('active');
	cookieMore.style.display = 'none';
});

cookieBtn.addEventListener('click', function () {
	document.cookie = `${cookieName}=true`
	cookieMessage.style.display = 'none';
});
}

document.addEventListener("DOMContentLoaded", function () {
cookieInit()
})

function myAddEventListener(el, eventName, eventHandler, selector) {
	if (selector) {
		var wrappedHandler = (e) => {
			if (!e.target) return;
			var el2 = e.target.closest(selector);
			if (el2) {
				eventHandler(el2, e);
			}
		};
		el.addEventListener(eventName, wrappedHandler);
		return wrappedHandler;
	} else {
		var wrappedHandler = (e) => {
			eventHandler(el, e);
		};
		el.addEventListener(eventName, wrappedHandler);
		return wrappedHandler;
	}
}

function openPopUp(popUp) {
	popUp.classList.add("active");
	document.body.style.overflow = "hidden";
}

function closePopUp(popUp) {
	popUp.classList.remove("active");
	document.body.style.overflow = "";
}

function closeAllPopUps() {
	document.querySelectorAll('.js-popup.active').forEach((popUp, i) => {
		closePopUp(popUp);
	});
}
function switchPopupToThanks(popUp) {
	popUp.classList.remove("active");
	document.body.style.overflow = "";
}


document.addEventListener("DOMContentLoaded", function () {
	myAddEventListener(document, 'click', function (el, e) {
		closePopUp(el.closest('.js-popup'));
	}, '.js-popup-closer');

	myAddEventListener(document, 'click', function (el, e) {
		openPopUp(document.querySelector('.js-popup-callback'));
	}, '.js-pop-up-callback-open');

	const openButtons = document.querySelectorAll(".js-pop-up-callback-open");
	openButtons.forEach(button => button.addEventListener("click", openPopUp));
});


if (document.location.href.includes('localhost/bravo1/')) {
	window.sendformUrl = '/bravo1/sendForm.php';
}
else {
	window.sendformUrl = '/sendForm.php';
}

window.recaptchaKey = '6LfIPIYqAAAAAMqLGuo2O40uKnTRJIkEPpNo-xDf';

document.addEventListener('DOMContentLoaded', () => {
	var grcScript = document.createElement("script");
	grcScript.setAttribute('src', 'https://www.google.com/recaptcha/api.js?render=' + recaptchaKey)
	document.body.appendChild(grcScript)

	var forms = document.querySelectorAll('.js-ajax-form');
	forms.forEach((form, i) => {
		var nameInput = form.querySelector('.js-form__name-input');
		var telInput = form.querySelector('.js-form__tel-input');

		var grcInput = form.querySelector('.js-recaptcha-response');
		if (grcInput === null) {
			grcInput = document.createElement("input");
			grcInput.classList.add('js-recaptcha-response');
			grcInput.setAttribute('name', 'recaptchaResponse');
			grcInput.setAttribute('type', 'hidden');
			grcInput.style.display = 'none';
			form.appendChild(grcInput);
		}

		telInput.addEventListener('input', () => {

			if (!telInput.value.startsWith('+7')) {
				telInput.value = '+7';
			}

			telInput.value = telInput.value.replace(/[^\d+]/g, '');

			if (telInput.value.length > 12) {
				telInput.value = telInput.value.slice(0, 12);
			}
		});

		if (nameInput !== null) {
			nameInput.addEventListener('input', () => {
				nameInput.value = nameInput.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
			});
		}

		form.addEventListener('submit', (event) => {
			event.preventDefault();
			let isValid = true;


			telInput.style.backgroundColor = '';
			if (nameInput !== null) {
				nameInput.style.backgroundColor = '';
				if (nameInput !== null && !nameInput.value.trim()) {
					nameInput.style.backgroundColor = 'rgb(255, 142, 142, 0.2)';
					isValid = false;
				}
			}

			if (telInput.value.length < 12) {
				telInput.style.backgroundColor = 'rgb(255, 142, 142, 0.2)';
				isValid = false;
			}

			if (!isValid) {
				return;
			}

			form.classList.add('form-submit-progress');
			grecaptcha.ready(function () {
				grecaptcha.execute(recaptchaKey, { action: 'submit' }).then(function (token) {
					grcInput.value = token;

					setTimeout(() => {
						fetch(window.sendformUrl + window.location.search, {
							method: 'POST',
							body: new FormData(form),
						})
							.then(function (response) {
								form.classList.remove('form-submit-progress');
								if (response.status >= 200 && response.status < 300) {
									return response
								} else {
									alert('Ошибка. Попробуйте ещё раз или свяжитесь с нами иным способом');
								}
							})
							.then(function (response) {
								return response.json()
							})
							.then(function (response) {
								//console.log(response);//TODO remove
								if (response.success === true) {
									closeAllPopUps();
									openPopUp(document.querySelector('.js-popup-successfull-send'));
								} else {
									if (response.errorText !== '') {
										alert(response.errorText);
									} else {
										alert('Ошибка. Попробуйте ещё раз или свяжитесь с нами иным способом');
									}

								}
							}).catch(function (error) {
								form.classList.remove('form-submit-progress');
								alert('Ошибка. Попробуйте ещё раз или свяжитесь с нами иным способом');
							});
					}, 100);
				});
			});
		});
	});
});

document.addEventListener('DOMContentLoaded', () => {
	var element = document.getElementById('header');
	window.addEventListener('scroll', function () {
	   if (window.scrollY > 100) {
			element.classList.add("header--fixed");
		} else {
			element.classList.remove("header--fixed");
		}
	});
});
