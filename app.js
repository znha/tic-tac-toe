var board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];
var currentPlayer = 'X';
var tds = document.getElementsByTagName('td');
var resetBtn = document.getElementById('reset');
var msg = document.getElementById('msg');
resetBtn.addEventListener('click', function (e) {
  e.preventDefault();
  reset(board, tds);
});
var boardDisabled = false;
for (var i = 0; i < tds.length; i++) {
  tds[i].addEventListener('click', function () {
    if (!boardDisabled) {
      if (this.innerHTML === '') {
        msg.innerHTML = '';
        var vertecies = this.id.split('_');
        var x = vertecies[0];
        var y = vertecies[1];
        this.innerHTML = currentPlayer;
        board[x][y] = currentPlayer;
        console.log(board);
        // check if its a win or a tie and show the reuslt in msg
        var boardStatus = false;
        boardStatus = checkRows(board) || checkColumns(board) || checkDiagonals(board);
        if (boardStatus) {
          console.log('we have a winner');
          msg.style.color = 'green';
          msg.innerHTML = 'Congrats !!!! Player ' + currentPlayer + " Wins Wooohooo";
          boardDisabled = true;
        } else {
          // check if the board has a tie or the player can continue to play
          var boardHasTie = true;
          // I need to study the tie patterns to check them but now I will assume that its when the board if full
          for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[i].length; j++) {
              if (board[i][j] === 0) {
                boardHasTie = boardHasTie && board[i][j];
              }
            }
          }
          if (boardHasTie) {
            msg.style.color = 'red';
            msg.innerHTML = 'You reached a Tie! Reset the game to contiue';
          }
          checkPlayer(currentPlayer);

        }

      } else {
        msg.style.color = 'red';
        msg.innerHTML = 'NOT YOUR TURN';

      }
    }
  });
}
// checkRow function  : check if the rows has a win

function checkRows(board) {
  console.log('checking rows');
  console.log(board);
  for (var i = 0; i < board.length; i++) {
    console.log(board[i]);

    console.log(board[i][0] === board[i][1] && board[i][0] === board[i][2]);
    if (board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] !== 0) {
      console.log(board[i]);
      return true;
    }
  }
  return false;
}
// checkColumn function  : check if the columns has a win
function checkColumns(board) {
  for (var i = 0; i < board.length; i++) {
    if (checkColumn(board, i)) {
      return true;
    }
  }
  return false;
}
function checkColumn(board, col) {
  if (board[0][col] === board[1][col] && board[0][col] === board[2][col] && board[0][col] !== 0) {
    return true;
  }
  return false;
}
// checkColumn function  : check if the two diagonals has a win
function checkDiagonals(board) {
  if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== 0) {
    return true;
  }
  if (board[2][0] === board[1][1] && board[2][0] === board[0][2] && board[2][0] !== 0) {
    return true;
  }
  return false;
}
// checkPlayer function  : changes the player on each click
function checkPlayer(player) {
  if (player === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
}
// reset function  : reset the board
function reset(board, tds) {
  // reset the board array
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      board[i][j] = 0;
    }
  }
  for (var i = 0; i < tds.length; i++) {
    tds[i].innerHTML = '';
  }
  msg.innerHTML = '';
  currentPlayer = 'X';
  boardDisabled = false;
}

