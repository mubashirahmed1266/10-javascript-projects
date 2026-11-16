// DOM Selectors
const currentQuestion = document.querySelector("#current-question");
const totalQuestions = document.querySelector("#total-questions");
const timer = document.querySelector("#timer");
const countdown = document.querySelector("#countdown");
const progressBar = document.querySelector("#progress-bar");
const progressText = document.querySelector("#progress-text");

const questionText = document.querySelector("#question-text");
const questionLabel = document.querySelector(".question-label");
const optionsContainer = document.querySelector("#options-container");

const nextButton = document.querySelector("#next-btn");
const prevButton = document.querySelector("#prev-btn");
const submitButton = document.querySelector("#submit-btn");

const resultContainer = document.querySelector("#results-container");
const restartButton = document.querySelector("#play-again-btn");

const finalScore = document.querySelector("#final-score");
const percentage = document.querySelector("#percentage");
const correctAnswers = document.querySelector("#correct-answers");
const incorrectAnswers = document.querySelector("#incorrect-answers");
const timeTaken = document.querySelector("#time-taken");

const navigationButtons = document.querySelectorAll(".nav-item");


// Questions
const questions = [
    {
        question: "What is the capital city of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correctAnswer: "Canberra"
    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "None"
        ],
        correctAnswer: "Hyper Text Markup Language"
    },
    {
        question: "Which language is used to style web pages?",
        options: ["HTML", "CSS", "Python", "Java"],
        correctAnswer: "CSS"
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "let", "const", "All of these"],
        correctAnswer: "All of these"
    },
    {
        question: "Which library is used to build user interfaces?",
        options: ["React", "Django", "Laravel", "Flask"],
        correctAnswer: "React"
    }
];


// Quiz Variables
let currentQuestionIndex = 0;
let answers = [];

let timeLeft = 30;
let timerInterval;

let quizStartTime;
let totalTime = 0;


// Initial Setup
totalQuestions.textContent = questions.length;
resultContainer.style.display = "none";

nextButton.disabled = true;
prevButton.disabled = true;


// Start Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    answers = Array(questions.length).fill(null);
    totalTime = 0;
    quizStartTime = Date.now();

    resultContainer.style.display = "none";
    document.querySelector(".quiz-container").style.display = "block";

    showQuestion(currentQuestionIndex);
}


// Show Question
function showQuestion(index) {
    clearInterval(timerInterval);

    const question = questions[index];

    currentQuestion.textContent = index + 1;
    questionText.textContent = question.question;
    questionLabel.textContent =
        `QUESTION ${String(index + 1).padStart(2, "0")}`;

    optionsContainer.innerHTML = "";

    question.options.forEach((option, optionIndex) => {
        const label = document.createElement("label");

        label.className = "option";

        label.innerHTML = `
            <input type="radio" name="answer" value="${option}">
            <span class="option-letter">${String.fromCharCode(65 + optionIndex)}</span>
            <span class="option-text">${option}</span>
        `;

        optionsContainer.appendChild(label);

        if (answers[index] === option) {
            label.querySelector("input").checked = true;
        }
    });

    prevButton.disabled = index === 0;

    nextButton.disabled = answers[index] === null;

    submitButton.disabled = false;

    nextButton.textContent =
        index === questions.length - 1
            ? "Finish Quiz"
            : "Next Question →";

    updateProgress();
    updateNavigation();
    startTimer();
}


// Get Selected Answer
function getSelectedAnswer() {
    const selectedOption = document.querySelector(
        'input[name="answer"]:checked'
    );

    return selectedOption ? selectedOption.value : null;
}


// Check Answer
function checkAnswer() {
    const selectedAnswer = getSelectedAnswer();

    return selectedAnswer ===
        questions[currentQuestionIndex].correctAnswer;
}


// Submit Answer
submitButton.addEventListener("click", () => {
    const selectedAnswer = getSelectedAnswer();

    if (selectedAnswer === null) {
        alert("Please select an answer!");
        return;
    }

    clearInterval(timerInterval);

    answers[currentQuestionIndex] = selectedAnswer;

    if (checkAnswer()) {
        alert("Correct Answer!");
    } else {
        alert("Incorrect Answer!");
    }

    submitButton.disabled = true;
    nextButton.disabled = false;

    updateNavigation();
});


// Next Question
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex === questions.length - 1) {
        finishQuiz();
        return;
    }

    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
});


// Previous Question
prevButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
});


// Question Navigation
navigationButtons.forEach(button => {
    button.addEventListener("click", () => {
        const questionIndex = Number(button.dataset.question);

        if (
            questionIndex >= 0 &&
            questionIndex < questions.length
        ) {
            currentQuestionIndex = questionIndex;
            showQuestion(currentQuestionIndex);
        }
    });
});


// Update Progress Bar
function updateProgress() {
    const progress =
        ((currentQuestionIndex + 1) / questions.length) * 100;

    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${progress}%`;
}


// Update Question Navigation
function updateNavigation() {
    navigationButtons.forEach((button, index) => {
        button.classList.toggle(
            "active",
            index === currentQuestionIndex
        );

        button.classList.toggle(
            "answered",
            answers[index] !== null
        );
    });
}


// Timer
function startTimer() {
    clearInterval(timerInterval);

    timeLeft = 30;
    countdown.textContent = "00:30";

    timerInterval = setInterval(() => {
        timeLeft--;

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        countdown.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);

            submitButton.disabled = true;
            nextButton.disabled = false;
        }
    }, 1000);
}


// Finish Quiz
function finishQuiz() {
    clearInterval(timerInterval);

    totalTime = Math.floor((Date.now() - quizStartTime) / 1000);

    const correct = answers.filter((answer, index) => {
        return answer === questions[index].correctAnswer;
    }).length;

    const incorrect = questions.length - correct;

    const resultPercentage =
        Math.round((correct / questions.length) * 100);

    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;

    finalScore.textContent = `${correct}/${questions.length}`;
    percentage.textContent = `${resultPercentage}%`;
    correctAnswers.textContent = correct;
    incorrectAnswers.textContent = incorrect;

    timeTaken.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    document.querySelector(".quiz-container").style.display = "none";
    resultContainer.style.display = "block";
}


// Restart Quiz
function restartQuiz() {
    clearInterval(timerInterval);
    startQuiz();
}


// Restart Button Event
restartButton.addEventListener("click", restartQuiz);


// Start Quiz Automatically
startQuiz();