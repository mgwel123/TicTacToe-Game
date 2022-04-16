const playerX = 'X';
const playerO = 'O';
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
    if (screen.classList.contains('alert')){
        return;
    }

    const tile = event.target;
    const tileNumber = tile.dataset.index;
    if (tile.innerText != '') {
        return;
    }

    if (playerTurn === playerX) {
        tile.innerText = playerX;
        boardState[tileNumber -1] = playerX;
        playerTurn = playerO;
        turn.innerText = 'Player O Turn';
        console.log(turn);

    } else {
        tile.innerText = playerO;
        boardState[tileNumber - 1] = playerO;
        playerTurn = playerX;
        turn.innerText = 'Player X Turn';
        console.log(turn);
    }

    checkWinner();
    
    
}

//array of winning combos & function to check for winner (WIP)
function checkWinner(){

    const winningCombinations = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ];


    for(let i = 0; i < 8; i++){
        const winCombo = winningCombinations[i];
        const tileValue1 = boardState[winCombo[0]];
        const tileValue2 = boardState[winCombo[1]];
        const tileValue3 = boardState[winCombo[2]];

        if (tileValue1 === '' || tileValue2 === '' || tileValue3 === '') {
            continue;
        }

        if(tileValue1 === tileValue2 && tileValue2 === tileValue3) {
            gameOverBanner(tileValue1);
            
        }
    }

}




//game over alert message (WIP) and play button functionality
function gameOverBanner(winnerText){
    let text = 'Draw';
    if (winnerText != null) {
        text = `Winner is ${winnerText}! Press Play to play again.`
    }
    const div = document.createElement('div');
    div.setAttribute('class', 'alert alert-success');
    div.setAttribute('role', 'alert');
    div.setAttribute('id', 'game-over-alert');
    div.innerText = `${text}`;
    screen.className = 'visible';
    screen.appendChild(div);
    
}

function newGame() {
    screen.className = 'invisible';
    turn.innerText = 'Player X Turn';
    boardState.fill(null);
    tiles.forEach((tile) => (tile.innerText = ''));
    playerTurn = playerX;
}
    
    
