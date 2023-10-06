const start = document.querySelector('#start');				// Кнопка Старт
const screens = document.querySelectorAll('.screen');		// Экраны
const timeList = document.querySelector('#time-list');		// Кнопки выбора времени
const timeLost = document.querySelector('.time');			// Оставшееся время
const field = document.querySelector('#field');

// Вспомогательные переменные
let time = 0; 												// Переменная для времени
let score = 0;												// Переменная для счета







// === Стартовый экран =================================================
start.addEventListener('click', (event) => {
	event.preventDefault();
	screens[0].classList.add('up');
	
});


// === Старт игры ======================================================
timeList.addEventListener('click', event => {
	if(event.target.classList.contains('time__btn')) {
		time = parseInt(event.target.getAttribute('data-time-count'));
		screens[1].classList.add('up');	
		startGame();
	}
})


// === Добавляем очки, убираем/добавляем новые глаза ===================
field.addEventListener('click', event => {
	if(event.target.classList.contains('eye')) {
		score++;
		event.target.remove();
		createRandomEye();
		
	}
})




// ------------------------------------------------------ Старт игры ---
function startGame() {	
	setInterval(decreaseTime, 1000);
	if(time === 60) {		
		timeLost.innerHTML = `01:00`;
	} else {		
		setTime(time);
	}
	createRandomEye();
}

// ----------------------------------------------- Уменьшение времени ---
function decreaseTime() {
	if(time === 0) {
		finishGame();
	} else {
		let current = --time;
		if (current < 10 ) {
			timeLost.innerHTML  = `00:0${current}`;
		} else {
			setTime(current);
		}
	}
}

// ------------------------------------- Подставляем значения времени ---
function setTime(value) {	
	timeLost.innerHTML = `00:${value}`;
}

// --------------------------------------------------- Рандомный глаз ---
function createRandomEye() {
	const eye = document.createElement('div');
	eye.classList.add('eye');
	
	const size = getRandomNumber(10, 60);
	const {width, height} = field.getBoundingClientRect();
	const x = getRandomNumber(0, width-size);
	const y = getRandomNumber(0, height-size);
	
	
	eye.style.width = `${size}px`;
	eye.style.height = `${size}px`;
	eye.style.top = `${y}px`;
	eye.style.left = `${x}px`;
	
	field.append(eye);
}

// ------------------------------------------------- Рандомный размер ---
function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

// ------------------------------------------------------- Конец игры ---
function finishGame () {
	timeLost.remove();
	field.innerHTML = `<h2 class="score">Счет: <span class="accent"> ${score}</span></h2>`;
	
}











