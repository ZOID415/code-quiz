// Define variables
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit-score");
var startBtn = document.querySelector("#start");
var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");
var reStartBtn = document.querySelector("#restart");
var leaderBoardEl = document.querySelector("#leaderboard");
var highscoreEl = document.querySelector("#highscore");
var clearBtn = document.querySelector("#clear-btn")
var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

// Create object of arrays that will be the questions on the quiz
var questions = [
  {
    prompt: "What does HTML stand for?",
    options: [
      "<HonoraryTacticMatchLinguistics>",
      "<HyperTextMarkupLanguage>",
      "<HandToMarkLaser>",
      "<HomeToolMakingLaser>",
    ],
    answer: "<HyperTextMarkupLanguage>",
  },

  {
    prompt: "What does HTML stand for?",
    options: [
      "<HonoraryTacticMatchLinguistics>",
      "<HyperTextMarkupLanguage>",
      "<HandToMarkLaser>",
      "<HomeToolMakingLaser>",
    ],
    answer: "<HyperTextMarkupLanguage>",
  },

  {
    prompt: "What does HTML stand for?",
    options: [
      "<HonoraryTacticMatchLinguistics>",
      "<HyperTextMarkupLanguage>",
      "<HandToMarkLaser>",
      "<HomeToolMakingLaser>",
    ],
    answer: "<HyperTextMarkupLanguage>",
  },

  {
    prompt: "What does HTML stand for?",
    options: [
      "<HonoraryTacticMatchLinguistics>",
      "<HyperTextMarkupLanguage>",
      "<HandToMarkLaser>",
      "<HomeToolMakingLaser>",
    ],
    answer: "<HyperTextMarkupLanguage>",
  },

  {
    prompt: "What does HTML stand for?",
    options: [
      "<HonoraryTacticMatchLinguistics>",
      "<HyperTextMarkupLanguage>",
      "<HandToMarkLaser>",
      "<HomeToolMakingLaser>",
    ],
    answer: "<HyperTextMarkupLanguage>",
  },
];

// Quiz's initial state

var currentQuestionIndex = 0;
var time = questions.length * 20;
var timerId;

// Start quiz and hide frontpage
function leaderBoard() {
  // leaderBoardEl.textContent = scores;
  highscoreEl.classList.remove("hide");
  console.log(highscores);
  for (let i = 0; i < highscores.length; i++) {
    let ul = document.createElement("li");
    //  Creating an unordered list with ul
    console.log(ul);

    //Ask what the orange is (including backticks)
    let scoreHTML = `${i + 1}. ${highscores[i].name} - ${highscores[i].score}`;

    // let x = "li" + i +1 + ". " +

    console.log(highscores[i]);

    ul.innerHTML = scoreHTML;

    leaderBoardEl.appendChild(ul);
  }
}

function quizStart() {
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;
  var landingScreenEl = document.getElementById("start-screen");
  landingScreenEl.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");
  getQuestion();
}

// Loop through array of questions and answers and create list with buttons

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var promptEl = document.getElementById("question-words");
  promptEl.textContent = currentQuestion.prompt;
  choicesEl.innerHTML = "";
  currentQuestion.options.forEach(function (choice, i) {
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("value", choice);
    choiceBtn.textContent = i + 1 + ". " + choice;
    choiceBtn.onclick = questionClick;
    choicesEl.appendChild(choiceBtn);
  });
}

// Check for right answers and deduct time for wrong answer, go to next question

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 10;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
    feedbackEl.textContent = `Wrong! The correct answer was ${questions[currentQuestionIndex].answer}.`;
    feedbackEl.style.color = "red";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
  }
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 2000);
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

// End quiz by hiding questions, stop timer and show final score

function quizEnd() {
  clearInterval(timerId);
  var endScreenEl = document.getElementById("quiz-end");
  endScreenEl.removeAttribute("class");
  var finalScoreEl = document.getElementById("score-final");
  finalScoreEl.textContent = time;
  questionsEl.setAttribute("class", "hide");
  leaderBoard();
}

// End quiz if timer reaches 0

function clockTick() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

// Save score in local storage along with users' name
var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
function saveHighscore() {
  var initals = nameEl.value.trim();
  if (initals !== "") {
    var newScore = {
      score: time,
      name: initals,
    };
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    //TODO: Display new score on html
    let ul = document.createElement("li");
    //  Creating an unordered list with ul
    console.log(ul);

    //Ask what the orange is (including backticks)
    let scoreHTML = `${highscores.length}. ${initals} - ${time}`;

    // let x = "li" + i +1 + ". " +

    

    ul.innerHTML = scoreHTML;

    leaderBoardEl.appendChild(ul);

  }
}

// Save users' score after pressing enter

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}
nameEl.onkeyup = checkForEnter;

// Save users' score after clicking submit

submitBtn.onclick = saveHighscore;

// Start quiz after clicking start quiz

startBtn.onclick = quizStart;

//remember to camelCase
console.log("camelCase");
