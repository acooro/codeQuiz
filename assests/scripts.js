//variables
var currentQ = 0
var time= 30
var timer

var homeScreen = document.querySelector("#home")
var questionsEl = document.querySelector("#question")
var timeO = document.querySelector("#time")
var options = document.querySelector("#options")
var submit = document.querySelector("#submit")
var quizStart = document.querySelector ("#start")
var currentScore = 0
var finalScore
var highScoreArr = []
var timeInterval

var comments = document.querySelector("#comments");

//questions and answer 
var questions = [
  {
    q:"Which mammal is known to have the most powerful bite in the world?",
    choices: ["Lion", "Shark", "Hippo","Human"],
    answer: "Hippo",
  },

  {
    q:"Which country was split into two zones by the Yalta agreement?",
    choices: ["Germany", "Virginia", "Dakota","Korea"],
    answer: "Germany",
  },

  {
    q:"In the movie Finding Nemo, who was Marlin's wife?",
    choices: ["Daisy", "Flounder", "Flower","Coral"],
    answer: "Coral",
  },

  {
    q:"What is the perfect score in a game of Ten Pin Bowling",
    choices: ["150", "200", "250","300"],
    answer: "300",
  },

  {
    q:"What is the full name of the rapper Puff Daddy?",
    choices: ["Sean John Combs", "Alexander Zinc", "Davis Ember","Ron Father Jr"],
    answer: "Sean John Combs",
  }
]



function beginQuiz() {
  homeScreen.setAttribute("class", "hidden");
  questionsEl.removeAttribute("class");

  timeInterval = setInterval(function(){
    time--;
    timeO.textContent = time;
    if(time === 0){
      clearInterval(timeInterval)
      timeO.textContent = "Time's UP"
    }
  },1000);

  getQuestion();
}

function getQuestion() {
  var nowQuestion = questions[currentQ];
  var questionTopic = document.getElementById("q-topic");
  questionTopic.textContent = nowQuestion.q;

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
    currentScore ++;
    
  }else {comments.textContent = "Wrong!";
  }

  comments.setAttribute("class", "comments");
  setTimeout(function () {
    comments.setAttribute("class", "comments hidden");
  }, 1000);

  currentQ++;

  console.log (currentQ)

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
  gameScore.textContent = currentScore;

  questionsEl.setAttribute("class", "hidden");
}


quizStart.addEventListener("click", beginQuiz);

