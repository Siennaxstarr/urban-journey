const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "London", "Paris", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Earth", "Mars", "Jupiter"],
        answer: "Mars"
    },
    // Add more questions here
];

const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const timeLeftElement = document.getElementById("time-left");
const resultElement = document.getElementById("result");
const highScoreForm = document.getElementById("high-score-form");
const userNameInput = document.getElementById("user-name");

var sec = 15;
var time = setInterval(myTimer, 1000);

function myTimer() {
    document.getElementById('timer').innerHTML = sec + "sec left";
    sec--;
    if (sec == -1) {
        clearInterval(time);
        alert("Time out!! :(");
    }
}

function startQuiz() {
    highScoreForm.style.display = "none";
    quizContainer.style.display = "block";
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        questionElement.innerText = question.question;
        optionsElement.innerHTML = "";
        question.options.forEach((option, index) => {
            const li = document.createElement("li");
            li.innerText = option;
            li.addEventListener("click", () => checkAnswer(option));
            optionsElement.appendChild(li);
        });
    } else {
        endQuiz();
    }
}

function checkAnswer(selectedOption) {
    const question = questions[currentQuestionIndex];
    if (selectedOption === question.answer) {
        score++;
    }
    currentQuestionIndex++;
    displayQuestion();
}

function startTimer() {
    timeLeftElement.innerText = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--;
        timeLeftElement.innerText = timeLeft;
        if (timeLeft === 0) {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timerInterval);
    quizContainer.style.display = "none";
    resultElement.innerText = `You scored ${score}/${questions.length}`;
    highScoreForm.style.display = "block";
}

highScoreForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userName = userNameInput.value;
    // Store the user's score and name in your high scores system (e.g., local storage or a server)
    // Reset the quiz or redirect to a different page
});

startQuiz();
