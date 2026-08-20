// Questions for the exam

let questions = [

    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks Text Mark Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },

    {
        question: "Which language is used to style a webpage?",
        options: [
            "HTML",
            "CSS",
            "Java",
            "Python"
        ],
        answer: 1
    },

    {
        question: "Which language is used to make webpages interactive?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        answer: 2
    },

    {
        question: "Which tag is used to create a paragraph in HTML?",
        options: [
            "<p>",
            "<h1>",
            "<br>",
            "<div>"
        ],
        answer: 0
    },

    {
        question: "Which symbol is used for an ID selector in CSS?",
        options: [
            ".",
            "#",
            "*",
            "@"
        ],
        answer: 1
    },

    {
        question: "Which method is used to print something in the browser console?",
        options: [
            "print()",
            "console.log()",
            "display()",
            "write()"
        ],
        answer: 1
    },

    {
        question: "Which HTML tag is used to create a button?",
        options: [
            "<button>",
            "<btn>",
            "<inputbutton>",
            "<click>"
        ],
        answer: 0
    },

    {
        question: "Which property is used to change text color in CSS?",
        options: [
            "font-color",
            "text-color",
            "color",
            "background-color"
        ],
        answer: 2
    },

    {
        question: "Which keyword is used to create a variable in JavaScript?",
        options: [
            "variable",
            "var",
            "create",
            "newvar"
        ],
        answer: 1
    },

    {
        question: "Which HTML tag is used to display an image?",
        options: [
            "<image>",
            "<picture>",
            "<img>",
            "<src>"
        ],
        answer: 2
    }

];


// Current question number

let currentQuestion = 0;


// Store the answers selected by the student

let selectedAnswers = [];


// Timer

let timeLeft = 300;


// Show the first question

showQuestion();


// Display question

function showQuestion() {

    let question = questions[currentQuestion];

    document.getElementById("questionNumber").innerText =
        "Question " + (currentQuestion + 1);

    document.getElementById("question").innerText =
        question.question;


    for (let i = 0; i < 4; i++) {

        let option = document.getElementById("option" + i);

        option.innerText = question.options[i];

        option.classList.remove("selected");

    }


    // If the student already answered this question,
    // show the selected option again.

    if (selectedAnswers[currentQuestion] !== undefined) {

        let answer = selectedAnswers[currentQuestion];

        document.getElementById("option" + answer)
            .classList.add("selected");

    }

}


// Select an answer

function selectAnswer(answer) {

    selectedAnswers[currentQuestion] = answer;


    // Remove selected style from all options

    for (let i = 0; i < 4; i++) {

        document.getElementById("option" + i)
            .classList.remove("selected");

    }


    // Highlight selected answer

    document.getElementById("option" + answer)
        .classList.add("selected");

}


// Go to next question

function nextQuestion() {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    } else {

        alert("This is the last question.");

    }

}


// Go to previous question

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();

    } else {

        alert("This is the first question.");

    }

}


// Timer function

let timer = setInterval(function () {

    timeLeft--;

    let minutes = Math.floor(timeLeft / 60);

    let seconds = timeLeft % 60;


    if (seconds < 10) {
        seconds = "0" + seconds;
    }


    document.getElementById("timer").innerText =
        minutes + ":" + seconds;


    // Automatically submit when time reaches zero

    if (timeLeft <= 0) {

        clearInterval(timer);

        alert("Time is over!");

        submitExam();

    }

}, 1000);


// Submit exam

function submitExam() {

    clearInterval(timer);


    let score = 0;


    // Check all answers

    for (let i = 0; i < questions.length; i++) {

        if (selectedAnswers[i] === questions[i].answer) {

            score++;

        }

    }


    let percentage =
        (score / questions.length) * 100;


    let studentName =
        document.getElementById("studentName").value;


    if (studentName === "") {

        studentName = "Student";

    }


    // Hide exam

    document.getElementById("examBox").style.display = "none";


    // Show result

    document.getElementById("resultBox").style.display = "block";


    document.getElementById("studentResult").innerText =
        "Well done, " + studentName + "!";


    document.getElementById("score").innerText =
        "Your Score: " + score + " / " + questions.length;


    document.getElementById("percentage").innerText =
        "Percentage: " + percentage + "%";

}


// Restart the exam

function restartExam() {

    currentQuestion = 0;

    selectedAnswers = [];

    timeLeft = 300;


    document.getElementById("examBox").style.display = "block";

    document.getElementById("resultBox").style.display = "none";


    document.getElementById("timer").innerText = "05:00";


    showQuestion();


    // Start timer again

    timer = setInterval(function () {

        timeLeft--;

        let minutes = Math.floor(timeLeft / 60);

        let seconds = timeLeft % 60;


        if (seconds < 10) {
            seconds = "0" + seconds;
        }


        document.getElementById("timer").innerText =
            minutes + ":" + seconds;


        if (timeLeft <= 0) {

            clearInterval(timer);

            submitExam();

        }

    }, 1000);

}