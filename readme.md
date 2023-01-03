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
- As a user, I want a timer for turns

Version 3
- As a user, I want hints
- As a user, I want to play against AI
- As a user, I want a flip table option


## MVP Psuedocode


```js
startingBoard () {
    For Loop to create 8x8 grid
    starts at 0
    ends at < 8
        IF row is less than 3
            add black pieces
        ELSE IF row greater than 4
            add red pieces
        ElSE empty spaces
}

isValidMove(){
    If start or end position are not on board
        return false
    If space occupied
        return false
    If move is not diagonal and only one space
        return false
    If piece is not moving the correct direction 
        return false
    If move is diagonal and two spaces
        return false unless there is a piece to jump over in the middle
    If previous turn was your turn
        return false
    If piece is not yours
        return false
}

movePiece(){
    IF isValidMove = true
        allow move
    
}

checkTurn (){
    Firstturn math.random
        If previous turn was your turn 
            return false    
        When player movePiece 
            chnage turns

}

takePiece () {
    IF isValidMove = true && piece in middle = true
        remove middle piece from board
}

gameOver() {
    IF isValidMove = false for all black or red pieces
        return Game Over
    IF no pieces left for black or red
        return Game Over
    check winner
         if player with no moves/pieces left is red 
            return Black Wins
         if player with no move/pieces left is black
            return Red Wins
}

Playagain() {
    Event Listener "play again" button pressed reset board to starting board
}

```