let board1;
let board2;
let currentPlayer = 1;
let dice1;

document.addEventListener("DOMContentLoaded", function () {
  startGame();
});

function iniciarBoard() {
  board1 = document.getElementById("board1");
  board2 = document.getElementById("board2");

  board1.innerHTML = null;
  board2.innerHTML = null;

  for (let i = 0; i < 9; i++) {
    const cell1 = document.createElement("button");
    cell1.addEventListener("click", selectPlace);
    const cell2 = document.createElement("div");
    cell1.dataset.index = i;
    cell2.dataset.index = i;
    board1.appendChild(cell1);
    board2.appendChild(cell2);
  }
}

//iniciando jogo
function startGame() {
  currentPlayer = 1; //identificando o atual jogador
  dice1 = document.getElementById("dice1");
  console.log(dice1);
  dice1.addEventListener("click", rollDice); //rolando o dado

  iniciarBoard();
}

//validando o dado
function getRandomDiceValue() {
  return Math.floor(Math.random() * 6) + 1;
}

function rollDice() {
  const diceValue = getRandomDiceValue();

  /* verifica se o dado já foi jogado*/
  if (dice1.textContent == "") {
    dice1.textContent = diceValue;
  }
}

function selectPlace(e) {
  const diceValue = dice1.textContent;

  //* verifica se o player é o 2 ou se o dado não foi jogado
  if (currentPlayer == 2 || diceValue == "") {
    return;
  }

  //passa o valor do dado para o elemento
  const element = e.target;
  element.textContent = diceValue;
  dice1.textContent = "";

  //alterna entre os jogadores
}

//* função que faz a jogada do bot
function botPaly() {
  const blocks = board2.children;

  //* remove a classe last-play de todos os elementos
  for (const child of blocks) {
    child.classList.remove("last-play");
  }

  //* seleciona um elemento aleatório e adiciona a classe last-play
  const element = board2.querySelector(
    `[data-index='${Math.floor(Math.random() * 9)}']`
  );

  //* adiciona o valor do dado no elemento e a classe last-play
  element.innerHTML = getRandomDiceValue();
  element.classList.add("last-play");
}

//* função que alterna entre os jogadores
function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  if (currentPlayer == 2) {
    botPaly();
  }
}
