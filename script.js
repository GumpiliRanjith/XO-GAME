const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restartBtn');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
];

initializeGame();

function initializeGame() {
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => cellClicked(cell, index));
    });
    restartBtn.addEventListener('click', restartGame);
    running = true;
}

function cellClicked(cell, index) {
    if (board[index] !== "" || !running) {
        return;
    }
    board[index] = currentPlayer;
    cell.innerText = currentPlayer;
    checkWinner();
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = board[condition[0]];
        const cellB = board[condition[1]];
        const cellC = board[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.innerText = `${currentPlayer} WINS!`;
        running = false;
    } else if (!board.includes("")) {
        statusText.innerText = `Draw!`;
        running = false;
    } else {
        currentPlayer = (currentPlayer === "X") ? "O" : "X";
        statusText.innerText = `Player ${currentPlayer}'s Turn`;
    }
}

function restartGame() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    statusText.innerText = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => cell.innerText = "");
    running = true;
}