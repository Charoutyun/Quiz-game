

var quizzes = [
  {
    name: "Random Quiz",
    questions: [
  
    {
      question: " What is Sum of 23+7 ?",
      a: "30",
      b: "22",
      c: "37",
      d: "27",
      correct: "a",
    },
    {
      question: " What city  is the capital of France?",
      a: "Nice",
      b: "Normandy",
      c: "Paris",
      d: "Marseille",
      correct: "c",
    },
    {
      question: " What team does Max Verstappen drive for in F1?",
      a: " RedBull",
      b: " Ferrari",
      c: " Mercedes",
      d: " Visa Cash App RedBull",
      correct: "a",
    },
    {
      question: " What color is the Us dollar ?",
      a: "Green",
      b: " Orange ",
      c: "Red",
      d: "Blue",
      correct: "a",
    },
    {
      question: " Who is Anze Kopitar ?",
      a: "Physician",
      b: "Artist",
      c: "Hockey Player ",
      d: "Cricket  Player",
      correct: "c",
    },
    {
        question: "What is the national sport of Canada ?",
        a: "Hockey",
        b: "Curling",
        c: "Bowling ",
        d: "Lacrosse",
        correct: "d",
      },
      {
        question: "What is the last name of actor who played as an oompa loompa in Wonka Hugh _?",
        a: "Grant",
        b: "Mongus",
        c: "Jackman ",
        d: " Loompa",
        correct: "a",
      },
      {
        question: " what is our Csuf mascot?",
        a: "Elephant",
        b: "Tiger",
        c: "Orange",
        d: "Moose",
        correct: "a",
      },
      {
      question: " Which of these is a Programming Language?",
      a: "HyperText Markup Language",
      b: "Cascading StyleSheet",
      c: "Twitter Bootstrap",
      d: "JavaScript",
      correct: "d",
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        a: "<script src=''>",
        b: "<js>",
        c: "<scripting>",
        d: "<javascript> ",
        correct: "a",
      },
  ],
},
  {
    name: "Car Quiz",
    questions: [
      {
        question: "Which car brand has won most World Rally Championship titles?",
        a: "Ford",
        b: "Renault",
        c: "Lancia",
        d: "Audi",
        correct: "c"
      },
      {
        question: "What is the top speed of the fastest production car ever made?",
        a: "250 mph",
        b: "300 mph",
        c: "400 mph",
        d: "600 mph",
        correct: "b"
      },
      {
        question: "Who is the Number one drive for Mercedes F1 2024? ",
        a: "Lewis Hamilton",
        b: "Stuart Archer",
        c: "Johnny O'Connell",
        d: "Mikko Hirvonen",
        correct: "a"
      },
      
    ],
  },
  {
    name: "Sports Team Quiz",
    questions: [
      {
        question: "Which English football club plays at Wembley Stadium?",
        a: "Arsenal FC",
        b: "Chelsea FC",
        c: "Manchester United",
        d: "Tottenham Hotspur",
        correct: "d"
      },
      {
        question: "Which Spanish football club plays in La Liga?",
        a: "manchester",
        b: "Barcelona",
        c: "chelsea",
        d: "Tottenham Hotspur",
        correct: "b"
      }
    ]
  }
];


  var currentQuestions = []; // This will hold the current quiz's questions
  var currentQuizIndex = 0; // This will keep track of the current question within the selected quiz
  var score = 0;
  var selectedQuizIndex = 0; // Default to the first quiz
  var selectedAnswer = null
  
  document.addEventListener('DOMContentLoaded', () => {
    const quizSelectionElement = document.getElementById('quiz-selection');
    const loadQuizButton = document.getElementById('load-quiz-button');
    const usernameInput = document.getElementById('username');
    //
  
    // Populate the quiz selection dropdown
    quizzes.forEach((quiz, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = quiz.name;
      quizSelectionElement.appendChild(option);
    });
  
    // Click event listener for the Load Quiz button
    loadQuizButton.addEventListener('click', () => {
  
      // Load the selected quiz
      selectedQuizIndex = quizSelectionElement.value;
      currentQuestions = quizzes[selectedQuizIndex].questions;
      currentQuizIndex = 0; // Start from the first question
      score = 0; // Reset score for a new attempt
      loadQuiz(); // Load the quiz based on the current selection
    });
  
    
    document.querySelectorAll('.answer').forEach(button => {
      button.addEventListener('click', function() {
          selectAnswer(this.id);
      });
  });
  
    // User submits their name and selects a quiz
    document.getElementById('user').addEventListener('click', () => {
      var username = document.getElementById('username').value.trim();
      selectedQuizIndex = quizSelectionElement.value;
      currentQuestions = quizzes[selectedQuizIndex].questions;
      currentQuizIndex = 0;
      score = 0;
      alert(`Welcome, ${username}! Starting the quiz.`);
      loadQuiz(); // Load the first question of the selected quiz
    });
    
    
  
    // Handle answer submission
    document.getElementById('submit').addEventListener('click', () => {
      var username = usernameInput.value.trim();
      if (!username) {
        showCustomAlert("Please enter your name before submiting an answer.");
        return; // Exit if no name is entered
      }
      var answer = getSelection();
      if (answer) {
        if (answer === currentQuestions[currentQuizIndex].correct) {
          score++;
        }
        currentQuizIndex++;
        if (currentQuizIndex < currentQuestions.length) {
          loadQuiz(); // Load the next question
        } else {
          displayResult(document.getElementById('username').value.trim());
        }
      } else {
        console.log('Please select an answer.');
      }
    });
    loadQuiz();
  });

  function showCustomAlert(message) {
    document.getElementById('customAlertText').innerText = message;
    document.getElementById('customAlert').style.display = 'block';
  }
  
  function hideCustomAlert() {
    document.getElementById('customAlert').style.display = 'none';
  }
  
  function loadQuiz() {
    if (currentQuizIndex < currentQuestions.length) {
      const question = currentQuestions[currentQuizIndex];
      document.getElementById('question').innerText = question.question;
      document.getElementById('a').innerText = question.a;
      document.getElementById('b').innerText = question.b;
      document.getElementById('c').innerText = question.c;
      document.getElementById('d').innerText = question.d;
      deselectButtons();
      selectedAnswer = null;
    }
  }
  
  function displayResult(username) {
    alert(`${username}, your score is: ${score}/${currentQuestions.length}`);
    currentQuizIndex = 0;
    score = 0;
    // Optionally reset or hide quiz content, or prompt for next steps
    loadQuiz();
  }
  
  function deselectButtons() {
    document.querySelectorAll('.answer').forEach(button => {
      button.classList.remove('btn-primary');
      button.classList.add('btn-secondary');
    });
  }
  
  function selectAnswer(answerId) {
    deselectButtons();
    document.getElementById(answerId).classList.add('btn-primary');
    document.getElementById(answerId).classList.remove('btn-secondary');
    selectedAnswer = answerId.charAt(0);
  }
  
  function getSelection() {
    return selectedAnswer;
  }