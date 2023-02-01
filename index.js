// change over to double quotes since rest of file is using double quotes
const landing = document.querySelector('.Landing')
const playButton = document.getElementById("play-game");
const gameBoard = document.querySelector(".Game-Board");
const playAgainButton = document.getElementById("play-again");
const game = document.querySelector(".Game");
const rows = 8;
const cols = 8;
let selectedPiece = null;
let currentTurn = "black";

playButton.addEventListener("click", function() {
    // Hide the .landing element
    landing.style.display = "none";
    // Show the .Game-Board element
    game.style.display = "flex";
    renderBoard()
});

playAgainButton.addEventListener("click", handlePlayAgainClick);

// Create the board
function createBoard() {
    for (let r = 0; r < rows; r++) {
        const row = document.createElement("div");
        row.className = "row";
        for (let c = 0; c < cols; c++) {
            const col = document.createElement("div");
            col.className = "col";
            col.id = `${r},${c}`;
            if ((r + c) % 2 === 0) {
                col.classList.add("light");
            } else {
                col.classList.add("dark");
            }
            row.appendChild(col);
        }
        gameBoard.appendChild(row);
    }
}

// Add pieces to the board
function addPiecesToBoard(){
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if ((r + c) % 2 === 0 && r < 3) {
                const piece = document.createElement("div");
                piece.className = "piece black";
                document.getElementById(`${r},${c}`).appendChild(piece);
            } else if ((r + c) % 2 === 0 && r > 4) {
                const piece = document.createElement("div");
                piece.className = "piece white";
                document.getElementById(`${r},${c}`).appendChild(piece);
            }
        }
    }
}

// Set up click listeners for each square
function addClickListenersToSquares() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const square = document.getElementById(`${r},${c}`);
            square.addEventListener("click", handleClick);
        }
    }
}

function handleClick(event) {
    const square = event.target;
    const piece = square.firstChild;
    if (selectedPiece) {
        movePiece(selectedPiece, square);
    } else if (piece && piece.className.split(" ")[1] === currentTurn) {
        selectPiece(piece);
    }
}

  
function selectPiece(piece) {
    if (selectedPiece) {
        selectedPiece.classList.remove("selected");
        selectedPiece = null;
    }
    if (piece && piece.className.split(" ")[1] === currentTurn) {
        selectedPiece = piece;
        piece.classList.add("selected");
    }
}

// remove unused `piece` param here
function movePiece(piece, square) {
    const fromRow = parseInt(selectedPiece.parentNode.id.split(",")[0]);
    const fromCol = parseInt(selectedPiece.parentNode.id.split(",")[1]);
    const toRow = parseInt(square.id.split(",")[0]);
    const toCol = parseInt(square.id.split(",")[1]);
    
    // Check if the move is valid
    if (isValidMove(fromRow, fromCol, toRow, toCol)) {
        // Check if the move is a capture
        if (Math.abs(toRow - fromRow) === 2) {
            const capturedPieceRow = (fromRow + toRow) / 2;
            const capturedPieceCol = (fromCol + toCol) / 2;
            takePiece(capturedPieceRow, capturedPieceCol);
        }
        square.appendChild(selectedPiece);
            // Ends turn if validMove is made
            endTurn(true);
        } else {
            // dont End turn 
            endTurn(false);
    }
}


