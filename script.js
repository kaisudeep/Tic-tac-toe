const cells = document.querySelectorAll('.cell');
let turn = 'X';
let isGameOver = false;

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
        [0, 4, 8], [2, 4, 6]             // diagonal
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a].textContent === cells[b].textContent && 
            cells[b].textContent === cells[c].textContent && 
            cells[a].textContent !== '') {
            isGameOver = true;
            document.querySelector("#results").innerHTML = turn + " wins!";
            saveResult("Player " + turn + " wins");
            return;
        }
    }

    // Check for draw
    if ([...cells].every(cell => cell.textContent !== '') && !isGameOver) {
        document.querySelector("#results").innerHTML = "Draw";
        saveResult("Draw");
    }
}

function saveResult(result) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "save_result.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("result=" + encodeURIComponent(result));
}

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (isGameOver || cell.textContent !== '') return;

        cell.textContent = turn;
        checkWinner();
        turn = turn === 'X' ? 'O' : 'X';
    });
});

document.querySelector("#play-again").addEventListener('click', () => {
    cells.forEach(cell => cell.textContent = '');
    isGameOver = false;
    turn = 'X';
    document.querySelector("#results").innerHTML = '';
});
