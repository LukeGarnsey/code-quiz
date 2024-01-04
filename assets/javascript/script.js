const startCodingElement = document.getElementById("start-coding");
const quizQuestionElement = document.getElementById("quiz-question");
const finishedElement = document.getElementById("finished");
const wrongElement = document.getElementById("wrong");
const correctElement = document.getElementById("correct");
const highScoresElement = document.getElementById("high-scores");
const timer = document.getElementById("time").getElementsByTagName("span")[0];

// startCodingElement.style.display = "none";
quizQuestionElement.style.display = "none";
finishedElement.style.display = "none";
wrongElement.style.display = "none";
correctElement.style.display = "none";

var quizTimerInterval;
var currentQuestion = 1;
var finalScore = 0;

function startTimer(startTime){
    timer.innerHTML = startTime;
    quizTimerInterval = setInterval(countdown, 1000);
}
function countdown(){
    finalScore = parseInt(timer.innerHTML);
    if(finalScore == 0){
        document.getElementById("score").innerText = finalScore;
        clearInterval(quizTimerInterval);
        finishedElement.style.display = "block";
        quizQuestionElement.style.display = "none";
        return;
    }
    finalScore--;
    timer.innerHTML = finalScore;
    
}
document.getElementById("view-high-score").onclick = loadHighScores
startCodingElement.getElementsByTagName("button")[0].onclick = function(){
    startTimer(1);
    startCodingElement.style.display = "none";
    quizQuestionElement.style.display = "block";
}

function submitHighScore(){
    // preventDefault();
    const name = document.getElementById("fname").value;
    var scoresObj = localStorage.getItem("scores");
    console.log(scoresObj);
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