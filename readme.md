# Checkers


## Project planning for Checkers

Wireframe:

![Wireframes](./assets/Wireframe.png)

## User Stories

MVP
- As a user, I want to be able to start the game
- As a user, I want to be able to move a piece
- As a user, I want to play against someone else
- As a user, I want to take a turn
- As a user, I want to take pieces
- As a user, I want to be able to play again
- As a user, I want to know if I Lost
- As a user, I want to know if I Won
- As a user, I want to know if its my turn
- As a user, I want to be able to see the board

Version 2
- As a user, I want to be able to change piece appearance
- As a user, I want to change board appearance

Version 3
- As a user, I want hints
- As a user, I want to play against AI
- As a user, I want a flip table option


## MVP Psuedocode

1. Show board with the starting positions of the pieces
2. While the game is not over:
  3. Display the board to the user
  4. Get the next move from the user
  5. Validate the move
  6. If the move is valid:
     7. Make the move on the board
     8. If the move results in a capture:
        9. Remove the captured piece from the board
  10. If the move is not valid:
     11. Display an error message
  12. Switch the current player
13. End the game
14. Announce the winner

/ Initialize board with 8x8 grid and starting positions for red and black pieces

function initializeBoard() {
let board = []; for (let i = 0; i < 8; i++) {
    let row = []; for (let j = 0; j < 8; j++) {
         if (i % 2 === 0 && j % 2 === 0) {
             row.push(null); }
              else if (i % 2 === 1 && j % 2 === 1) 
              {
                row.push(null);
              } else if (i < 3) { 
                row.push("black");
                } else if (i > 4) {
                    row.push("red");
                    } else {
                        row.push(null);
                        }
                        } board.push(row);
        } return board;
}

// Function to check if a move is valid

function isValidMove(board, startRow, startCol, endRow, endCol) {
// Check if start and end positions are on the board
if (startRow < 0 || startRow > 7 || startCol < 0 || startCol > 7 || endRow < 0 || endRow > 7 || endCol < 0 || endCol > 7) {
return false;
}
// Check if start position is occupied by a piece
if (board[startRow][startCol] === null) {
return false;
}
// Check if end position is already occupied
if (board[endRow][endCol] !== null) {
return false;
}
// Check if move is diagonal and only one space
if (Math.abs(startRow - endRow) !== 1 || Math.abs(startCol - endCol) !== 1) {
return false;
}
// Check if piece is moving in the correct direction (red pieces can only move down the board, black pieces can only move up the board)
if (board[startRow][startCol] === "red" && endRow < startRow) {
return false;
} else if (board[startRow][startCol] === "black" && endRow > startRow) {
return false;
}
return true;
}

// Function to check if a jump is valid

function isValidJump(board, startRow, startCol, endRow, endCol) {
// Check if start and end positions are on the board
if (startRow < 0 || startRow > 7 || startCol < 0 || startCol > 7 || endRow < 0 || endRow > 7 || endCol < 0 || endCol > 7) {
return false;
}
// Check if start position is occupied by a piece
if (board[startRow][startCol] === null) {
return false;
}
// Check if end position is already occupied
if (board[endRow][endCol] !== null) {
return false;
}
// Check if move is diagonal and two spaces
if (Math.abs(startRow - endRow) !== 2 || Math.abs(startCol - endCol) !== 2) {
return false;
}
// Check if there is a piece to jump over in the middle
let midRow = (startRow + end



