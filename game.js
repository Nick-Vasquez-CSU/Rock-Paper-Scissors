const userText = document.querySelector("#userText"); //Score
const cpuText = document.querySelector("#cpuText"); //Score
const playButtons = document.querySelectorAll(".chooser");

const dDoc = document.querySelector("main")

let userPLAY;
let cpuPLAY;
let resultText;
let gamesPlayed = 1;

playButtons.forEach(button => button.addEventListener("click", () => {

  userPLAY = button.textContent;
  cpuTurn();
  generateResults();

}));

function cpuTurn(){
  const randNum = Math.floor(Math.random() * 3) + 1;

  switch(randNum){
    case 1:
      cpuPLAY = "ROCK"
      break;
    case 2:
      cpuPLAY = "PAPER"
      break;
    case 3:
      cpuPLAY = "SCISSORS"
      break;
  }
}

function generateResults(){
  const gameState = document.createElement("article")

  const totalText = document.createElement("h5")
  totalText.textContent = gamesPlayed;
  gameState.appendChild(totalText);
  gamesPlayed += 1;

  const userR = document.createElement("h5")
  userR.textContent = `User Played: ${userPLAY}`;
  gameState.appendChild(userR);

  const cpuR = document.createElement("h5")
  cpuR.textContent = `CPU Played: ${cpuPLAY}`;
  gameState.appendChild(cpuR);
  dDoc.appendChild(gameState);
}
