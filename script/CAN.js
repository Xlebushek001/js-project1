let currentPlayer = 'X';  // Ставим кто будет ходить первым
let gameBoard = ['', '', '', '', '', '', '', '', ''];  //игровое поле
let gameActive = true;  //игра не окончена

function handlePlayerTurn(clickedCellIndex) {
  if (gameBoard[clickedCellIndex] !== '' || !gameActive) {  // Проверка на завершенность игры и заполнена ли ячейка
      return;
  }
  gameBoard[clickedCellIndex] = currentPlayer;  // делаем ход
  checkForWinOrDraw();  // Проверка на результат игры
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function cellClicked(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.id.replace('cell-', '')) - 1;  //id ячейки
  if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
      return;
  }
  handlePlayerTurn(clickedCellIndex);
  updateUI();
}

const cells = document.querySelectorAll('.cell');  // Выбираем все ячейки игрового поля.

cells.forEach(cell => {
  cell.addEventListener('click', cellClicked, false); // Делаем ячейки кликабельными
});

function updateUI() {
  for (let i = 0; i < cells.length; i++) {
      cells[i].innerText = gameBoard[i];
  }
}

function announceWinner(player) {
  const messageElement = document.getElementById('gameMessage');
  messageElement.innerText = `Игрок играющий за ${player} победил!`;  // Отображаем сообщение о победителе
}

function announceDraw() {
  const messageElement = document.getElementById('gameMessage');
  messageElement.innerText = 'Ничья!';  // Отображаем сообщение о ничьей
}

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];  // Определяем условия победы для игрового поля

function checkForWinOrDraw() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];

      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {  // Проверяем, совпадают ли символы в ячейках a, b и c
          roundWon = true;  // Если условие победы выполняется, устанавливаем переменную roundWon в true
          break;
      }
  }

  if (roundWon) {
      announceWinner(currentPlayer);  // Если раунд выигран, вызываем функцию announceWinner с текущим игроком в качестве аргумента
      gameActive = false;  // Завершаем игру
      return;
  }

  let roundDraw = !gameBoard.includes('');  // Проверяем, заполнено ли игровое поле, указывая на ничью

  if (roundDraw) {
      announceDraw();  // Если ничья, вызываем функцию announceDraw
      gameActive = false;  // Устанавливаем состояние игры как неактивное
      return;
  }
}

// Обнуляем все параметры
function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';

  cells.forEach(cell => {
      cell.innerText = '';
  });

  document.getElementById('gameMessage').innerText = '';
}

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame, false);
