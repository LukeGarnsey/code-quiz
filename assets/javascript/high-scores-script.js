const highScoreList = document.getElementById("high-score-list");

document.getElementById("back").onclick = function(){
    window.location.href = "../../index.html";
}
document.getElementById("clear").onclick = function(){
    localStorage.clear();
    while(highScoreList.children.length > 0){
        highScoreList.removeChild(highScoreList.children[0]);
    }
}

function init(){
    var scoresObj = localStorage.getItem("scores");
    if(scoresObj === null)
        return;

    scoresObj = JSON.parse(scoresObj);

    scoresObj.scores.forEach(userScore => {
        var listItem = document.createElement("li");
        listItem.innerText = userScore.name + " - " + userScore.score;
        highScoreList.append(listItem);
    });
}
init();