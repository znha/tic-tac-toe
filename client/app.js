/* representiaoin code ************************************ */
var myDivs = `<div id="players">
<label>Player X Name</label>
<input type="text" id="playerX">
<label>Player O Name</label>
<input type="text" id="playerO">
<button id='savePlayersBtn'>save</button>
</div>
<div id="board">
<table border="1">
  <tr>
    <td id='0_0'></td>
    <td id='0_1'></td>
    <td id='0_2'></td>
  </tr>
  <tr>
    <td id='1_0'></td>
    <td id='1_1'></td>
    <td id='1_2'></td>
  </tr>
  <tr>
    <td id='2_0'></td>
    <td id='2_1'></td>
    <td id='2_2'></td>
  </tr>
</table>
</div>
<div>
<button id="reset">Reset</button>
<button id="rotate">Rotate</button>
<div>
  <div id="msg"></div>
  <div id="playerNames"></div>
  <div id="playerResults"></div>

</div>
</div>`
document.getElementById('container').innerHTML = myDivs;
/************************************* */
var ticTacToe = {
  board: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ],
  currentPlayer: 'X',
  winner: this.currentPlayer,
  tally: { "X": 0, "O": 0 },
  playerX: null,
  playerO: null,
  boardDisabled: false,
  boardStatus: false,
  boardHasTie: true
}
// var board = [
//   [0, 0, 0],
//   [0, 0, 0],
//   [0, 0, 0]
// ];
// var currentPlayer = 'X';
// var winner = currentPlayer; // keep track of the winner
// var tally = { "X": 0, "O": 0 } // keep track of the tally x vs. o win times
//var boardDisabled = false;
var tds = document.getElementsByTagName('td');
var resetBtn = document.getElementById('reset');
var rotateBtn = document.getElementById('rotate');
var savePlayersBtn = document.getElementById('savePlayersBtn');
var msg = document.getElementById('msg');
var boardDiv = document.getElementById('board');
var tallyMsg = document.getElementById('playerResults');
// var playerX;
// var playerO;
var handlers = {
  clickHandler: function (e) {
    var context = e.target;

    if (!ticTacToe.boardDisabled && ticTacToe.playerO !== null && ticTacToe.playerX !== null) {
      if (context.innerHTML === '') {
        msg.innerHTML = '';
        var vertecies = context.id.split('_');
        var x = vertecies[0];
        var y = vertecies[1];
        context.innerHTML = ticTacToe.currentPlayer;
        ticTacToe.board[x][y] = ticTacToe.currentPlayer;
        // check if its a win or a tie and show the reuslt in msg
        ticTacToe.boardStatus = handlers.checkRows(ticTacToe.board) || handlers.checkColumns(ticTacToe.board) || handlers.checkDiagonals(ticTacToe.board);
        if (ticTacToe.boardStatus) {
          ticTacToe.boardDisabled = true;
          ticTacToe.winner = ticTacToe.currentPlayer;
          ticTacToe.tally[ticTacToe.winner]++;
          msg.style.color = 'green';
          msg.innerHTML = 'Congrats ! ' + ((ticTacToe.currentPlayer === 'X') ? ticTacToe.playerX : ticTacToe.playerO);
          tallyMsg.innerHTML = ticTacToe.tally['X'] + "     ----     " + ticTacToe.tally['O'];

        } else {
          // check if the ticTacToe.board has a tie or the player can continue to play

          // I need to study the tie patterns to check them but now I will assume that its when the ticTacToe.board if full
          for (var i = 0; i < ticTacToe.board.length; i++) {
            for (var j = 0; j < ticTacToe.board[i].length; j++) {
              if (ticTacToe.board[i][j] === 0) {
                ticTacToe.boardHasTie = ticTacToe.boardHasTie && ticTacToe.board[i][j];
              }
            }
          }
          if (ticTacToe.boardHasTie) {
            msg.style.color = 'red';
            msg.innerHTML = 'You reached a Tie! Reset the game to contiue';
          }
          handlers.checkPlayer(ticTacToe.currentPlayer);

        }

      } else {
        msg.style.color = 'red';
        msg.innerHTML = 'NOT YOUR TURN';

      }
    }

  },
  checkRows: function (board) {
    for (var i = 0; i < board.length; i++) {
      if (board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] !== 0) {
        return true;
      }
    }
    return false;
  },
  checkColumns: function (board) {
    for (var i = 0; i < board.length; i++) {
      if (this.checkColumn(board, i)) {
        return true;
      }
    }
    return false;
  },
  checkColumn: function (board, col) {
    if (board[0][col] === board[1][col] && board[0][col] === board[2][col] && board[0][col] !== 0) {
      return true;
    }
    return false;
  },
  checkDiagonals: function (board) {
    if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== 0) {
      return true;
    }
    if (board[2][0] === board[1][1] && board[2][0] === board[0][2] && board[2][0] !== 0) {
      return true;
    }
    return false;
  },
  checkPlayer: function (player) {
    if (player === 'X') {
      ticTacToe.currentPlayer = 'O';
    } else {
      ticTacToe.currentPlayer = 'X';
    }
  },
  reset: function (board, tds) {
    // reset theboard array
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        board[i][j] = 0;
      }
    }
    for (var i = 0; i < tds.length; i++) {
      tds[i].innerHTML = '';
    }
    msg.innerHTML = '';
    ticTacToe.currentPlayer = ticTacToe.winner;
    ticTacToe.boardDisabled = false;
  }
}

resetBtn.addEventListener('click', function (e) {
  e.preventDefault();
  handlers.reset(ticTacToe.board, tds);
});
rotateBtn.addEventListener('click', function (e) {
  e.preventDefault();
  boardDiv.style.transform = "rotate(90deg)";
  for (var i = 0; i < tds.length; i++) {
    tds[i].style.transform = "rotate(270deg)";
  }
});
savePlayersBtn.addEventListener('click', function (e) {
  e.preventDefault();
  ticTacToe.playerX = document.getElementById('playerX').value;
  ticTacToe.playerO = document.getElementById('playerO').value;
  document.getElementById('playerNames').innerHTML = "Player X (" + ticTacToe.playerX + ") Vs. Player O (" + ticTacToe.playerO + ")";
});

for (var i = 0; i < tds.length; i++) {
  tds[i].addEventListener('click', handlers.clickHandler);
}
// clickHandler function :handles click events on the ticTacToe.board;
