document.addEventListener('DOMContentLoaded', () => {
    const board = Array(9).fill(null);
    const cells = document.querySelectorAll('.cell');
            const statusDiv = document.getElementById('status');
    const statusDiv2 = document.getElementById('status2');
    // const popup = document.getElementById("notifyDiv");
    const resetButton = document.getElementById('resetButton');
    let isXTurn = true;
    let isGameActive = true;
    

//     function closePopUp(){
//         popup.style.display = "none";
//     }

// function openPopUp(){
//     popup.style.display = "block";
// }


    const xImg = '../img/X-key.png';
    const oImg = '../img/O-key.png';
    statusDiv.style.color = "rgb(253, 6, 58)";
    
     const winningCombinations = [
        [0, 1, 2],
           [3, 4, 5],
           [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
          [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWinner = () => {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return board.includes(null) ? null : 'Tie';
    };

    const handleClick = (e) => {
        const index = e.target.getAttribute('data-index');
        if (!board[index] && isGameActive) {
            board[index] = isXTurn ? 'X' : 'O';
            const img = document.createElement('img');
            img.src = isXTurn ? xImg : oImg;
                 e.target.appendChild(img);
            img.style.display = 'block';

            const winner = checkWinner();
            if (winner) {
                isGameActive = false;
                statusDiv.textContent = winner === 'Tie' ? "Match tie !..." : `${winner}    wins!`;
                      statusDiv2.textContent = winner === 'Tie' ? "Match tie !..." : `${winner} wins!`;
                // statusDiv.style.color = winner === 'Tie' ? "rgb(233, 233, 5)" : "rgb(147, 223, 8)";

            } else {
                isXTurn = !isXTurn;
                       statusDiv.textContent = `Turn = Player ${isXTurn ? '1 (X)' : '2 (O)'}`;
            }

            if(isXTurn){
                statusDiv.style.color = "rgb(253, 6, 58)";
                }
                else{
                            statusDiv.style.color = "rgb(51, 176, 223)";
                }
                

        }
    };

    const resetGame = () => {
        board.fill(null);
           isXTurn = true;
          isGameActive = true;
           statusDiv.textContent = `Turn = Player1 (X)`;
        cells.forEach(cell => {
            cell.innerHTML = '';
        });
    };

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });

    resetButton.addEventListener('click', resetGame);

    statusDiv.textContent = `Turn = Player1 (X)`;
});
