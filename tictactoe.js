const playerX = 'X';
const playerO = 'O';
let inGame = true;
let playerTurn = playerX;
const tiles = document.querySelectorAll('.col-4');
const boardState = Array(tiles.length);
boardState.fill(null);
console.log(boardState);   //used to check/validate current state


//variables for bottom div elements (game over, player turn, paly button)
const screen = document.querySelector('#game-over-box');
const play = document.querySelector('#play')
const turn = document.querySelector('#turn');

//game reset
play.addEventListener('click', newGame);
//tile click event
tiles.forEach((tile) => tile.addEventListener('click', tileClick));

function tileClick(event) {
    if (inGame){
        const tile = event.target;
        const tileNumber = tile.dataset.index;
        if (tile.innerText != '') {
            return;
        }

        if (playerTurn === playerX) {
            tile.innerText = playerX;
            boardState[tileNumber] = playerX;
            playerTurn = playerO;
            turn.innerText = 'Player O Turn';
            console.log(turn);

        } else {
            tile.innerText = playerO;
            boardState[tileNumber] = playerO;
            playerTurn = playerX;
            turn.innerText = 'Player X Turn';
            console.log(turn);
        }

    }

    checkWinner();
    
    
}

//array of winning combos & function to check for winner (WIP)
function checkWinner(){
    let gameWon = false;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];


    for(let i = 0; i < 8; i++){
        const winCombo = winningCombinations[i];
        let tileValue1 = boardState[winCombo[0]];
        let tileValue2 = boardState[winCombo[1]];
        let tileValue3 = boardState[winCombo[2]];
        console.log(tileValue1);
        console.log(tileValue2);
        console.log(tileValue3);


        if(tileValue1 != null && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
            gameWon = true;
            inGame = false;
            gameOverBanner(tileValue1, gameWon);
            return;
        }
    }

}




//game over alert message (WIP) and play button functionality
function gameOverBanner(winnerText, gameWon){
    screen.className = 'visible';
    
    if (winnerText != null && gameWon === true) {
        let text = `Winner is ${winnerText}! Press Play to play again.`;
        const div = document.createElement('div');
        div.setAttribute('class', 'alert alert-success');
        div.setAttribute('role', 'alert');
        div.setAttribute('id', 'game-over-alert');
        div.innerText = `${text}`;
        screen.appendChild(div);
    } 
        
    if (winnerText != null && gameWon === false) {
        text = 'Draw! Press Play to play again';
        const div = document.createElement('div');
        div.setAttribute('class', 'alert alert-primary');
        div.setAttribute('role', 'alert');
        div.setAttribute('id', 'game-over-alert');
        div.innerText = `${text}`;
        screen.appendChild(div);
    }
}

function newGame() {
    screen.className = 'invisible';
    turn.innerText = 'Player X Turn';
    boardState.fill(null);
    tiles.forEach((tile) => (tile.innerText = ''));
    playerTurn = playerX;
    inGame = true;
}
    
    
