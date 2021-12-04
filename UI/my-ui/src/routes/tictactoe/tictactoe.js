import './tictactoe.css';
const gameStatus = document.getElementById(".status");
console.log(gameStatus)

let curPlayer = "X"
let boardState =
    ["", "", "",
    "", "", "",
    "", "", ""]; // Internal storage of board to make winner calculations easier
let gameActive = true; // Whether or not a player has won, disallows further play until game is reset

const winConditions = [ // Collection of all possible winning situations
  [0, 1, 2], // 1st row
  [3, 4, 5], // 2nd row
  [6, 7, 8], // 3rd row
  [0, 3, 6], // 1st col
  [1, 4, 7], // 2nd col
  [2, 5, 8], // 3rd col
  [0, 4, 8], // Top left diagonal
  [2, 4, 6], // Top right diagonal
];

// This line of code was based off a tutorial I watched at https://www.youtube.com/watch?v=Rzhcb4M9-0Q
document.querySelectorAll(".box").forEach((box) => box.addEventListener("click", handleMove));

document.querySelectorAll(".box").forEach((box) => box.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        document.getElementById(box.id).click();
    }
}));

/** Switches the current player from X to O or vice versa
 * 
 */
function handlePlayerChange() {
    if (curPlayer === "X") {
        curPlayer = "O";
    } else {
        curPlayer = "X";
    }
    //gameStatus.innerHTML = "It's " + curPlayer + "'s turn";
}

/** Function to handle a box selection and update the board accordingly
 * 
 * @param clickedBox the box clicked on in the grid
 */
function handleMove(clickedBox) {
    let box = clickedBox.target;
    let boxID = box.getAttribute("id");
    if (boardState[boxID] === "" && gameActive) { // Make sure the box is empty and nobody has won
        boardState[boxID] = curPlayer; 
        box.innerHTML = curPlayer;
        checkWinner();
    }
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
        //gameStatus.innerHTML = (curPlayer + " has won!")
        gameActive = false;
        return;
    }
    if (!boardState.includes("")) { // If all squares are non-empty and there's no winner, draw
        //gameStatus.innerHTML = ("The match has ended in a draw!")
        gameActive = false;
        return;
    }
    handlePlayerChange();

}

/** Resets the board for a new game
 * 
 */
function resetGame() {
    curPlayer = "X"
    boardState = ["", "", "", "", "", "", "", "", ""];
    //gameStatus.innerHTML = "New Game! It's " + curPlayer + "'s turn";
    gameActive = true;
    document.querySelectorAll(".box").forEach(box => box.innerHTML = "");
}

function TicTacToe() {
    return (
      <section>
        <h1 class="intro">Welcome to Tic-Tac-Toe!</h1>
        <div class="board">
                <div id="0" class="box" tabindex="1" onclick={handleMove}></div>
          <div id="1" class="box" tabindex="1"></div>
          <div id="2" class="box" tabindex="1"></div>
          <div id="3" class="box" tabindex="1"></div>
          <div id="4" class="box" tabindex="1"></div>
          <div id="5" class="box" tabindex="1"></div>
          <div id="6" class="box" tabindex="1"></div>
          <div id="7" class="box" tabindex="1"></div>
          <div id="8" class="box" tabindex="1"></div>
        </div>
            <h3 class="status">{gameActive ? ("It's " + curPlayer + "'s turn") : ("Game Over") }</h3>
            <button id="reset" onclick={resetGame}>
          RESTART
        </button>
      </section>
    );
}

export default TicTacToe;