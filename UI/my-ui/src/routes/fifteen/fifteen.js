//import './fifteen.css';

function Fifteen() {
    return (
        <div>
            <head>
            <title>Fifteen Puzzle</title>
        </head>

        <body>
            <h1>Fifteen Puzzle</h1>

            <p>
            The goal of the fifteen puzzle is to un-jumble its fifteen squares
            by repeatedly making moves that slide squares into the empty space.
            How quickly can you solve it?
            </p>

            <div id="puzzlearea">
            <div>1</div>  <div>2</div>  <div>3</div>  <div>4</div>
            <div>5</div>  <div>6</div>  <div>7</div>  <div>8</div>
            <div>9</div>  <div>10</div> <div>11</div> <div>12</div>
            <div>13</div> <div>14</div> <div>15</div>
            </div>

            <p id="controls">
            <button id="shufflebutton">Shuffle</button>
            </p>

            <p>
            American puzzle author and mathematician Sam Loyd is often falsely
            credited with creating the puzzle; indeed, Loyd claimed from 1891
            until his death in 1911 that he invented it.
            The puzzle was actually created around 1874 by Noyes Palmer Chapman,
            a postmaster in Canastota, New York.
            </p>

                    </body>
    </div>
    )
}

/** Main class for my board. Includes all the setup for the board in the constructor,
 *  and adds calls to its methods in the DOM using 'onclick' for each div
 *
 */
class grid {
  constructor(id) {
    this.id = id;
    this.id.appendChild(document.createElement("div")); // Add the 16th 'empty' tile
    this.tiles = id.getElementsByTagName("div");
    this.tileNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    let count = 1;
    for (let tile of this.tiles) {
      // Go through each div and add an id and onclick method to it.
      let tileId = "T" + count.toString();
      tile.id = tileId;
      tile.onclick = function () {
        update(tileId);
      };
      count++;
    }
  }

  /** Function to update and refresh the board when a tile is clicked
   *
   * @param {string} id - the id of the tile clicked on
   */
  updateBoard = function (id) {
    if (this.isBlankNeighbor(id)) {
      // Check if tile clicked on is next to the blank space and swap
      this.swapTile(id);
    }
    let count = 0;
    for (let tile of this.tiles) {
      // Now go through and set all ids to match the array
      tile.id = "T" + this.tileNums[count].toString();
      tile.innerHTML = this.tileNums[count].toString();
      if (tile.id == "T16") {
        tile.innerHTML = "";
      }
      tile.onclick = function () {
        update(tile.id);
      };
      if (this.isBlankNeighbor(tile.id)) {
        // If a tile is now neighboring the blank tile, make it hoverable
        tile.classList.add("hoverable");
      } else {
        // Otherwise, remove the existing hoverable class, if any
        tile.classList.remove("hoverable");
      }
      count++;
    }
  };

  /** Function to swap a tile with the blank tile "T16".
   *
   *  It will search the array of tileNums, find where both tiles are, and swap their positions
   *
   * @param {string} id
   */
  swapTile = function (id) {
    let tilei = this.findTile(id); // Find the position of the tile to swap
    let blanki = this.findTile("T16"); // Find the position of the blank tile
    let temp = this.tileNums[tilei]; // Store the swap tile in a temp var
    this.tileNums[tilei] = this.tileNums[blanki]; // Swap the chosen tile with the blank tile
    this.tileNums[blanki] = temp; // Swap the blank tile with the stored temp var
  };

  /** Check if a tile is adjacent to the blank tile, T16
   *
   * @param {string} id
   * @returns true if the tile is neighboring, false otherwise
   */
  isBlankNeighbor = function (id) {
    let tilei = this.findTile(id);
    if (
      // Check all 4 possible positions to the left, right, above, and below
      this.tileNums[tilei + 1] == 16 ||
      this.tileNums[tilei - 1] == 16 ||
      this.tileNums[tilei + 4] == 16 ||
      this.tileNums[tilei - 4] == 16
    ) {
      return true;
    }
    return false;
  };

  /** Searches the list of tileNums to find the position of the tile inputted
   *
   * @param {string} id
   * @returns - the index where it found the tile number or -1 otherwise
   */
  findTile(id) {
    for (let i = 0; i < this.tileNums.length; i++) {
      if (id.slice(1) == this.tileNums[i]) {
        return i;
      }
    }
    return -1;
  }

  /** Function to shuffle the board, only making valid moves
   *
   * @param {int} amount - number of moves to make
   */
  async shuffle(amount) {
    for (let i = 0; i < amount; i++) {
      let possibleMoves = document.getElementsByClassName("hoverable");
      this.updateBoard(
        possibleMoves[Math.floor(Math.random() * possibleMoves.length)].id
      );
      await this.sleep(10);
    }
  }
  /** Function to pause and wait for a specified number of milliseconds
   *
   * @param {int} ms - number of milliseconds
   * @returns - a promise after the specified timeout
   */
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/** This function was added as a workaround for adding a method to the onclick of each div.
 *  Trying to use a class method in the onclick was incredibly complex and confusing, so I
 *  got advice from Josiah Kangas to use this outside method to call my class methods.
 *
 * @param {string} id - the id of the tile clicked on
 */
function update(id) {
  //board.updateBoard(id);
}

// let board;
// window.onload = () => {
//   let button = document.getElementById("shufflebutton");
//   board = new grid(document.getElementById("puzzlearea"));
//   board.updateBoard("0"); // This is to add the hoverable class to the two necessary tiles 12 and 15 on refresh
//   button.onclick = function () {
//     board.shuffle(300);
//   };
// };

export default Fifteen;