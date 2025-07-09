let gameSeq=[];
let userSeq=[];

let btns = ["yellow", "red", "blue", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("#game-instruction");
let levelText = document.getElementById("level-text");
let startBtn = document.getElementById("start-btn");
const scoreboardDiv = document.getElementById('scoreboard');

startBtn.addEventListener("click", function() {
    if (!started) {
        started = true;
        startBtn.disabled = true;
        levelText.textContent = "Game is starting...";
        scoreboardDiv.classList.add('hidden');
        // Reset game state before starting a new game
        gameSeq = [];
        userSeq = [];
        level = 0;
        totalScore = 0;
        updateScoreboard();
        setTimeout(() => {
            levelUp();
        }, 2000);
    }
});

document.addEventListener("keypress", function() {
    if(started == false) {
        console.log("Game started");
        started = true;


        levelUp();
    }
});

function gameFlash(btn) {
     btn.classList.add("flash");
     setTimeout(function () {
        btn.classList.remove("flash");   
     },350);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
       btn.classList.remove("userFlash");   
    },250);
}




function levelUp() {
    userSeq = [];
  level++;
  levelText.textContent = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
//   console,log(randIdx);
//   console.log(randColor);
//   console.log(randBtn);
  gameFlash(randBtn);
}

let totalScore = 0;
let bestScore = localStorage.getItem('bestScore') ? parseInt(localStorage.getItem('bestScore')) : 0;
const totalScoreSpan = document.getElementById('total-score');
const bestScoreSpan = document.getElementById('best-score');

function updateScoreboard() {
  totalScoreSpan.textContent = `Total Score: ${totalScore}`;
  bestScoreSpan.textContent = `Best Score: ${bestScore}`;
}

updateScoreboard();

function checkAns(idx) {

   if (userSeq[idx] === gameSeq[idx]) {
    if(userSeq.length == gameSeq.length) {
        setTimeout(levelUp, 750);
    }
   }else {
    levelText.innerHTML = `Game over!! Your score was <b>${level} </b> <br>  Press button to start the game.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function() {
      document.querySelector("body").style.backgroundColor= "white";
      startBtn.disabled = false;
    }, 1000);
    // Update scores
    totalScore += level;
    if (level > bestScore) {
      bestScore = level;
      localStorage.setItem('bestScore', bestScore);
    }
    updateScoreboard();
    scoreboardDiv.classList.remove('hidden');
    reset();
   }
}


function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}


let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}


function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    levelText.textContent = "";
}

