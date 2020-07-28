const inputContainer = document.getElementById('input-container');
const form = document.querySelector('form');
const dateTimeElement = document.getElementById('date-picker');
const countdownElement = document.getElementById('countdown');
const countdownElementTitle = document.getElementById('countdown-title');
const countdownButton = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');
const completeElement = document.getElementById('complete');
const completeElementInfo = document.getElementById('complete-info');
const completeButton = document.getElementById('complete-button');
let countdownTitle = '';
let countdownDateTime = '';
let countdownValue = new Date();
let countdownActive;
let savedCountdown;
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const today = new Date().toISOString().slice(0, 16);
dateTimeElement.setAttribute('min', today);

function updateDOM() {
	countdownActive = setInterval(() => {
		const now = new Date().getTime();
		const timeLeft = countdownValue - now;
		const days = Math.floor(timeLeft / day);
		const hours = Math.floor((timeLeft % day) / hour);
		const minutes = Math.floor((timeLeft % hour) / minute);
		const seconds = Math.floor((timeLeft % minute) / second);

		inputContainer.hidden = true;

		if (timeLeft < 0) {
			countdownElement.hidden = true;
			clearInterval(countdownActive);
			completeElementInfo.textContent = `${countdownTitle} Finished on ${countdownDateTime}`;
			completeElement.hidden = false;
		} else {
			countdownElementTitle.textContent = `${countdownTitle}`;
			timeElements[0].textContent = `${days}`;
			timeElements[1].textContent = `${hours}`;
			timeElements[2].textContent = `${minutes}`;
			timeElements[3].textContent = `${seconds}`;
			completeElement.hidden = true;
			countdownElement.hidden = false;
		};
	}, second);
};

function updateCountdown(e) {
	e.preventDefault();
	countdownTitle = e.srcElement[0].value;
	countdownDateTime = e.srcElement[1].value;
	savedCountdown = {
		title: countdownTitle,
		dateTime: countdownDateTime
	};
	localStorage.setItem('countdown', JSON.stringify(savedCountdown));
	
	if (countdownDateTime === '') {
		alert('Please select a date for the countdown.')
	} else {
		countdownValue = new Date(countdownDateTime).getTime();
		updateDOM();
	};
};

function reset() {
	countdownElement.hidden = true;
	completeElement.hidden = true;
	inputContainer.hidden = false;
	clearInterval(countdownActive);
	countdownTitle = '';
	countdownDateTime = '';
	localStorage.removeItem('countdown');
};

// Get countdown from local storage if it exists
function restoreCountdown() {
	if (localStorage.getItem('countdown')) {
		inputContainer.hidden = true;
		savedCountdown = JSON.parse(localStorage.getItem('countdown'));
		countdownTitle = savedCountdown.title;
		countdownDateTime = savedCountdown.dateTime;
		countdownValue = new Date(countdownDateTime).getTime();
		updateDOM();
	};
};

form.addEventListener('submit', updateCountdown);
countdownButton.addEventListener('click', reset);
completeButton.addEventListener('click', reset);

restoreCountdown();