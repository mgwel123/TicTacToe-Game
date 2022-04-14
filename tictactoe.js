const playerX = 'X';
const playerO = 'O';
let inGame = true;
const tiles = document.querySelectorAll('.col-4');
const boardState = Array(tiles.length);
boardState.fill(null);

const screen = document.querySelector('#game-over-box');
const screenText = document.querySelector('#game-over-text');
const play = document.querySelector('#play')

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

    if (turn === playerX) {
        tile.innerText = playerX;
        boardState[tileNumber -1] = playerX;
        turn = playerO;
    } else {
        tile.innerText = playerO;
        boardState[tileNumber - 1] = playerO;
        turn = playerX;
    }
    
}

