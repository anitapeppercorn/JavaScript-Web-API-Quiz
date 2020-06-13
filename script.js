var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var timerSpan = document.getElementById("timer");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var scoreDiv = document.getElementById("score");
var pEl = document.getElementById("pElement");
var answerCheck = document.getElementById("answer");
var sumbitButton = document.getElementById("submit");
var localStorage = window.localStorage;

var answerCheckTimeOut;
function setAnswerCheckTimeOut() {
    answerCheckTimeOut = setTimeout(function () {
        answerCheck.innerHTML = " ";
    }, 1000);
};
function clearAnswerTimeOut() {
    clearTimeout(answerCheckTimeOut);
}

var timerCountDown = 25;
var timerCountDownTimer;
function setTimerCountDownTimeOut() {
    timerCountDownTimer = setInterval(function () {
        timerSpan.innerHTML = timerCountDown;
        timerCountDown = timerCountDown - 1;
        if (timerCountDown < 0) {
            scoreRender(1);
            clearTimerCountDown();
        }
    }, 1000)
};
function clearTimerCountDown() {
    clearInterval(timerCountDownTimer);
}

//Create questions
var questions = [
    {
        question: "What does HTML stands for?",
        choiceA: "Home Tool Makeup language",
        choiceB: "Hyperlinks and text Markup Language",
        choiceC: "Hyper Text Markup Language",
        choiceD: "Hyper Tool Makeup Language",
        correct: "C",
    }, {
        question: "What does CSS stands for?",
        choiceA: "Colorful Style Sheets",
        choiceB: "Cascading Style Sheets",
        choiceC: "Computer Style Sheets",
        choiceD: "Concept Style Sheets",
        correct: "B",
    }, {
        question: "What is considered to be the most popular programming language in the world?",
        choiceA: "JavaScript",
        choiceB: "HTML",
        choiceC: "Pathon",
        choiceD: "Java",
        correct: "A",
    }, {
        question: "In CSS and HTML colors are displayed by combining these three shades of light",
        choiceA: "White, Pink and Blue",
        choiceB: "Yellow, Blue, and Green.",
        choiceC: "Violet, Red and Orange",
        choiceD: "Red, Green, and Blue.",
        correct: "D",
    }, {
        question: "What elements are used to test for TRUE or False values stored in variables?",
        choiceA: "Function",
        choiceB: "Comparison and Logical Operators",
        choiceC: "Conditional Statements",
        choiceD: "DOM",
        correct: "B",
    }, {
        question: "What is a JavaScript element that represents either TRUE or FALSE values",
        choiceA: "Array",
        choiceB: "Number",
        choiceC: "String",
        choiceD: "Boolean",
        correct: "D",
    }, {
        question: "What is the type of loop that continues through a block of code as long as the specified condition remains TRUE?",
        choiceA: "For Loop",
        choiceB: "Conditional Loop",
        choiceC: "While Loop",
        choiceD: "If-Else Loop",
        correct: "C",
    }, {
        question: "What is a block of code called that is used to perform a specific task in Javascript?",
        choiceA: "Function",
        choiceB: "Variable",
        choiceC: "charAt",
        choiceD: "String",
        correct: "A",
    }, {
        question: "What element is used to store and manipulate text usually in multiples in JavaScript?",
        choiceA: "Array",
        choiceB: "Strings",
        choiceC: "Variable",
        choiceD: "Function",
        correct: "B",
    }
];
var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var score = 0;

start.addEventListener("click", startQuiz);
function startQuiz() {
    start.style.display = "none";
    pEl.style.display = "none"
    renderQuestion();
    quiz.style.display = "block";
    setTimerCountDownTimeOut();
}

function renderQuestion() {
    var q = questions[runningQuestion];
    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;

}


function checkAnswer(answer) {
    if (answer === questions[runningQuestion].correct) {
        score++;
        answerCheck.innerHTML = "You got it!";
    } else {
        timerCountDown = timerCountDown - 5;
        answerCheck.innerHTML = "Wrong!"
    }
    if (answerCheckTimeOut) {
        clearAnswerTimeOut();
        setAnswerCheckTimeOut();
    } else {
        setAnswerCheckTimeOut();
    }
    if (runningQuestion === lastQuestion) {
        scoreRender(0);

    } else {
        runningQuestion++;
        renderQuestion();
    }
}
choiceA.addEventListener("click", function () {
    checkAnswer("A");
})
choiceB.addEventListener("click", function () {
    checkAnswer("B");
})
choiceC.addEventListener("click", function () {
    checkAnswer("C");
})
choiceD.addEventListener("click", function () {
    checkAnswer("D");
})

//display results endType: 0: finished the with quiz,  1: time out.
function scoreRender(endType) {
    clearTimerCountDown();
    if (endType === 0) {
        alert("You have finished your quiz!");
    } else {
        alert("Time is out!");
    }
    final.style.display = "block"
    quiz.innerHTML = "Your Score:" + score + "/9."

}

sumbitButton.addEventListener("click", submitScore)
function submitScore() {
    var initialInput = document.querySelector("#myInput").value;
    localStorage.setItem("score", JSON.stringify(score));
    localStorage.setItem("initial", JSON.stringify(initialInput));
    window.location.href = './leaderBoard.html';
}
