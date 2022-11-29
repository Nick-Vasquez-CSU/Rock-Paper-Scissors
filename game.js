const userText = document.querySelector("#userText"); //Score
const cpuText = document.querySelector("#cpuText"); //Score
const playButtons = document.querySelectorAll(".chooser");

const dDoc = document.querySelector("main")
const endBody = document.querySelector("body")


let userPLAY;
let cpuPLAY;
let resultText;
let gamesPlayed = 1;
let userScore = 0;
let cpuScore = 0;

const roundNumber = document.querySelector("#roundNumber")
if (gamesPlayed == "1"){
  roundNumber.textContent = 1
  userText.textContent = 0;
  cpuText.textContent = 0;

} else {
  roundNumber.textContent = gamesPlayed
}




playButtons.forEach(button => button.addEventListener("click", () => {

  userPLAY = button.id;
  cpuTurn();
  generateResults();

}));

function cpuTurn(){
  const randNum = Math.floor(Math.random() * 3) + 1;

  switch(randNum){
    case 1:
      cpuPLAY = "Rock"
      break;
    case 2:
      cpuPLAY = "Paper"
      break;
    case 3:
      cpuPLAY = "Scissors"
      break;
  }
}

function generateResults(){
  const gameState = document.createElement("article")

  const totalText = document.createElement("h5")
  totalText.textContent = gamesPlayed;
  gameState.appendChild(totalText);
  gamesPlayed += 1;

  
  roundNumber.textContent = gamesPlayed

  const userR = document.createElement("h5")
  userR.textContent = `User Played: ${userPLAY}`;
  gameState.appendChild(userR);

  const cpuR = document.createElement("h5")
  cpuR.textContent = `CPU Played: ${cpuPLAY}`;
  gameState.appendChild(cpuR);
  dDoc.appendChild(gameState);

  const userPlayed = document.querySelector("#userPick")
  const cpuPlayed = document.querySelector("#cpuPick")
  userPlayed.textContent = `You Played: ${userPLAY}`;
  cpuPlayed.textContent = `CPU Played: ${cpuPLAY}`;

  const results = document.querySelector("#results")
  if (userPLAY === "Rock" && cpuPLAY == "Scissors" || userPLAY === "Scissors" && cpuPLAY == "Paper" || userPLAY === "Paper" && cpuPLAY == "Rock"){
    resultText = "You win!";
    userScore++;

  } else if (userPLAY === "Rock" && cpuPLAY == "Paper" || userPLAY === "Scissors" && cpuPLAY == "Rock" || userPLAY === "Paper" && cpuPLAY == "Scissors"){
    resultText = "You Lose!";
    cpuScore++;
    
  } else if (userPLAY === cpuPLAY){ 
    resultText = "You Tied!"; 
  }
  
  results.textContent = resultText;
  userText.textContent = userScore;
  cpuText.textContent = cpuScore;
  

  

}
