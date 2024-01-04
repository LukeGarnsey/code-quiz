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

function startTimer(startTime){
    timer.innerHTML = startTime;
    quizTimerInterval = setInterval(countdown, 1000);
}
function countdown(){
    let time = parseInt(timer.innerHTML);
    if(time == 0){
        clearInterval(quizTimerInterval);
        finishedElement.style.display = "block";
        quizQuestionElement.style.display = "none";
        return;
    }
    time--;
    timer.innerHTML = time;
    
}
document.getElementById("view-high-score").onclick = loadHighScores
startCodingElement.getElementsByTagName("button")[0].onclick = function(){
    startTimer(5);
    startCodingElement.style.display = "none";
    quizQuestionElement.style.display = "block";
}

function submitHighScore(){

    loadHighScores();
}
function loadHighScores(){
    window.location.href="./assets/html/high-scores.html";
}