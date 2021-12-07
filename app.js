// tic-tac-toe game created by Mark Akom Ntow
const gameContainer = document.querySelector('.game-container');

function Player(name, maker) {
    const playerName = name;
    const playerMoves = [];
    const playerMaker = maker;
    return Object.assign({}, {playerName, playerMoves, playerMaker});
}

const player1 = Player('mark', 'x');
const player2 = Player('yo', 'o');

// game board module
const gameBoard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];
    return {
        board
    }
})();

const gameControl = ((board) => {
    let displayMsg = null;
    const winningOutcome = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ]
    let currentPlayer = player1;
    const buildGame = () => {
        board.forEach((box, index)=> {
            const spot = document.createElement('p');
            spot.textContent = box;
            spot.setAttribute('data-pos', index);
            gameContainer.appendChild(spot);
        });
    }

    const updateBoard = (elm) => {
        elm.textContent = currentPlayer.playerMaker;
        const position = elm.getAttribute('data-pos');
        board[position] = currentPlayer.playerMaker;
        currentPlayer.playerMoves.push(Number(position) + 1);
    }

    const evaluateMoves = (player) => {
        let output = '';
        let isEqual = false;
        player.playerMoves.sort((a, b) => a - b);
        let arr = player.playerMoves;

        for (let i = 0; i < winningOutcome.length; i++) {
           if (arr.indexOf(winningOutcome[i][0]) > -1 &&
                arr.indexOf(winningOutcome[i][1]) > -1 &&
                arr.indexOf(winningOutcome[i][2]) > -1  
           ) {
               isEqual = true;
               break;
            }
        }

        if (isEqual) {
           output = `${player.playerName} wins`;
        }            
            
        return output;
    }

    const checkWinner = (player) => {

        if (player.playerMoves.length > 2) {
            displayMsg = evaluateMoves(player);

            if (displayMsg) {
                return;
            }
        }
        // check for a draw
        const isADraw = board.every((val) => val === 'x' || val === 'o');
            if (isADraw) {
                displayMsg = `It's A Draw`;
            }
    }

    const reset = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        [...gameContainer.childNodes].forEach(child => {
            gameContainer.removeChild(child);
        });
        player1.playerMoves = [];
        player2.playerMoves = [];
        displayMsg = null;
        buildGame();
    }

    const playRound = (e) => {
        const elm = e.target;
        if (elm.tagName === 'P') {
            console.log(currentPlayer.playerMaker);

            // check who is currently playing

            if (elm.textContent === '') {
                updateBoard(elm);
                checkWinner(currentPlayer);
                if (displayMsg) {
                    alert(displayMsg);
                    reset();
                }
            }
            // change the current player
            currentPlayer.playerMaker === 'x' ? currentPlayer = player2 : currentPlayer = player1;
        }
    };

    return {
        buildGame,
        playRound,
        displayMsg
    };
})(gameBoard.board);

gameContainer.addEventListener('click', gameControl.playRound)

gameControl.buildGame();