function isValidMove(fromRow, fromCol, toRow, toCol) {
    // Check if it is the correct turn to make a move
    if (selectedPiece.className.split(" ")[1] !== currentTurn) {
        return false;
    }
    // Check if the piece is moving to a different square
    if (fromRow === toRow && fromCol === toCol) {
        return false;
    }
    // Check if the piece is moving to a square that is not on the board
    if (toRow < 0 || toRow > 7 || toCol < 0 || toCol > 7) {
        return false;
    }
    // Check if piece is moving diagonally
    if (Math.abs(toRow - fromRow) !== Math.abs(toCol - fromCol)) {
        return false;
    }
    // Check if the piece is moving to a square that is not empty
    if (document.getElementById(`${toRow},${toCol}`).firstChild) {
        return false;
    }
    // Check if piece is moving two spaces diagonally and capturing an opposing piece
    if (Math.abs(toRow - fromRow) === 2) {
        const capturedPieceRow = (fromRow + toRow) / 2;
        const capturedPieceCol = (fromCol + toCol) / 2;
        const capturedPiece = document.getElementById(`${capturedPieceRow},${capturedPieceCol}`).firstChild;
            if (!capturedPiece || capturedPiece.className.split(" ")[1] === selectedPiece.className.split(" ")[1]) {
                return false;
            }
    }
    // Check if the piece is trying to move backwards
    if (selectedPiece.className.split(" ")[1] === "black" && toRow < fromRow) {
        return false;
    } else if (selectedPiece.className.split(" ")[1] === "white" && toRow > fromRow) {
        return false;
    }
    return true;
}


function takePiece(row, col) {
    const capturedPiece = document.getElementById(`${row},${col}`).firstChild;
    capturedPiece.remove();
}


function endTurn(moveIsValid) {
    // Switch turns if move is valid
    if (moveIsValid) {
        if (currentTurn === "black") {
            currentTurn = "white";
        } else {
            currentTurn = "black";
        }
    }
    // Reset selected piece
    if (selectedPiece) {
        selectedPiece.classList.remove("selected");
        selectedPiece = null;
    }
    // Check if the game is over
    if (gameOver()) {
        // Announce the winner
        announceWinner();
    }
}


function gameOver() {
    // Get all black pieces
    const blackPieces = document.querySelectorAll(".piece.black");
    // Get all white pieces
    const whitePieces = document.querySelectorAll(".piece.white");
    // If there are no black pieces or no white pieces, the game is over
    if (blackPieces.length === 0 || whitePieces.length === 0) {
        return true;
    }
    // Check if black pieces are blocked from making any moves
    for (let i = 0; i < blackPieces.length; i++) {
        const piece = blackPieces[i];
        // Get the row and column of the piece
        const row = parseInt(piece.parentNode.id.split(",")[0]);
        const col = parseInt(piece.parentNode.id.split(",")[1]);
        // Check if the piece can make any moves
        if (isValidMove(row, col, row + 1, col + 1) || isValidMove(row, col, row + 1, col - 1)) {
            return false;
        }
    }
    // Check if white pieces are blocked from making any moves
    for (let i = 0; i < whitePieces.length; i++) {
        const piece = whitePieces[i];
        // Get the row and column of the piece
        const row = parseInt(piece.parentNode.id.split(",")[0]);
        const col = parseInt(piece.parentNode.id.split(",")[1]);
        // Check if the piece can make any moves
        if (isValidMove(row, col, row - 1, col + 1) || isValidMove(row, col, row - 1, col - 1)) {
            return false;
        }
    }
    // If all black pieces are blocked from making any moves and all white pieces are blocked from making any moves, gameover
    return true;
}

function announceWinner() {
    // Get the winner message element
    const winnerMessage = document.querySelector(".winner-message");
    // Get all black pieces
    const blackPieces = document.querySelectorAll(".piece.black");
    // Get all white pieces
    const whitePieces = document.querySelectorAll(".piece.white");
    // If there are no black pieces, white wins
    if (blackPieces.length === 0) {
        winnerMessage.innerHTML = "White wins!";
    }
    // If there are no white pieces, black wins
    if (whitePieces.length === 0) {
        winnerMessage.innerHTML = "Black wins!";
    }
}

function renderBoard() {
    // Clear the game board
    gameBoard.innerHTML = "";
    // Create the board
    createBoard();
    // Add pieces to the board
    addPiecesToBoard();
    // Add click listeners to the squares
    addClickListenersToSquares();
}

function handlePlayAgainClick() {
    // Clear the winner message
    document.querySelector(".winner-message").innerHTML = "";
    // Render the board
    renderBoard();
    // Add click listeners to the squares
    addClickListenersToSquares();
}

  