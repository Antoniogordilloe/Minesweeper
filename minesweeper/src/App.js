import './App.css';
import { useState } from 'react';
import smiley from './smiley.png';
import sadSmiley from './sadSmiley.png';

const numRows = 10;
const numCols = 10;
const TOTAL_BOMBS = 10;

function selectAllBombs(board) {
  const updatedBoard = board.map(row =>
    row.map(cell =>
      cell.hasBomb ? { ...cell, isSelected: true } : cell
    )
  );

  return updatedBoard;
}

const Square = ({ isSelected, minesAround, hasBomb, updateBoard, row, col ,setGameOver,gameOver, setSmileyMood}) => {
  const className = `square ${isSelected ? 'is-selected' : ''} 
  ${hasBomb && isSelected ? 'has-bomb' : ''}`


  let cellDisplay = '';

  if (isSelected) {
    cellDisplay = minesAround;
    if (hasBomb) {
      cellDisplay = '*';
    }
  }

  const handleClick = () => {
    if(!gameOver){
    updateBoard(row, col);
    if (hasBomb) {
      setGameOver(true);
      setSmileyMood(sadSmiley)
    }
  }
  };

  return (
    <div onClick={handleClick} className={className}>
      {cellDisplay}
    </div>
  );
};

function createEmptyBoard() {
  const board = Array(numRows).fill(null).map(() => Array(numCols).fill({
    isSelected: false,
    minesAround: 0,
    hasBomb: false,
    flag: ''
  }));
  return board;
}

function addRandomBombs(board, TOTAL_BOMBS) {
  const boardWithBombs = board.map(row => row.map(cell => ({ ...cell })));
  let bombsLeft = TOTAL_BOMBS;

  while (bombsLeft > 0) {
    const randomRow = Math.floor(Math.random() * numRows);
    const randomCol = Math.floor(Math.random() * numCols);

    if (!boardWithBombs[randomRow][randomCol].hasBomb) {
      boardWithBombs[randomRow][randomCol].hasBomb = true;
      bombsLeft--;
    }
  }

  return boardWithBombs;
}

function addMinesAround(board) {
  const numRows = board.length;
  const numCols = board[0].length;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (!board[row][col].hasBomb) {
        let minesCount = 0;

        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;

            if (
              newRow >= 0 &&
              newRow < numRows &&
              newCol >= 0 &&
              newCol < numCols &&
              board[newRow][newCol].hasBomb
            ) {
              minesCount++;
            }
          }
        }

        board[row][col].minesAround = minesCount;
      }
    }
  }

  return board;
}

function App() {

  const [smileyMood,setSmileyMood] = useState((smiley))
  const [gameOver, setGameOver] = useState((false))

  const [board, setBoard] = useState(() => {
    let initialBoard = createEmptyBoard();
    const boardWithBombs = addRandomBombs(initialBoard, TOTAL_BOMBS);
    const boardwithBombsAround = addMinesAround(boardWithBombs)
    return boardwithBombsAround;
  });

  const updateBoard = (row, col) => {
    const newBoard = board.map((rowArr, rowIndex) =>
      rowArr.map((square, colIndex) =>
        rowIndex === row && colIndex === col
          ? { ...square, isSelected: true }
          : square
      )
    );
    setBoard(newBoard);

    if (board[row][col].hasBomb) {
      setBoard(selectAllBombs(newBoard));
      setGameOver(true)

    }
  };

  return (
    <main className='board'>
      <h1>Buscaminas</h1>
      <img src={smileyMood} alt='Smiley' />
      <section className='game'>
        {board.map((rowArr, rowIndex) => {
          return rowArr.map((square, colIndex) => (
            <Square
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              isSelected={square.isSelected}
              minesAround={square.minesAround}
              hasBomb={square.hasBomb}
              updateBoard={updateBoard}
              setGameOver={setGameOver}
              gameOver={gameOver}
              setSmileyMood={setSmileyMood}
            />
          ));
        })}
      </section>
    </main>
  );
}

export default App;