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
var submitButton = document.getElementById("submit");
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

var timerCountDown = 120;
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
        question: "Commonly used data types DO NOT include?",
        choiceA: "Strings",
        choiceB: "Booleans",
        choiceC: "Alerts",
        choiceD: "Numbers",
        correct: "C",
    }, {
        question: "What is the condition in an if /else statement enclosed in?",
        choiceA: "Quotes",
        choiceB: "Curly brackets",
        choiceC: "Parenthesis",
        choiceD: "Square brackets",
        correct: "C",
    }, {
        question: "What can arrays in JavaScript be used to store?",
        choiceA: "Numbers and strings",
        choiceB: "Other arrays",
        choiceC: "Booleans",
        choiceD: "All of the above",
        correct: "D",
    }, {
        question: "What must string values be enclosed within, when being assigned to variables?",
        choiceA: "Commas",
        choiceB: "Curly braces",
        choiceC: "Quotes",
        choiceD: "Parenthesis",
        correct: "C",
    }, {
        question: "Which of the items below is a very useful tool, used during development, to print content to the debugger?",
        choiceA: "JavaScript",
        choiceB: "terminal / bash",
        choiceC: "for loops",
        choiceD: "console log",
        correct: "D",
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
        answerCheck.innerHTML = "Correct!";
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
    quiz.innerHTML = "Your Score is:" + score

}

submitButton.addEventListener("click", submitScore)
function submitScore() {
    var initialInput = document.querySelector("#myInput").value;
    localStorage.setItem("score", JSON.stringify(score));
    localStorage.setItem("initial", JSON.stringify(initialInput));
    window.location.href = './highscore.html';
}
