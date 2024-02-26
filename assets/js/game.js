var currentQuestionIndex = 0;
var time = question.length * 15;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById('questionair');
var timerEl = document.getElementById('timer');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('Submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');



function startQuiz() {
  // hide start screen
  var startScreenEl = document.getElementById('start-screen');
  startScreenEl.setAttribute('class', 'hide');

  // un-hide questions section
  questionsEl.removeAttribute('class');

  // start timer
  timerId = setInterval(clockTick, 1000);

  // show starting time
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // loads the div with current question
  var titleEl = document.getElementById('question');
  titleEl.textContent = currentQuestion.title;

  // clear out any old question choices
  choicesEl.innerHTML = '';

  // loop over choices
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    // create new button for each choice
    var choice = currentQuestion.choices[i];
    var choiceNode = document.createElement('button');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);

    choiceNode.textContent = i + 1 + '. ' + choice;

    // display on the page
    choicesEl.appendChild(choiceNode);
  }
}

function questionClick(event) {
  var buttonEl = event.target;//event is set to the button choices
  if (!buttonEl.matches('.choice')) {
    return;
  }

  if (buttonEl.value !== questions[currentQuestionIndex].answer) {//if guess is wrong than -15 sec from their time
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
    feedbackEl.textContent = 'Wrong!';
  } else {
    feedbackEl.textContent = 'Correct!';
  }

  //lets player know if they get wrong or not 
  feedbackEl.setAttribute('class', 'feedback');
  setTimeout(function () {
    feedbackEl.setAttribute('class', 'feedback hide');
  }, 1000);

  currentQuestionIndex++;

  if (time <= 0 || currentQuestionIndex === questions.length) {//if timer ends quiz ends
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {//when time ends than quiz ends showing their score
  clearInterval(timerId);

  var endScreenEl = document.getElementById('end-screen');
  endScreenEl.removeAttribute('class');

  var finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = time;

  questionsEl.setAttribute('class', 'hide');
}

function clockTick() {//timer for quiz
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {//saves the persons score timer when all questions answers
  var initials = initialsEl.value.trim();

  if (initials !== '') {//when finishing  get score storage
    var highscores =
      JSON.parse(window.localStorage.getItem('highscores')) || [];

    
    var newScore = {//set new score to score storage
      score: time,
      initials: initials,
    };
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));

    window.location.href = 'highscores.html';//go to score page when entered
  }
}

function checkForEnter(event) {//when pressing enter it will save score
  if (event.key === 'Enter') {
    saveHighscore();
  }
}

//onclick events that trigger functions
submitBtn.onclick = saveHighscore;
startBtn.onclick = startQuiz;
choicesEl.onclick = questionClick;
initialsEl.onkeyup = checkForEnter;

