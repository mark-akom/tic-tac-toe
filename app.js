// tic-tac-toe game created by Mark Akom Ntow
const gameContainer = document.querySelector('.game-container');
const intro = document.querySelector('.intro');
const playerVsPlayer = document.querySelector('.player-v-player');
const playerVsCpu = document.querySelector('.player-v-cpu');
const playerVsPlayerForm = document.querySelector('.player-v-player-form');
const playerVsCpuForm = document.querySelector('.player-v-cpu-form');
const player1Input = document.querySelector('.player-1');
const player2Input = document.querySelector('.player-2');
const player1CpuInput = document.querySelector('.player-1-cpu');
const displayBox = document.querySelector('.display-msg');

let player1;
let player2;

function Player(name, maker) {
    const playerName = name;
    const playerMoves = [];
    const playerMaker = maker;
    return Object.assign({}, {playerName, playerMoves, playerMaker});
}

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
    let currentPlayer;
    let playingWithCpu = false;
    const setCurrentPlayer = (player) => {
        currentPlayer = player;
    }

    const setPlayingWithCpu = () => {
        playingWithCpu = true;
    }

    const buildGame = () => {
        board.forEach((box, index)=> {
            const spot = document.createElement('p');
            spot.textContent = box;
            spot.setAttribute('data-pos', index);
            gameContainer.appendChild(spot);
        });
    }

    const updateBoard = (elm) => {

        if (playingWithCpu && currentPlayer.playerName === 'CPU') {
            gameContainer.childNodes[currentPlayer.spot].textContent = currentPlayer.playerMaker;
            board[currentPlayer.spot] = currentPlayer.playerMaker;
            currentPlayer.playerMoves.push(currentPlayer.spot + 1);
            return;
        }

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

    const showMsg = () => {
        gameContainer.classList.remove('show-game-container');
        displayBox.classList.add('show-display');
    }

    const reset = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        [...gameContainer.childNodes].forEach(child => {
            gameContainer.removeChild(child);
        });
        player1.playerMoves = [];
        player2.playerMoves = [];
        displayMsg = null;
        setCurrentPlayer(player1);
        buildGame();
    }

    const playRound = (e) => {
        const elm = e.target;
        if (elm.tagName === 'P') {

            if (elm.textContent === '') {
                updateBoard(elm);
                checkWinner(currentPlayer);
                if (displayMsg) {
                    displayBox.firstElementChild.textContent = displayMsg;
                    showMsg();
                    return;
                }
            }

            // change the current player
            if (playingWithCpu) {
                // get the cpu's spot
                while(true) {
                    const spot = Math.floor(Math.random() * board.length);
                    if (board[spot] === '') {
                        currentPlayer = {...player2, spot}
                        updateBoard();
                        checkWinner(currentPlayer);
                        currentPlayer = player1;
                        break;
                    }
                }
                if (displayMsg) {
                    displayBox.firstElementChild.textContent = displayMsg;
                    showMsg();
                    return;
                }

            } else {
                currentPlayer.playerMaker === 'x' ? currentPlayer = player2 : currentPlayer = player1;
            }

        }
    };

    return {
        buildGame,
        playRound,
        setCurrentPlayer,
        setPlayingWithCpu,
        reset,
    };
})(gameBoard.board);

(function() {
    playerVsPlayerForm.addEventListener('submit', function(e){
        e.preventDefault();
        player1 = Player(player1Input.value, 'x');
        player2 = Player(player2Input.value, 'o');
        gameControl.setCurrentPlayer(player1);
        player1Input.value = '';
        player2Input.value = '';
    
        intro.classList.add('hide-intro');
        playerVsPlayerForm.classList.remove('show-form');
    
        gameContainer.classList.add('show-game-container');
    });
    
    playerVsCpuForm.addEventListener('submit', function(e) {
        e.preventDefault();
        player1 = Player(player1CpuInput.value, 'x');
        player2 = Player('CPU', 'o');
        gameControl.setCurrentPlayer(player1);
        gameControl.setPlayingWithCpu();
        player1CpuInput.value = '';
        intro.classList.add('hide-intro');
        playerVsCpuForm.classList.remove('show-form');
    
        gameContainer.classList.add('show-game-container');
    })
    
    gameContainer.addEventListener('click', gameControl.playRound);
    
    playerVsPlayer.addEventListener('click', function(){
        if ([...playerVsPlayerForm.classList].includes('show-form')) {
            playerVsPlayerForm.classList.remove('show-form');
        } else {
            if ([...playerVsCpuForm.classList].includes('show-form')) {
                playerVsCpuForm.classList.remove('show-form');
            } 
            playerVsPlayerForm.classList.add('show-form');
        }
    });
    
    playerVsCpu.addEventListener('click', function(){
        if ([...playerVsCpuForm.classList].includes('show-form')) {
            playerVsCpuForm.classList.remove('show-form');
        } else {
            if ([...playerVsPlayerForm.classList].includes('show-form')) {
                playerVsPlayerForm.classList.remove('show-form');
            }
            playerVsCpuForm.classList.add('show-form');
        }
    });
    
    displayBox.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            gameControl.reset();
            gameContainer.classList.toggle('show-game-container');
            displayBox.classList.toggle('show-display');
        }
    })
    
    gameControl.buildGame();
})()