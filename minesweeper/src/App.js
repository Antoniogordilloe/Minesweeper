import './App.css'
import { useState } from 'react'
import smiley from './smiley.png'
import sadSmiley from './sadSmiley.png'

const numberOfRows = 10
const numberOfColumns = 10
const TOTAL_MINES = 10

function selectAllMines (board) {
  const updatedBoard = board.map(row =>
    row.map(cell =>
      cell.hasMine ? { ...cell, isSelected: true } : cell
    )
  )

  return updatedBoard
}

const Square = ({ isSelected, minesAround, hasMine, selectSquare, row, column, setGameOver, gameOver, setSmileyMood, flag, addFlag, setFlagsLeft, flagsLeft }) => {
  let cellDisplay = ''

  const className = `square ${isSelected ? 'is-selected' : ''} 
  ${hasMine && isSelected ? 'has-mine' : ''}`

  if (isSelected) {
    cellDisplay = minesAround
    if (hasMine) {
      cellDisplay = '*'
    } else if (minesAround === 0) { cellDisplay = ' ' }
  } else {
    cellDisplay = flag
  }

  const handleLeftClick = () => {
    if (!gameOver && !isSelected) {
      selectSquare(row, column)
      if (flag === '!') {
        setFlagsLeft(flagsLeft + 1)
      }
      if (hasMine) {
        setGameOver(true)
        setSmileyMood(sadSmiley)
      }
    }
  }

  const handleRightClick = (event) => {
    if (!gameOver) {
      addFlag(row, column)
    }
    event.preventDefault()
  }

  return (
    <div onContextMenu={handleRightClick} onClick={handleLeftClick} className={className}>
      {cellDisplay}
    </div>
  )
}

function createEmptyBoard () {
  const board = Array(numberOfRows).fill(null).map(() => Array(numberOfColumns).fill({
    isSelected: false,
    minesAround: 0,
    hasMine: false,
    flag: ''
  }))
  return board
}

function addRandomMines (board, TOTAL_MINES) {
  const boardWithMines = board.map(row => row.map(cell => ({ ...cell })))
  let minesLeft = TOTAL_MINES

  while (minesLeft > 0) {
    const randomRow = Math.floor(Math.random() * numberOfRows)
    const randomcolumn = Math.floor(Math.random() * numberOfColumns)

    if (!boardWithMines[randomRow][randomcolumn].hasMine) {
      boardWithMines[randomRow][randomcolumn].hasMine = true
      minesLeft--
    }
  }

  return boardWithMines
}

function addMinesAroundCounter (board) {
  const numberOfRows = board.length
  const numberOfcolumnumns = board[0].length

  for (let row = 0; row < numberOfRows; row++) {
    for (let column = 0; column < numberOfcolumnumns; column++) {
      if (!board[row][column].hasMine) {
        let minesCount = 0

        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newRow = row + i
            const newcolumn = column + j
            // Limites
            if (
              newRow >= 0 &&
              newRow < numberOfRows &&
              newcolumn >= 0 &&
              newcolumn < numberOfcolumnumns &&
              board[newRow][newcolumn].hasMine
            ) {
              minesCount++
            }
          }
        }

        board[row][column].minesAround = minesCount
      }
    }
  }

  return board
}

function App () {
  const [smileyMood, setSmileyMood] = useState((smiley))
  const [gameOver, setGameOver] = useState((false))
  const [flagsLeft, setFlagsLeft] = useState((10))

  const [board, setBoard] = useState(() => {
    const initialBoard = createEmptyBoard()
    const boardWithMines = addRandomMines(initialBoard, TOTAL_MINES)
    const boardwithMinesAround = addMinesAroundCounter(boardWithMines)
    return boardwithMinesAround
  })

  function newGame () {
    const initialBoard = createEmptyBoard()
    const boardWithMines = addRandomMines(initialBoard, TOTAL_MINES)
    const boardwithMinesAround = addMinesAroundCounter(boardWithMines)
    setSmileyMood(smiley)
    setGameOver(false)
    setBoard(boardwithMinesAround)
    setFlagsLeft(10)
  }

  const selectSquare = (row, column) => {
    const updatedBoard = [...board]

    if (updatedBoard[row][column].hasMine) {
      setBoard(selectAllMines(updatedBoard))
      setGameOver(true)
    } else {
      if (updatedBoard[row][column].minesAround === 0) {
        selectAdjacentSquares(row, column, updatedBoard)
      } else {
        updatedBoard[row][column].isSelected = true
      }
      setBoard(updatedBoard)
    }
  }

  const addFlag = (row, column) => {
    const updatedBoard = [...board]
    const currentFlag = updatedBoard[row][column].flag
    let newFlag = ''

    if (currentFlag === '') {
      newFlag = '!'
      setFlagsLeft(flagsLeft - 1)
    } else if (currentFlag === '!') {
      newFlag = '?'
      setFlagsLeft(flagsLeft + 1)
    } else if (currentFlag === '?') {
      newFlag = ''
    }

    updatedBoard[row][column].flag = newFlag
    setBoard(updatedBoard)
  }

  function selectAdjacentSquares (row, column, board) {
    const directions = [
      { row: -1, column: 0 }, // Arriba
      { row: 1, column: 0 }, // Abajo
      { row: 0, column: -1 }, // Izquierda
      { row: 0, column: 1 } // Derecha
    ]
    directions.forEach((direction) => {
      const newRow = row + direction.row
      const newColumn = column + direction.column
      if (
        newRow >= 0 &&
        newRow < numberOfRows &&
        newColumn >= 0 &&
        newColumn < numberOfColumns &&
        !board[newRow][newColumn].isSelected &&
        !board[newRow][newColumn].hasMine
      ) {
        board[newRow][newColumn].isSelected = true

        if (board[newRow][newColumn].minesAround === 0) {
          selectAdjacentSquares(newRow, newColumn, board)
        }
      }
    })
  }

  return (
    <main className='board'>
      <h1>Buscaminas</h1>
      <p>Flags:{flagsLeft}</p>
      <div className='smiley' onClick={() => newGame()}><img src={smileyMood} alt='Smiley' /></div>
      <section className='game'>
        {board.map((rowArray, row) => {
          return rowArray.map((square, column) => (
            <Square
              key={`${row}-${column}`}
              row={row}
              column={column}
              isSelected={square.isSelected}
              minesAround={square.minesAround}
              hasMine={square.hasMine}
              flag={square.flag}
              selectSquare={selectSquare}
              setGameOver={setGameOver}
              gameOver={gameOver}
              setSmileyMood={setSmileyMood}
              addFlag={addFlag}
              setFlagsLeft={setFlagsLeft}
              flagsLeft={flagsLeft}
            />
          ))
        })}
      </section>
    </main>
  )
}

export default App
