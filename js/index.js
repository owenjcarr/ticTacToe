const Player = (name, marker) => {
    return { name, marker };
};

const displayController = (() => {
    const game = document.querySelector("#game-container");
    const display = document.querySelector("#display");

    const enterPlayer = (marker) => {
        let prompt = document.createElement("div");
        prompt.innerHTML = `Enter Player ${marker}`;
        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Name";
        input.id = "name";
        let button = document.createElement("button");
        button.textContent = "Submit";
        button.onclick = (marker) => {
            let name = document.querySelector('#name').value;
            return Player(name, marker)
        }

        start.append(prompt, input, button);
    }


    function play(e) {
        if (e.target.className === "square" && gameBoard.board[e.target.id] === "") {
            gameBoard.playRound(e.target.id);
        }
    }

    const resetGame = () => {
        updateBoard(gameBoard.board);
        displayController.listener();
        display.innerHTML = "";
    };

    const setupGame = () => {
        // sets up the game
        for (let i = 0; i < 9; i++) {
            let square = document.createElement("div");
            square.id = i;
            square.className = "square";
            game.append(square);
        }

        listener();
    };

    let listener = () => {
        game.addEventListener("click", play);
    }

    // updates board from array
    let updateBoard = (board) => {
        for (let i = 0; i < 9; i++) {
            square = document.getElementById(i);
            square.innerHTML = board[i];
        }
    };

    let displayWinner = (winner) => {
        display.innerHTML = `${winner} wins!`
        game.removeEventListener("click", play);
    };

    let displayDraw = () => {
        display.innerHTML = 'Draw!';
        game.removeEventListener("click", play);
    };


    return { setupGame, updateBoard, displayWinner, displayDraw, enterPlayer, resetGame, listener };
})();

const gameBoard = (() => {
    const resetBtn = document.querySelector("#reset");

    let board = ["", "", "", "", "", "", "", "", ""];
    let isOver = false;

    p1 = Player("X", "X");
    p2 = Player("O", "O");

    displayController.setupGame();

    let checkWinner = (marker) => {
        if (board[0] === marker && board[1] === marker && board[2] === marker) {
            return true;
        } else if (
            board[3] === marker &&
            board[4] === marker &&
            board[5] === marker
        ) {
            return true;
        } else if (
            board[6] === marker &&
            board[7] === marker &&
            board[8] === marker
        ) {
            return true;
        } else if (
            board[0] === marker &&
            board[3] === marker &&
            board[6] === marker
        ) {
            return true;
        } else if (
            board[1] === marker &&
            board[4] === marker &&
            board[7] === marker
        ) {
            return true;
        } else if (
            board[2] === marker &&
            board[5] === marker &&
            board[8] === marker
        ) {
            return true;
        } else if (
            board[0] === marker &&
            board[4] === marker &&
            board[8] === marker
        ) {
            return true;
        } else if (
            board[2] === marker &&
            board[4] === marker &&
            board[6] === marker
        ) {
            return true;
        } else {
            return false;
        }
    };

    let turnController = true;
    let marks = 1;

    let playRound = (target) => {
        if (turnController) {
            board[target] = p1.marker;
            if (checkWinner(p1.marker)) {
                displayController.updateBoard(board);
                displayController.displayWinner(p1.name);
                return;
            };
            turnController = !turnController;
        } else {
            board[target] = p2.marker;
            if (checkWinner(p2.marker)) {
                displayController.updateBoard(board);
                displayController.displayWinner(p2.name);
                return;
            };
            turnController = !turnController;
        }

        displayController.updateBoard(board);

        if (marks === 9) {
            displayController.displayDraw();
            return;
        }

        marks++;
    }

    let reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
        marks = 1;
        turnController = true;
        displayController.resetGame();
    }

    resetBtn.onclick = () => {
        reset();
    };

    return { reset, playRound, board, isOver };

})();
