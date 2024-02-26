function printScore () {
    var highScores = JSON.parse(window.localStorage.getItem('highscores')) || [];//get previous score to display

    highScores.sort(function (a,b){
        return b.score - a.score;//sort value (initial  score)
    });

    for(var i = 0; i < highScores.length; i += 1){//creates a list of precvious scores to display
        var liTag = document.createElement('li');
        liTag.textContent = highScores[i].initials + ' - ' + highScores[i].score;


        var olEl= document.getElementById('highscores');
        olEl.appendChild(liTag);
    }
}

function clearScore(){//clears score when pressing the clear button
    window.localStorage.removeItem('highscores');
    window.location.reload();
}
document.getElementById('clear').onclick = clearScore;

printScore();