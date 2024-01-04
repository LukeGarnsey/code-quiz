const startCodingElement = document.getElementById("start-coding");
const quizQuestionElement = document.getElementById("quiz-question");
const finishedElement = document.getElementById("finished");
const wrongElement = document.getElementById("wrong");
const correctElement = document.getElementById("correct");
const highScoresElement = document.getElementById("high-scores");
const timer = document.getElementById("time").getElementsByTagName("span")[0];

const question = document.getElementById("quiz-question").getElementsByTagName("h1")[0];
const answerOne = document.getElementById("quiz-button-1");
const answerTwo = document.getElementById("quiz-button-2");
const answerThree = document.getElementById("quiz-button-3");
const answerFour = document.getElementById("quiz-button-4");

const popupDiv = document.getElementById("popup");


// startCodingElement.style.display = "none";
// quizQuestionElement.style.display = "none";
// finishedElement.style.display = "none";
// wrongElement.style.display = "none";
// correctElement.style.display = "none";


var popupInterval = undefined;
var quizTimerInterval;
var finalScore = 0;

function startTimer(startTime){
    finalScore = startTime;
    quizTimerInterval = setInterval(countdown, 1000);
}
function countdown(){
    if(finalScore == 0){
        quizFinished();
        return;
    }
    finalScore--;
    timer.innerHTML = finalScore;
}
document.getElementById("view-high-score").onclick = loadHighScores
startCodingElement.getElementsByTagName("button")[0].onclick = function(){
    startTimer(60);
    startCodingElement.style.display = "none";
    quizQuestionElement.style.display = "block";
    askQuestion(0);
}
function askQuestion(index){

    question.textContent = questions[index].question;
    answerOne.textContent = questions[index].answerOne;
    answerTwo.textContent = questions[index].answerTwo;
    answerThree.textContent = questions[index].answerThree;
    answerFour.textContent = questions[index].answerFour;
    answerOne.onclick = () => {
        answerClick(1, index)
    };
    answerTwo.onclick = () => {
        answerClick(2, index)
    };
    answerThree.onclick = () => {
        answerClick(3, index)
    };
    answerFour.onclick = () => {
        answerClick(4, index)
    };
}
function answerClick(index, questionIndex){
    console.log(index);
    if(index.toString() == questions[questionIndex].answer){
        popupOn(correctElement);
    }else
    {
        popupOn(wrongElement);
        finalScore -= 10;
        if(finalScore < 0){
            finalScore = 0;
            timer.innerHTML = finalScore;
            quizFinished();
            return;
        }
        timer.innerHTML = finalScore;
    }
    questionIndex++;
    if(questionIndex >= questions.length){
        quizFinished();
        return;
    }
    askQuestion(questionIndex);
}
function popupOn(element){
    if(popupInterval !== undefined){
        clearInterval(popupInterval);
        correctElement.style.display = 'none';
        wrongElement.style.display = 'none';
        popupDiv.style.display = 'none';
    }
    element.style.display = 'block';
    popupDiv.style.display = 'block';
    
    popupInterval = setInterval(() => {
        popupDiv.style.display = 'none';
        element.style.display = 'none';
        clearInterval(popupInterval);
        popupInterval = undefined;
    }, 1000);
}

function quizFinished(){
    document.getElementById("score").innerText = finalScore;
    clearInterval(quizTimerInterval);
    finishedElement.style.display = "block";
    quizQuestionElement.style.display = "none";
}
function submitHighScore(){
    const name = document.getElementById("fname").value;
    var scoresObj = localStorage.getItem("scores");
    if(scoresObj === null){
        scoresObj = {};
        scoresObj.scores = [];
    }else
        scoresObj = JSON.parse(scoresObj);

    scoresObj.scores.push({"name":name, "score":finalScore})
    localStorage.setItem("scores", JSON.stringify(scoresObj));
    loadHighScores();
}
function loadHighScores(){
    window.location.href="./assets/html/high-scores.html";
}

const questions =[
{
    "question": "Commonly used data types DO Not include: ",
    "answerOne": "strings",
    "answerTwo": "booleans",
    "answerThree": "alerts",
    "answerFour": "numbers",
    "answer": "3"
},
{
    "question": "The condition in an if / else statement is enclosed with ________.",
    "answerOne": "quotes",
    "answerTwo": "curly brackets",
    "answerThree": "parenthesis",
    "answerFour": "square brackets",
    "answer": "3"
},
{
    "question": "Arrays in JavaScript can be used to store ________.",
    "answerOne": "numbers and strings",
    "answerTwo": "other arrays",
    "answerThree": "booleans",
    "answerFour": "all of the above",
    "answer": "4"
},
{
    "question": "String values must be enclosed within ______ when being assigned to variables.",
    "answerOne": "commas",
    "answerTwo": "curly brackets",
    "answerThree": "quotes",
    "answerFour": "parenthesis",
    "answer": "2"
},
{
    "question": "A very useful tool used during development and debugging for printing content to the debugger is:",
    "answerOne": "JavaScript",
    "answerTwo": "terminal/bash",
    "answerThree": "for loops",
    "answerFour": "console.log",
    "answer": "4"
},
];