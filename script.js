let board1;
let board2;
let currentPlayer = 1;
let dice1;

//quando o html estiver pronto, inicia o jogo
document.addEventListener("DOMContentLoaded", function () {
  startGame();
});

//cria tabuleiro, adiciona os elementos e os eventos
function iniciarBoard() {
  board1 = document.getElementById("board1");
  board2 = document.getElementById("board2");

  board1.innerHTML = null;
  board2.innerHTML = null;

  for (let i = 0; i < 9; i++) {
    //criar uma grade 3x3 e cria botões nessa grade ao clicar
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

//seleciona um lugar do tabuleiro para atribuir o valor do dado
function selectPlace(e) {
  const diceValue = dice1.textContent;

  //* verifica se o player é o 2 ou se o dado não foi jogado
  if (currentPlayer == 2 || diceValue == "") {
    return;
  }

  //passa o valor do dado para o elemento
  const element = e.target; //pega o elemento clicado
  element.textContent = diceValue; //adiciona o valor do dado no elemento
  dice1.textContent = ""; //limpa o dado

  //alterna entre os jogadores
  checkAndClearOpponentBoard();
  if (!checkEndGame()) {
    switchPlayer();
  } else {
    endGame();
  }
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

  checkAndClearOpponentBoard();
  if (!checkEndGame()) {
    switchPlayer();
  } else {
    endGame();
  }
}

//* função que alterna entre os jogadores
function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  if (currentPlayer == 2) {
    botPaly();
  }
}

//verifica tabuleiro do oponente e limpa os valores iguais
function checkAndClearOpponentBoard() {
  for (const child1 of board1.children) {
    //percorre o tabuleiro do player
    const index1 = child1.dataset.index; //pega o index do elemento
    const value1 = child1.textContent; //pega o valor do elemento
    const board1I = index1 % 3; //pega a posição do elemento na grade
    const board1J = Math.floor(index1 / 3);

    for (const child2 of board2.children) {
      //faz a mesma coisa para o tabuleiro do oponente
      const index2 = child2.dataset.index;
      const value2 = child2.textContent;
      const board2I = index2 % 3;
      const board2J = Math.floor(index2 / 3);

      if (value1 === value2 && value1 !== null) {
        //se o valor do dois forem iguais, limpa o tabuleiro do oponente
        if (board1I === board2I || board1J === board2J) {
          const cell1 = board1.querySelector(`[data-index='${index1}']`); //pega os elementos do board com index igual
          const cell2 = board2.querySelector(`[data-index='${index2}']`);
          if (currentPlayer == 1) {
            //verifica onde vai limpar
            cell2.innerHTML = "";
          } else {
            cell1.innerHTML = "";
          }
        }
      }
    }
  }
}

//checar a quantidade de espaços vazios no tabuleiro e atribuir se ganhou ou perdeu
function checkEndGame() {
  let nullSpots1 = 0;
  for (const child of board1.children) {
    //percorre todo o tabuleiro do player
    const value1 = child.textContent;
    if (value1 == "") {
      nullSpots1++;
    }
  }
  let nullSpots2 = 0;
  for (const child of board2.children) {
    //percorre o tabuleiro do bot
    const value2 = child.textContent;
    if (value2 == "") {
      nullSpots2++;
    }
  }
  if (nullSpots1 == 0 || nullSpots2 == 0) {
    alert(`${currentPlayer == 1 ? "Você ganhou!" : "Você perdeu!"}`);
    return true;
  }
  return false;
}

function endGame() {
  currentPlayer = 1;
  startGame();
}
