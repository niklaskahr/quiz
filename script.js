let questions = [
    {
        'question': 'Wofür steht HTML?',
        'answer1': 'Hypertext-Auszeitsprache',
        'answer2': 'Hypertext Markup Language',
        'answer3': 'Hot Tomato Mild Limo',
        'answer4': 'Hypertext Markout Language',
        'rightAnswer': 2
    },
    {
        'question': 'Was kann mit HTML machen?',
        'answer1': 'Vorrangig Webseiten dynamisieren',
        'answer2': 'Funktionen schreiben',
        'answer3': 'Daten im localStorage speichern',
        'answer4': 'Inhalte von Webseiten strukturieren',
        'rightAnswer': 4
    },
    {
        'question': 'Wann wurde HTML erfunden?',
        'answer1': 1989,
        'answer2': 2001,
        'answer3': 1965,
        'answer4': 1971,
        'rightAnswer': 1
    },
    {
        'question': 'In einer index.html kann man keinen CSS-Code schreiben.',
        'answer1': 'Wahr',
        'answer2': 'Falsch',
        'rightAnswer': 2
    },
    {
        'question': 'Von wem wurde HTML erfunden?',
        'answer1': 'Steve Jobs',
        'answer2': 'Elon Musk',
        'answer3': 'Tim Berners-Lee',
        'answer4': 'Notch',
        'rightAnswer': 3
    },
    {
        'question': 'Welches HTML-Element gibt es nicht?',
        'answer1': '&lt;img&gt;',
        'answer2': '&lt;a&gt;',
        'answer3': '&lt;di<b>√</b>&gt;',
        'answer4': '&lt;span&gt;',
        'rightAnswer': 3
    },
    {
        'question': 'In einer index.html kann man JavaScript-Code schreiben.',
        'answer1': 'Wahr',
        'answer2': 'Falsch',
        'rightAnswer': 1
    },

    {
        'question': 'Um in HTML einen Hyperlink zu erstellen, benutzt man...',
        'answer1': '&lt;header&gt;',
        'answer2': '&lt;hyperlink&gt;',
        'answer3': '&lt;body&gt;',
        'answer4': '&lt;a&gt;',
        'rightAnswer': 4
    }
];
let currentQuestion = 0;
let answeredCorrectly = 0;
let question = questions[currentQuestion];


function init() {
    document.getElementById('total-questions').innerHTML = questions.length;
    showQuestion();
}


function showProgress() {
    let progressinPercent = (currentQuestion / questions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progressinPercent}%`;
    //document.getElementById('progress-bar').innerHTML = progressinPercent;

    if (progressinPercent == 100) {
        document.getElementById('progress-bar').style.borderRadius = 0;
    }
}


function showQuestion() {
    if (quizOver()) {
        showResult();
    } else {
        renderQuestion();
    }
    showProgress();
}


function quizOver() {
    return currentQuestion >= questions.length
}


function answer(selection) {
    let question = questions[currentQuestion];
    let selectedAnswer = selection.slice(-1);

    evaluateAnswer(selectedAnswer, selection);
    document.getElementById('next-button').disabled = false;
}


function evaluateAnswer(selectedAnswer, selection) {
    let idRightAnswer = `answer-${question['rightAnswer']}`;

    if (rightAnswer(selectedAnswer)) {
        document.getElementById(selection).parentNode.classList.add('bg-correct');
        document.getElementById(`${selection}-letter`).classList.add('bg-correct2');
        document.getElementById(selection).classList.remove('bg-white_');

        answeredCorrectly += 1;
        document.getElementById('answered-correctly').innerHTML = answeredCorrectly;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-incorrect');
        document.getElementById(`${selection}-letter`).classList.add('bg-incorrect2');
        document.getElementById(selection).classList.remove('bg-white_');

        document.getElementById(idRightAnswer).parentNode.classList.add('bg-correct');
        document.getElementById(`${idRightAnswer}-letter`).classList.add('bg-correct2');
        document.getElementById(idRightAnswer).classList.remove('bg-white_');
    }
}


function rightAnswer(selectedAnswer) {
    return selectedAnswer == question['rightAnswer'];
}


function nextQuestion() {
    resetAnswers();
    document.getElementById('next-button').disabled = true;

    currentQuestion++;
    showQuestion();
}


function resetAnswers() {
    document.getElementById('answer-1').classList.add('bg-white_');
    document.getElementById('answer-1').parentNode.classList.remove('bg-correct', 'bg-incorrect');
    document.getElementById('answer-1-letter').classList.remove('bg-correct2', 'bg-incorrect2');

    document.getElementById('answer-2').classList.add('bg-white_');
    document.getElementById('answer-2').parentNode.classList.remove('bg-correct', 'bg-incorrect');
    document.getElementById('answer-2-letter').classList.remove('bg-correct2', 'bg-incorrect2');

    resetAnswers3And4();
}


function resetAnswers3And4() {
    if (question.answer3 && question.answer4 !== undefined) {
        document.getElementById('answer-3').classList.add('bg-white_');
        document.getElementById('answer-3').parentNode.classList.remove('bg-correct', 'bg-incorrect');
        document.getElementById('answer-3-letter').classList.remove('bg-correct2', 'bg-incorrect2');

        document.getElementById('answer-4').classList.add('bg-white_');
        document.getElementById('answer-4').parentNode.classList.remove('bg-correct', 'bg-incorrect');
        document.getElementById('answer-4-letter').classList.remove('bg-correct2', 'bg-incorrect2');
    }
}


function renderQuestion() {
    document.getElementById('question-text').innerHTML = question['question'];
    document.getElementById('question-counter').innerHTML = 1 + currentQuestion;

    document.getElementById('answer-1').innerHTML = question['answer1'];
    document.getElementById('answer-2').innerHTML = question['answer2'];

    checkAnswersUndefined();
}

function checkAnswersUndefined() {
    if (question['answer3'] == undefined) {
        document.getElementById('answer-3').remove();
    } else {
        renderAnswer3();
    }
    if (question['answer4'] == undefined) {
        document.getElementById('answer-4').remove();
    } else {
        renderAnswer4();
    }
}


function renderAnswer3() {
    document.getElementById('answer-3-container').innerHTML =
    `<div class="card-sub bg-white_ ps-2 py-2">
        <div id="answer-3-letter" class="letter-container">
        <span class="bold">C</span>
        </div>
        <span id="answer-3" class="ps-45">${question['answer3']}</span>
    </div>`;
}


function renderAnswer4() {
    document.getElementById('answer-4-container').innerHTML =
    `<div class="card-sub bg-white_ ps-2 py-2">
        <div id="answer-4-letter" class="letter-container">
            <span class="bold">D</span>
        </div>
        <span id="answer-4" class="ps-45">${question['answer4']}</span>
    </div>`;
}



function showResult() {
    if (answeredCorrectly == 0) {
        document.getElementById('answered-correctly').innerHTML = 0;
    }
    document.getElementById('total-questions2').innerHTML = questions.length;

    document.getElementById('question-container').classList.add('d-none');
    document.getElementById('endscreen').classList.remove('d-none');
}


function restart() {
    currentQuestion = 0;
    answeredCorrectly = 0;

    document.getElementById('question-container').classList.remove('d-none');
    document.getElementById('endscreen').classList.add('d-none');

    init();
}