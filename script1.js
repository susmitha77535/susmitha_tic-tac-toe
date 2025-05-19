const magicSquare = [
    [8, 1, 6],
    [3, 5, 7],
    [4, 9, 2]
  ];
  
  const boardElement = document.getElementById('board');
  const statusElement = document.getElementById('status');
  const resetBtn = document.getElementById('resetBtn');
  
  let board = Array(9).fill(' ');
  let gameOver = false;
  
  function renderBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('cell');
      cellDiv.textContent = cell;
      if (!gameOver && cell === ' ') {
        cellDiv.addEventListener('click', () => playerMove(index));
        cellDiv.style.cursor = 'pointer';
      } else {
        cellDiv.style.cursor = 'default';
      }
      boardElement.appendChild(cellDiv);
    });
  }
  
  function checkWinner(player) {
    const winConditions = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    return winConditions.some(cond => cond.every(i => board[i] === player));
  }
  
  function boardFull() {
    return board.every(cell => cell !== ' ');
  }
  
  function computerMove() {
    const availableMoves = board
      .map((cell, i) => cell === ' ' ? i : null)
      .filter(i => i !== null);
  
    const winConditions = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
  
    // Try to win
    for (const cond of winConditions) {
      const vals = cond.map(i => board[i]);
      if (vals.filter(x => x === 'O').length === 2 && vals.includes(' ')) {
        return cond[vals.indexOf(' ')];
      }
    }
  
    // Block player win
    for (const cond of winConditions) {
      const vals = cond.map(i => board[i]);
      if (vals.filter(x => x === 'X').length === 2 && vals.includes(' ')) {
        return cond[vals.indexOf(' ')];
      }
    }
  
    // Else random move
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }
  
  function playerMove(index) {
    if (gameOver || board[index] !== ' ') return;
  
    board[index] = 'X';
    renderBoard();
  
    if (checkWinner('X')) {
      gameOver = true;
      statusElement.textContent = "You win! 🎉";
      alert("You win! 🎉");
      return;
    }
  
    if (boardFull()) {
      gameOver = true;
      statusElement.textContent = "It's a draw!";
      alert("It's a draw!");
      return;
    }
  
    statusElement.textContent = "Computer's turn...";
  
    setTimeout(() => {
      const compMove = computerMove();
      board[compMove] = 'O';
      renderBoard();
  
      if (checkWinner('O')) {
        gameOver = true;
        statusElement.textContent = "Computer wins! 😞";
        alert("Computer wins! 😞");
        return;
      }
  
      if (boardFull()) {
        gameOver = true;
        statusElement.textContent = "It's a draw!";
        alert("It's a draw!");
        return;
      }
  
      statusElement.textContent = "Player X's turn";
    }, 500);
  }
  
  resetBtn.addEventListener('click', () => {
    board = Array(9).fill(' ');
    gameOver = false;
    statusElement.textContent = "Player X's turn";
    renderBoard();
  });
  
  // Initialize
  renderBoard();
  statusElement.textContent = "Player X's turn";
  