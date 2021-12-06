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
        player.playerMoves.sort((a, b) => a - b);
            let arr = player.playerMoves;
            if (Math.abs(arr[1] - arr[0]) === Math.abs(arr[1] - arr[2])) {
                output = `${player.playerName} wins`;
            }
            player.playerMoves.splice(0, 3);
            return output;
    }

    const checkWinner = () => {
        if (player1.playerMoves.length === 3) {
            console.log(evaluateMoves(player1))
        }

        if (player2.playerMoves.length === 3) {
            console.log(player2);
        }
    }

    const playRound = (e) => {
        const elm = e.target;
        if (elm.tagName === 'P') {
            console.log(currentPlayer.playerMaker);

            if (elm.textContent === '') {
                updateBoard(elm);
                checkWinner();
            }

            // change the current player
            (currentPlayer.playerMaker === 'x') ? currentPlayer = player2 : currentPlayer = player1;
        }
    };


    return {
        buildGame,
        playRound
    };
})(gameBoard.board);

gameContainer.addEventListener('click', gameControl.playRound)

gameControl.buildGame();