var userScore = localStorage.getItem("score");
var userInitital = localStorage.getItem("initial");
var userList = document.querySelector("#userList")
var leaderBoard = localStorage.getItem("leaderBoard");

if (leaderBoard) {
    leaderBoard = JSON.parse(leaderBoard);
} else {
    leaderBoard = [];
}

if (userScore && userInitital) {
    var user = {
        initial: userInitital,
        score: userScore,
    }
    leaderBoard.push(user);
    localStorage.setItem("leaderBoard", JSON.stringify(leaderBoard));
}

for (var i = 0; i < leaderBoard.length; i++) {
    var newLiList = document.createElement("li");
    newLiList.innerHTML = leaderBoard[i].initial + leaderBoard[i].score + "/9";
    userList.appendChild(newLiList);
}
var clearbutton = document.querySelector("#clearbutton");
clearbutton.addEventListener("click", function clear() {
    userList.remove()
    window.localStorage.clear()

})
