import {
    getBoard,
    startGame,
    rollDice,
    selectPlace,
    botPaly,
    getBoardPoints,
    checkEndGame,
  } from "./src/gameLogic.js";
  
  let currentPlayer = 1;
  let board1Element;
  let board2Element;
  let board1PointsElement;
  let board2PointsElement;
  let dice1Element;
  let diceValue;
  
  function iniciarBoard() {
    board1Element = document.querySelector("#board1");    
    board2Element = document.querySelector("#board2");    
  
    board1Element.innerHTML = null;
    board2Element.innerHTML = null;
  
    for (let i = 0; i < 9; i++) {
      const cell1 = document.createElement("button");
      cell1.addEventListener("click", selectPlaceButton);
      const cell2 = document.createElement("div");
      cell1.dataset.index = i;
      cell2.dataset.index = i;
      board1Element.appendChild(cell1);
      board2Element.appendChild(cell2);
    }
  }
  
  function fillBoard(board) {
    let boardValues = getBoard(board);
    let boardElement = board == 1 ? board1Element : board2Element;
    for (let i = 0; i < 9; i++) {
      const cell = boardElement.children[i];
      cell.innerHTML = boardValues[i];
    }
  }
  function updateBoards() {
    fillBoard(1);
    fillBoard(2);
  }
  
  function rollDiceButton() {
    if (currentPlayer != 1) {
      return;
    }
    diceValue = rollDice();
    if (diceValue != null) {
      dice1Element.innerHTML = diceValue;
    }
  }
  
  function updateCounters() {
    board1PointsElement.innerHTML = getBoardPoints(1);
    board2PointsElement.innerHTML = getBoardPoints(2);
  }
  
  function selectPlaceButton() {
    const index = this.dataset.index;
  
    if (selectPlace(index)) {
      dice1Element.innerHTML = "";
  
      const blocks = document.querySelectorAll(".last-play");
      for (const child of blocks) {
        child.classList.remove("last-play");
      }
      if (testEndGame()) return;
      
      let position = botPaly();
      
      const element = board2.querySelector(`[data-index='${position}']`);
      element.classList.add("last-play");
      
      updateCounters();
      updateBoards();
      
      if (testEndGame()) return;
    }
  }
  
  function testEndGame() {
    const endGameResult = checkEndGame();
    if (endGameResult == 0) {
      return false;
    }
    if (endGameResult == 1) {
      alert("Você ganhou!");
    } else if (endGameResult == 2) {
      alert("Você perdeu!");
    } else if (endGameResult == -1) {
      alert("Empatou!");
    }
    resetGame();
    return true;
  }
  
  function resetGame() {
    currentPlayer = 1;
    startGame();
    updateBoards();
    updateCounters();
  }
  
  function main() {
    iniciarBoard();
    startGame();
    updateBoards();
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    currentPlayer = 1;
    dice1Element = document.querySelector("#dice1");
    dice1Element.addEventListener("click", rollDiceButton);
  
    board1PointsElement = document.querySelector("#board1-points");  
    board2PointsElement = document.querySelector("#board2-points"); 
    board1Element = document.querySelector("#board1");         
    board2Element = document.querySelector("#board2");    
  
    main();
  });