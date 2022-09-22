//variables
var currentQ = 0
var time= 60
var timer

var homePage = document.querySelector("#home")
var questionsEl = document.querySelector("#question")
var timeO = document.querySelector("#time")
var options = document.querySelector("#options")
var submit = document.querySelector("#submit")
var quizStart = document.querySelector ("#start")

var comments = document.querySelector("#comments");

//questions and answer 
var questions = [
  {
    q:"What is an even number?",
    choices: ["1", "5", "3","4"],
    answer: "4",
  },

  {
    q:"What is an even number?",
    choices: ["1", "5", "3","4"],
    answer: "4",
  }
]


var highscore = JSON.parse(window.localStorage.getItem("highscore")) || [];

function beginQuiz() {
  homePage.setAttribute("class", "hidden");
  questionsEl.removeAttribute("class");

  timer = setInterval(clock, 1000);

  getQuestion();
}

function getQuestion() {
  var nowQuestion = questions[currentQ];
  var questionTopic = document.getElementById("q-topic");
  questionTopic.textContent = nowQuestion.quest;

  options.innerHTML = "";

  nowQuestion.choices.forEach(function (choice, c) {
    var choicebtn = document.createElement("button");
    choicebtn.setAttribute("class", "options");
    choicebtn.setAttribute("value", choice);

    choicebtn.textContent = c + 1 + ". " + choice;

    choicebtn.onclick = AnswerValid;

    options.appendChild(choicebtn);
  });
}

function AnswerValid() {
  if (this.value == questions[currentQ].answer) {
    comments.textContent = "Correct!";

    if (time < 0) {
      time = 0;
    }

    timeO.textContent = time;
    comments.textContent = "Wrong!";
  }

  comments.setAttribute("class", "comments");
  setTimeout(function () {
    comments.setAttribute("class", "comments hidden");
  }, 1000);

  currentQ++;

  if (currentQ === questions.length) {
    endQuiz();
  } else {
    getQuestion();
  }
}

function endQuiz() {
  clearInterval(timer);

  var endGame = document.querySelector("#quiz-end");
  endGame.removeAttribute("class");

  var gameScore = document.querySelector("#score");
  gameScore.textContent = time;

  questionsEl.setAttribute("class", "hidden");
}

function clock() {
  time--;
  timeO.textContent = time;

  if (time <= 0) {
    endQuiz();
  }
}

function saveScore() {
  var initials = document.querySelector("#initials").value.trim();

  if (initials !== "") {
    var newScore = {
      score: time,
      initials: initials,
    };
    highscore.push(newScore);
    window.localStorage.setItem("highscore", JSON.stringify(highscore));
    window.location.href = "highscore.html";
  }
}

function verifyEnter(event) {
  if (event?.key === "Enter") {
    saveScore();
  }
}

submit.addEventListener("click", saveScore);

quizStart.addEventListener("click", beginQuiz);

onkeydown = function () {
  verifyEnter();
};