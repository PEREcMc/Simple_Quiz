const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
	{
		question: "Как можно найти родителя элемента?",
		answers: ["elem.parent()", "e.parent('selector')", "element.closest('selector')", "все ответы неверные"],
		correct: 3,
	},
];

const headerContainer = document.getElementById('header');
const listContainer = document.getElementById('list');
const btnSubmit = document.getElementById('submit');

let questionIndex = 0;
let score = 0;

clearPage();
showQuestion();
btnSubmit.onclick = checkAnswer;
list.onclick = showAnswerCorrect;

//очистка HTML
function clearPage() {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
};

// отображаем текущий вопрос
function showQuestion() {
	// questions[questionIndex]['question'];

	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
	headerContainer.innerHTML = title;

	for ([index, answer] of questions[questionIndex]['answers'].entries()) {
		
		const questionTemplate = `<li class="list">
									<label>
										<input value="%number%" type="radio" class="answer" name="answer" />
										<span>%answer%</span>
									</label>
								 </li>`;

		const answerHTML = questionTemplate
									.replace('%answer%', answer)
									.replace('%number%', index + 1);

		listContainer.innerHTML += answerHTML;
	};

};

function checkAnswer() {
	
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

	if (!checkedRadio) {
		btnSubmit.blur();
		return
	};
	const userAnswer = parseInt(checkedRadio.value);

	if (userAnswer === questions[questionIndex]['correct']) {
		score++;
	};

	if (questionIndex !== questions.length - 1) {
		questionIndex++;
		clearPage();
		showQuestion();
	} else {
		clearPage();
		showResults();
	}; 

};

function showAnswerCorrect() {

		const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
		const list = checkedRadio.closest('.list');
		const userAnswer = parseInt(checkedRadio.value);
		if (userAnswer === questions[questionIndex]['correct']) {
			list.classList.toggle('shake');
		} else {
			list.classList.toggle('shake-no');
		};
};

function showResults() {
	const resultsTemplate = `
								<h2 class="title">%title%</h2>
								<h3 class="summary">%message%</h3>
								<p class="result">%result%</p>
							`;
	let title, message;

	if (score === questions.length) {
		title = 'Поздравляем! 🍻 🎉 🏆';
		message = 'Вы ответили верно на все вопросы! 💯';
	} else if ((score * 100) / questions.length >= 50) {
		title = 'Неплохой результат! 😉 👍';
		message = 'Вы ответили верно на большую часть вопросов!';
	} else {
		title = 'Стоит постараться! 😐 🐣';
		message = 'Пока у вас меньше половины правильных ответов.';
	}

	let result = `${score} из ${questions.length}`;

	const finalMessage = resultsTemplate
									.replace('%title%', title)
									.replace('%message%', message)
									.replace('%result%', result);

	headerContainer.innerHTML = finalMessage;

	btnSubmit.blur();
	btnSubmit.innerText = 'Пройти тест заново';
	btnSubmit.onclick = () => history.go();
};

