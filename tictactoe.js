const playerX = 'X';
const playerO = 'O';
let playerTurn = playerX;
const tiles = document.querySelectorAll('.col-4');
const boardState = Array(tiles.length);
boardState.fill(null);
console.log(boardState);



const screen = document.querySelector('#game-over-box');
const screenText = document.querySelector('#game-over-text');
const play = document.querySelector('#play')
const turn = document.querySelector('#turn');

play.addEventListener('click', newGame);
tiles.forEach((tile) => tile.addEventListener('click', tileClick));

function tileClick(event) {
    if (screen.classList.contains('visible')){
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

    } else {
        tile.innerText = playerO;
        boardState[tileNumber - 1] = playerO;
        playerTurn = playerX;
        turn.innerText = 'Player X Turn';
    }

    checkWinner();
    
}

const winningCombinations = [
    {combo:[1, 2, 3]},
    {combo:[4, 5, 6]},
    {combo:[7, 8, 9]},
    {combo:[1, 4, 7]},
    {combo:[2, 5, 8]},
    {combo:[3, 6, 9]},
    {combo:[1, 5, 9]},
    {combo:[3, 5, 7]},
];


function checkWinner(){
    for(const winningCombination of winningCombinations){
        const combo = winningCombination;
        const tileValue1 = boardState[combo[0]-1];
        const tileValue2 = boardState[combo[1]-1];
        const tileValue3 = boardState[combo[2]-1];

        if(tileValue1 != null && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
            gameOverBanner(tileValue1);
        }
    }
}

function gameOverBanner(winnerText){
    let text = 'Draw';
    if (winnerText != null) {
        text = `Winner is ${winnerText}! Press Play to play again.`
    }
    screen.className = 'visible';
    screenText.innerText = text;
}

function newGame() {
    screen.className = 'invisible';
    boardState.fill(null);
    tiles.forEach((tile) => (tile.innerText = ''));
    playerTurn = playerX;
}
