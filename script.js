let currentPlayer = 1;
let board1;
let board2;
let board1Points;
let board2Points;
let dice1;

//* função que é executada quando o documento é carregado
document.addEventListener("DOMContentLoaded", function () {
  startGame();
});

//* referencia para o dado e adiciona um evento de click
function startGame() {
  currentPlayer = 1;
  dice1 = document.getElementById("dice1");
  console.log(dice1);
  dice1.addEventListener("click", rollDice);

  board1Points = document.getElementById("board1-points");
  board2Points = document.getElementById("board2-points");

  iniciarBoard();
  iniciarPoints();
}

function iniciarPoints() {
  board1Points.innerHTML = 0;
  board2Points.innerHTML = 0;
}

//* função que cria o tabuleiro
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

  //* verifica se o jogo acabou
  checkAndClearOpponentBoard();
  if (!checkEndGame()) {
    switchPlayer();
  } else {
    endGame();
  }
}

function checkGanhador() {
  const pontos1 = Number(board1Points.textContent);
  const pontos2 = Number(board2Points.textContent);

  if (pontos1 > pontos2) {
    alert("Player 1 ganhou");
  } else if (pontos2 > pontos1) {
    alert("Player 2 ganhou");
  } else {
    alert("Empate");
  }
}

//* conta todos os elementos vazios e verifica se o jogo acabou
function checkEndGame() {
  countPoints();

  let nullSpots1 = 0;
  for (const child of board1.children) {
    const value1 = child.textContent;
    if (value1 == "") {
      nullSpots1++;
    }
  }
  let nullSpots2 = 0;
  for (const child of board2.children) {
    const value2 = child.textContent;
    if (value2 == "") {
      nullSpots2++;
    }
  }
  if (nullSpots1 == 0 || nullSpots2 == 0) {
    checkGanhador();
    return true;
  }
  return false;
}

function getRandomDiceValue() {
  return Math.floor(Math.random() * 6) + 1;
}

//* função chamada quando o player clica em um elemento do tabuleiro
function selectPlace(e) {
  const diceValue = dice1.textContent;

  //* verifica se o player é o 2 ou se o dado não foi jogado
  if (currentPlayer == 2 || diceValue == "") {
    return;
  }

  //* passa o valor do dado para o componente clicado
  const element = e.target;
  element.textContent = diceValue;
  dice1.textContent = "";

  //* verifica se o jogo acabou
  checkAndClearOpponentBoard();
  if (!checkEndGame()) {
    switchPlayer();
  } else {
    endGame();
  }
}
function rollDice() {
  const diceValue = getRandomDiceValue();

  //* verifica se o dado já foi jogado
  if (dice1.textContent == "") {
    dice1.textContent = diceValue;
  }
}

function checkAndClearOpponentBoard() {
  //* a lista de elementos do tabuleiro é uma lista de uma dimensão. Porem queremos interpretar como uma lista de duas dimensões
  //* para isso, convertemos o index para um indexI e um idexJ
  //* dessa forma, a matriz a seguir que representa a posição em relação ao index
  /**
   * 0 1 2
   * 3 4 5
   * 6 7 8
   */
  //* passa a ser interpretada da seguinte forma:
  /**
   * (0,0) (0,1) (0,2)
   * (1,0) (1,1) (1,2)
   * (2,0) (2,1) (2,2)
   */
  //* comparamos os valores do tabuleiro e se forem iguais, verificamos se estão na mesma linha ou coluna (mesmo indexI ou indexJ) e removemos o valor do tabuleiro do oponente

  for (const child1 of board1.children) {
    const index1 = child1.dataset.index;
    const value1 = child1.textContent;
    const board1I = index1 % 3;

    for (const child2 of board2.children) {
      const index2 = child2.dataset.index;
      const value2 = child2.textContent;
      const board2I = index2 % 3;

      if (value1 === value2 && value1 !== null) {
        //! ====================================================================================================
        if (board1I === board2I) {
          //* mudei aqui, verifica se esta na mesma coluna
          //! ====================================================================================================

          const cell1 = board1.querySelector(`[data-index='${index1}']`);
          const cell2 = board2.querySelector(`[data-index='${index2}']`);
          if (currentPlayer == 1) {
            cell2.innerHTML = "";
          } else {
            cell1.innerHTML = "";
          }
        }
      }
    }
  }
}

//! ====================================================================================================
function countPointsAux(board, counter) {
  let totalPoints = 0;
  //* verifica cada coluna
  for (let i = 0; i < 3; i++) {
    let coluna = {};

    for (let j = 0; j < 3; j += 1) {
      const cell1 = board.querySelector(`[data-index='${i + j * 3}']`);
      const value1 = cell1.textContent;
      if (value1 != "") {
        if (coluna[value1] == null) {
          coluna[value1] = 1;
        } else {
          coluna[value1]++;
        }
      }
    }

    //* calcula o total de pontos da coluna
    for (const key in coluna) {
      if (coluna.hasOwnProperty(key)) {
        const element = coluna[key];
        totalPoints += element * element * key;
      }
    }
  }
  counter.innerHTML = totalPoints;
}

function countPoints() {
  countPointsAux(board1, board1Points);
  countPointsAux(board2, board2Points);
}
//! ====================================================================================================

//* trova o player e faz a jogada do bot
function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  if (currentPlayer == 2) {
    botPaly();
  }
}

//* reinicia o jogo
function endGame() {
  currentPlayer = 1;
  startGame();
}
