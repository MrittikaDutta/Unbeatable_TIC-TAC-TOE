// const game = document.getElementById('game');
// const cells = document.querySelectorAll('.cell');
// const resetButton = document.getElementById('reset');
// const currentPlayerElement = document.getElementById('current-player'); // Reference to the current player element

// let currentPlayer = 'X';
// let gameBoard = ['', '', '', '', '', '', '', '', ''];
// let gameActive = true;

// const winningCombinations = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
// ];

// // Update the current player display
// function updateCurrentPlayerDisplay() {
//     currentPlayerElement.textContent = `Current player: ${currentPlayer}`;
// }

// // Handle cell click
// function handleCellClick(e) {
//     const cell = e.target;
//     const index = cell.dataset.index;
//     if (gameBoard[index] === '' && gameActive) {
//         gameBoard[index] = currentPlayer;
//         cell.textContent = currentPlayer;

//         // Check for a win or a tie
//         if (checkWin()) {
//             alert(`${currentPlayer} wins!`);
//             gameActive = false;
//         } else if (checkTie()) {
//             alert('It\'s a tie!');
//             gameActive = false;
//         } else {
//             // Switch player
//             currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//             updateCurrentPlayerDisplay(); // Update the current player display
//         }
//     }
// }

// // Check for a win
// function checkWin() {
//     return winningCombinations.some(combination => {
//         return combination.every(index => gameBoard[index] === currentPlayer);
//     });
// }

// function checkTie() {
//     return gameBoard.every(cell => cell !== '');
// }

// function resetGame() {
//     gameBoard = ['', '', '', '', '', '', '', '', ''];
//     gameActive = true;
//     currentPlayer = 'X';
//     updateCurrentPlayerDisplay();

//     cells.forEach(cell => {
//         cell.textContent = '';
//     });
// }

// cells.forEach(cell => {
//     cell.addEventListener('click', handleCellClick);
// });

// resetButton.addEventListener('click', resetGame);

// updateCurrentPlayerDisplay();
//---------------------------

const game = document.getElementById('game');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const currentPlayerElement = document.getElementById('current-player'); // Reference to the current player element

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

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

// Update the current player display
function updateCurrentPlayerDisplay() {
    currentPlayerElement.textContent = `Current player: ${currentPlayer}`;
}

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;
    if (gameBoard[index] === '' && gameActive && currentPlayer === 'X') {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;

        // Check for a win or a tie
        if (checkWin()) {
            alert(`${currentPlayer} wins!`);
            gameActive = false;
        } else if (checkTie()) {
            alert('It\'s a tie!');
            gameActive = false;
        } else {
            // Switch to AI's turn
            currentPlayer = 'O';
            updateCurrentPlayerDisplay();
            setTimeout(aiMove, 500); // Slight delay to simulate thinking time
        }
    }
}

// Check for a win
function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameBoard[index] === currentPlayer);
    });
}

// Check for a tie
function checkTie() {
    return gameBoard.every(cell => cell !== '');
}

// Reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    updateCurrentPlayerDisplay();

    cells.forEach(cell => {
        cell.textContent = '';
    });
}

// AI's move (Minimax Algorithm)
function aiMove() {
    const bestMove = getBestMove(gameBoard);
    gameBoard[bestMove] = 'O';
    cells[bestMove].textContent = 'O';

    // Check if AI wins or it's a tie
    if (checkWin()) {
        alert('O wins!');
        gameActive = false;
    } else if (checkTie()) {
        alert('It\'s a tie!');
        gameActive = false;
    } else {
        currentPlayer = 'X';
        updateCurrentPlayerDisplay();
    }
}

// Get the best move using Minimax algorithm
function getBestMove(board) {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
        // Check if spot is available
        if (board[i] === '') {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

// Minimax algorithm
function minimax(board, depth, isMaximizing) {
    // Check for terminal states (win or tie)
    if (checkWinForPlayer(board, 'O')) {
        return 10 - depth;
    } else if (checkWinForPlayer(board, 'X')) {
        return depth - 10;
    } else if (isBoardFull(board)) {
        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

// Helper function to check if the board is full
function isBoardFull(board) {
    return board.every(cell => cell !== '');
}

// Helper function to check if a player has won on a given board
function checkWinForPlayer(board, player) {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
    });
}

// Event listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

updateCurrentPlayerDisplay();
