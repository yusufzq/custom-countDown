const inPutContainer = document.getElementById('input-container');
const form = document.querySelector('form');
const dateTimeElement = document.getElementById('date-picker');
const countDownElement = document.getElementById('countdown');
const countDownElementTitle = document.getElementById('countdown-title');
const countDownButton = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');
const completeElement = document.getElementById('complete');
const completeElementInfo = document.getElementById('complete-info');
const completeButton = document.getElementById('complete-button');
let countDownTitle = '';
let countDownDateTime = '';
let countDownValue = new Date();
let countDownActive;
let savedCountDown;
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const toDay = new Date().toISOString().slice(0, 16);
dateTimeElement.setAttribute('min', toDay);

function upDateDOM() {
	countDownActive = setInterval(() => {
		const now = new Date().getTime();
		const timeLeft = countDownValue - now;
		const days = Math.floor(timeLeft / day);
		const hours = Math.floor((timeLeft % day) / hour);
		const minutes = Math.floor((timeLeft % hour) / minute);
		const seconds = Math.floor((timeLeft % minute) / second);

		inPutContainer.hidden = true;

		if (timeLeft < 0) {
			countDownElement.hidden = true;

			clearInterval(countDownActive);

			completeElementInfo.textContent = `${countDownTitle} Finished on ${countDownDateTime.split('T')[0]} at ${countDownDateTime.split('T')[1]}`;
			completeElement.hidden = false;
		} else {
			countDownElementTitle.textContent = `${countDownTitle}`;
			timeElements[0].textContent = `${days}`;
			timeElements[1].textContent = `${hours}`;
			timeElements[2].textContent = `${minutes}`;
			timeElements[3].textContent = `${seconds}`;
			completeElement.hidden = true;
			countDownElement.hidden = false;
		};
	}, second);
};

function upDateCountDown(event) {
	event.preventDefault();

	countDownTitle = event.srcElement[0].value;
	countDownDateTime = event.srcElement[1].value;
	savedCountDown = {
		title: countDownTitle,
		dateTime: countDownDateTime
	};

	localStorage.setItem('countDown', JSON.stringify(savedCountDown));

	if (countDownDateTime === '') {
		alert('select date/time for the countDown');
	} else {
		countDownValue = new Date(countDownDateTime).getTime();

		upDateDOM();
	};
};

function reSet() {
	countDownElement.hidden = true;
	completeElement.hidden = true;
	inPutContainer.hidden = false;

	clearInterval(countDownActive);

	countDownTitle = '';
	countDownDateTime = '';
	localStorage.removeItem('countDown');
};

// get countDown details from local-storage if it exists
function reStoreCountDown() {
	if (localStorage.getItem('countDown')) {
		inPutContainer.hidden = true;
		savedCountDown = JSON.parse(localStorage.getItem('countDown'));
		countDownTitle = savedCountDown.title;
		countDownDateTime = savedCountDown.dateTime;
		countDownValue = new Date(countDownDateTime).getTime();
		
		upDateDOM();
	};
};

form.addEventListener('submit', upDateCountDown);
countDownButton.addEventListener('click', reSet);
completeButton.addEventListener('click', reSet);

reStoreCountDown();