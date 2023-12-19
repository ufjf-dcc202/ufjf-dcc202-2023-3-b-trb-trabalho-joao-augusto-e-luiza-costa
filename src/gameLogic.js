let currentPlayer = 1;
let continueGame = true;

let player = {
  board: [],
  points: 0,
  diceValue: null,
};

let bot = {
  board: [],
  points: 0,
  diceValue: null,
};

//* referencia para o dado e adiciona um evento de click
export function startGame() {
  currentPlayer = 1;
  player.diceValue = null;
  player.board = [];
  bot.board = [];

  //criando o board em forma de array
  for (let i = 0; i < 9; i++) {
    player.board.push(null);
    bot.board.push(null);
  }
  continueGame = true;
}

export function getBoard(boardId) {
  if (boardId == 1) {
    return player.board;
  }
  return bot.board;
}

export function rollDice() {
  if (!continueGame) {
    console.log("jogo acabou");
    return;
  }

  if (player.diceValue == null) {
    player.diceValue = getRandomDiceValue();
    return player.diceValue;
  }
}

//jogado do bot
export function botPaly() {
  if (!continueGame) {
    console.log("jogo acabou");
    return;
  }

  //decidir onde jogar
  const index = Math.floor(Math.random() * 9);

  // se o lugar já estiver ocupado, joga de novo
  if (bot.board[index] != null) {
    return botPaly();
  }

  bot.board[index] = getRandomDiceValue();
  checkAndClearOpponentBoard();
  currentPlayer = 1;
  return index;
}

function checkGanhador() {
  if (player.points > bot.points) {
    return 1;
  } else if (player.points < bot.points) {
    return 2;
  } else {
    return -1;
  }
}

//* conta todos os elementos vazios e verifica se o jogo acabou
/*
return 0: jogo não acabou
return 1: player 1 ganhou
return 2: player 2 ganhou
return -1: empate
*/
export function checkEndGame() {
  let nullSpots1 = 0;
  //passar por cada elemento do board e ver se tá vazio
  for (const element of player.board) {
    if (element == null) {
      nullSpots1++;
    }
  }

  let nullSpots2 = 0;
  for (const element of bot.board) {
    if (element == null) {
      nullSpots2++;
    }
  }

  if (nullSpots1 == 0 || nullSpots2 == 0) {
    continueGame = false;
    return checkGanhador();
  }
  return 0;
}

function getRandomDiceValue() {
  return Math.floor(Math.random() * 6) + 1;
}

//jogada do player
export function selectPlace(index) {
  if (!continueGame) {
    console.log("jogo acabou");
    return;
  }

  if (currentPlayer == 2 || player.diceValue == null) {
    return false;
  }

  player.board[index] = player.diceValue;

  player.diceValue = null;
  checkAndClearOpponentBoard();

  currentPlayer = 2;

  return true;
}

function checkAndClearOpponentBoard() {
  for (let index1 = 0; index1 < player.board.length; index1++) {
    const value1 = player.board[index1];
    const board1I = index1 % 3;

    for (let index2 = 0; index2 < bot.board.length; index2++) {
      const value2 = bot.board[index2];
      const board2I = index2 % 3;

      if (value1 === value2 && value1 !== null) {
        if (board1I === board2I) {
          if (currentPlayer == 1) {
            bot.board[index2] = null;
          } else {
            player.board[index1] = null;
          }
        }
      }
    }
  }
  player.points = getBoardPoints(1);
  bot.points = getBoardPoints(2);
}

//esta reescrevendo o valor dos pontos
export function getBoardPoints(boardId) {
  let board = boardId == 1 ? player.board : bot.board;
  let totalPoints = 0;

  //* verifica cada coluna
  for (let i = 0; i < 3; i++) {
    let coluna = {};

    //adiciona os valores da coluna no objeto
    for (let j = 0; j < 3; j += 1) {
      const value1 = board[i + j * 3];
      if (value1 != null) {
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
  return totalPoints;
}
