import "./tictactoe.css";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
var gameStatus;
let curPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""]; // Internal storage of board to make winner calculations easier
let gameActive = true; // Whether or not a player has won, disallows further play until game is reset

const winConditions = [
  // Collection of all possible winning situations
  [0, 1, 2], // 1st row
  [3, 4, 5], // 2nd row
  [6, 7, 8], // 3rd row
  [0, 3, 6], // 1st col
  [1, 4, 7], // 2nd col
  [2, 5, 8], // 3rd col
  [0, 4, 8], // Top left diagonal
  [2, 4, 6], // Top right diagonal
];

/** Function to handle a box selection and update the board accordingly
 *
 * @param clickedBox the box clicked on in the grid
 */
function handleMove(clickedBox) {
  let box = clickedBox.target;
  let boxID = box.getAttribute("id");
  if (boardState[boxID] === "" && gameActive) {
    // Make sure the box is empty and nobody has won
    boardState[boxID] = curPlayer;
    console.log(boardState)
    box.innerHTML = curPlayer;
    checkWinner();
  }
}



/** Switches the current player from X to O or vice versa
 *
 */
function handlePlayerChange() {
  if (curPlayer === "X") {
    curPlayer = "O";
  } else {
    curPlayer = "X";
  }
  gameStatus.innerHTML = "It's " + curPlayer + "'s turn";
}

/** Function to check if a player has won, or draw has been reached
 *
 * @returns null
 */
function checkWinner() {
  let roundWon = false;
  // This part was orginally hard coded but I found a tutorial that helped me simplify it to a for loop
  for (let i = 0; i < 8; i++) {
    const condition = winConditions[i];
    let box1 = boardState[condition[0]];
    let box2 = boardState[condition[1]];
    let box3 = boardState[condition[2]];
    if (box1 === box2 && box1 === box3 && box1 !== "") {
      roundWon = true;
      break;
    }
  }

  if (roundWon === true) {
    gameStatus.innerHTML = (curPlayer + " has won!")
    gameActive = false;
    return;
  }
  if (!boardState.includes("")) {
    // If all squares are non-empty and there's no winner, draw
    gameStatus.innerHTML = ("The match has ended in a draw!")
    gameActive = false;
    return;
  }
  handlePlayerChange();
}

/** Resets the board for a new game
 *
 */
function resetGame() {
  console.log("Game reset")
  curPlayer = "X";
  boardState = ["", "", "", "", "", "", "", "", ""];
  gameStatus.innerHTML = "New Game! It's " + curPlayer + "'s turn";
  gameActive = true;
   document.querySelectorAll(".box").forEach((box) => (box.innerHTML = ""));
}



/** Main TicTacToe functional component  
 * 
 */
function TicTacToe() {
  // This section throws some strange errors when rendering the board
  // after navigating to the TicTacToe page. Most of the functionality
  // of the game doesn't function properly until you refresh the page
  // while navigated to the TicTacToe board. 
  
  window.onload = function () {
    console.log("Window.onload finished");
    gameStatus = document.getElementById("status");
    //document.getElementById("restart").addEventListener("click", resetGame);
    console.log("Game" + gameStatus);
    document
      .querySelectorAll(".box")
      .forEach((box) => box.addEventListener("click", handleMove));
    document.querySelectorAll(".box").forEach((box) =>
      box.addEventListener("keyup", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          document.getElementById(box.id).click();
        }
      })
    );
  };
  return (
    <header>
      <nav>
        <Link className="App-link" to="/">
          Home
        </Link>{" "}
        |
        <Link className="App-link" to="/tictactoe">
          Tic-Tac-Toe
        </Link>{" "}
        |
        <Link className="App-link" to="/bible">
          Bible Verse
        </Link>
      </nav>
      <section>
        <h1 className="intro">Welcome to Tic-Tac-Toe!</h1>
        <div className="board">
          <Box id="0" className="box" tabindex="1" onClick={handleMove}>
            {boardState[0]}
          </Box>
          <Box id="1" className="box" tabindex="1" onClick={handleMove}>
            {boardState[1]}
          </Box>
          <Box id="2" className="box" tabindex="1" onClick={handleMove}>
            {boardState[2]}
          </Box>
          <Box id="3" className="box" tabindex="1" onClick={handleMove}>
            {boardState[3]}
          </Box>
          <Box id="4" className="box" tabindex="1" onClick={handleMove}>
            {boardState[4]}
          </Box>
          <Box id="5" className="box" tabindex="1" onClick={handleMove}>
            {boardState[5]}
          </Box>
          <Box id="6" className="box" tabindex="1" onClick={handleMove}>
            {boardState[6]}
          </Box>
          <Box id="7" className="box" tabindex="1" onClick={handleMove}>
            {boardState[7]}
          </Box>
          <Box id="8" className="box" tabindex="1" onClick={handleMove}>
            {boardState[8]}
          </Box>
        </div>
        <h3 id="status"></h3>
        <button id="restart" onClick={resetGame}>RESTART</button>
      </section>
    </header>
  );
}



export default TicTacToe;
