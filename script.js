
let board1;
let board2;
let currentPlayer = 1;
let dice1;

document.addEventListener("DOMContentLoaded", function () {
    iniciarBoard();
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

  function selectPlace() {
   
  }

 
  
