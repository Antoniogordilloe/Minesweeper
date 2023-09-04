import React, { useState, useEffect } from 'react'
/* import './App.css' */
import './index.css'

import Square from './components/Square'
import Smiley from './components/Smiley'
import FlagsCounter from './components/FlagsCounter'
import TimeCounter from './components/TimeCounter'
import Difficulty from './components/Difficulty'

let numberOfColumns = 10
let numberOfRows = 10
let TOTAL_MINES = 10
let smileyMoodProp = 'smiley'

let gridClass = ''

const RANDOM_IMAGE_PREFIX = 'https://picsum.photos/1920/1080'
const POEM_BY_ID_PREFIX = 'https://api-thirukkural.vercel.app/api?num='

function App () {
  const [gameHasStarted, setGameHasStarted] = useState(false)
  const [timePassed, setTimePassed] = useState(0)

  const [gameOver, setGameOver] = useState((false))
  const [flagsLeft, setFlagsLeft] = useState((10))
  const [board, setBoard] = useState(() => {
    calculateGridClass()
    const initialBoard = createEmptyBoard()
    const boardWithMines = addRandomMines(initialBoard, TOTAL_MINES)
    const boardwithMinesAround = addCounterOfMinesAround(boardWithMines)
    return boardwithMinesAround
  })

  function calculateGridClass () {
    if (numberOfColumns === 10) {
      gridClass = 'grid grid-cols-10'
    }
    if (numberOfColumns === 16) {
      gridClass = 'grid grid-cols-16'
    }
    if (numberOfColumns === 30) {
      gridClass = 'grid grid-cols-30'
    }
    if (numberOfColumns === 50) {
      gridClass = 'grid grid-cols-50'
    }

    return gridClass
  }

  function setGameDifficulty (level) {
    if (level === 'easy') {
      numberOfColumns = 10
      numberOfRows = 10
      TOTAL_MINES = 10
    }
    if (level === 'medium') {
      numberOfColumns = 16
      numberOfRows = 16
      TOTAL_MINES = 40
    }
    if (level === 'expert') {
      numberOfColumns = 30
      numberOfRows = 16
      TOTAL_MINES = 99
    }
    if (level === 'legend') {
      numberOfColumns = 50
      numberOfRows = 40
      TOTAL_MINES = 500
    }

    calculateGridClass()
    newGame()
  }

  function selectAllMines (board) {
    const updatedBoard = board.map(row =>
      row.map(square =>
        square.hasMine && square.flag != '⚑' ? { ...square, isSelected: true } : square
      )
    )
    return updatedBoard
  }

  function createEmptyBoard () {
    const board = Array(numberOfRows).fill(null).map(() => Array(numberOfColumns).fill({
      isSelected: false,
      minesAround: 0,
      hasMine: false,
      flag: '',
      exploded: false
    }))
    return board
  }

  function addRandomMines (board, TOTAL_MINES) {
    const boardWithMines = board.map(row => row.map(square => ({ ...square })))
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

  function addCounterOfMinesAround (board) {
    const numberOfRows = board.length
    const numberOfColumns = board[0].length

    const isValidsquare = (row, col) =>
      row >= 0 && row < numberOfRows && col >= 0 && col < numberOfColumns

    const countAdjacentMines = (row, col) => {
      let minesCount = 0
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue
          const newRow = row + i
          const newCol = col + j
          if (isValidsquare(newRow, newCol) && board[newRow][newCol].hasMine) {
            minesCount++
          }
        }
      }
      return minesCount
    }

    board.forEach((row, rowIndex) => {
      row.forEach((square, columnIndex) => {
        if (!square.hasMine) {
          square.minesAround = countAdjacentMines(rowIndex, columnIndex)
        }
      })
    })

    return board
  }

  function newGame () {
    setPoemBody('')
    setPoemTitle('')
    setPoemVirtue('')
    setPoemChapter('')
    const initialBoard = createEmptyBoard()
    const boardWithMines = addRandomMines(initialBoard, TOTAL_MINES)
    const boardwithMinesAround = addCounterOfMinesAround(boardWithMines)
    setBoard(boardwithMinesAround)

    smileyMoodProp = 'neutral'
    setGameOver(false)
    setFlagsLeft(TOTAL_MINES)
    setTimePassed(0)
    setGameHasStarted(false)
  }

  const selectSquare = (row, column) => {
    const updatedBoard = [...board]

    if (updatedBoard[row][column].hasMine) {
      updatedBoard[row][column].isSelected = true
      updatedBoard[row][column].exploded = true

      setBoard(selectAllMines(updatedBoard))
      setGameOver(true)
      setPoemBody('')
      setPoemTitle('')
      setPoemVirtue('')
      setImageUrl('https://assets-losspreventionmedia-com.s3.us-east-2.amazonaws.com/2023/03/apocalypse-1280x720-1.jpg')
      markAllWrongFlags(board)
    } else {
      fetchImageUrl()

      updatedBoard[row][column].isSelected = true
      if (updatedBoard[row][column].minesAround === 0) {
        selectAdjacentSquares(row, column, updatedBoard)
      }
      setBoard(updatedBoard)
    }
  }

  const addFlag = (row, column) => {
    const updatedBoard = [...board]
    const currentFlag = updatedBoard[row][column].flag
    let newFlag = ''

    if (currentFlag === '') {
      newFlag = '⚑'
      setFlagsLeft(flagsLeft - 1)
    } else if (currentFlag === '⚑') {
      newFlag = '?'
      setFlagsLeft(flagsLeft + 1)
    } else if (currentFlag === '?') {
      newFlag = ''
    }

    updatedBoard[row][column].flag = newFlag
    setBoard(updatedBoard)
  }

  function handleSquareDisplay (row, column) {
    const square = board[row][column]

    let squareDisplay = ''
    squareDisplay = square.minesAround

    if (square.isSelected) {
      if (square.hasMine) {
        squareDisplay = '💣'
      } else if (square.minesAround === 0) { squareDisplay = ' ' }
    } else {
      squareDisplay = square.flag
    }

    return squareDisplay
  }

  function handleSquareClassName (row, column) {
    const square = board[row][column]

    const baseClassName = 'flex justify-center  cursor-pointer box-content bg-blue-500 w-8 h-8 border-2 text-center text-2xl font-bold  hover:bg-yellow-300 '
    let className = baseClassName

    if (square.isSelected) {
      /* className = `${baseClassName} bg-white` */
      className = 'flex justify-center   box-content bg-white w-8 h-8 border-2 text-center text-2xl font-bold '
    }

    if (square.exploded) {
      /*  className = `${baseClassName} bg-red-600` */
      className = 'flex justify-center   box-content bg-red-600 w-8 h-8 border-2 text-center text-2xl font-bold  '
    }

    return className
  }

  function handleSquareLeftClicked (row, column) {
    setGameHasStarted(true)
    const square = board[row][column]
    if (!gameOver && !square.isSelected) {
      selectSquare(row, column)
      if (square.flag === '⚑') {
        setFlagsLeft(flagsLeft + 1)
      }
      if (square.hasMine) {
        setGameOver(true)
        smileyMoodProp = 'sad'
      }
    }
    checkWin()
  }

  function handleSquareRightClicked (row, column) {
    const square = board[row][column]
    if (!gameOver && !square.isSelected) {
      addFlag(row, column)
    }
  }

  function selectAdjacentSquares (row, column, board) {
    const directions = [
      { row: -1, column: 0 }, // Arriba
      { row: 1, column: 0 }, // Abajo
      { row: 0, column: -1 }, // Izquierda
      { row: 0, column: 1 }, // Derecha
      { row: -1, column: -1 }, // Arriba-Izquierda
      { row: -1, column: 1 }, // Arriba-Derecha
      { row: 1, column: -1 }, // Abajo-Izquierda
      { row: 1, column: 1 } // Abajo-Derecha
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
        !board[newRow][newColumn].hasMine &&
        !board[newRow][newColumn].flag != ''
      ) {
        board[newRow][newColumn].isSelected = true

        if (board[newRow][newColumn].minesAround === 0) {
          selectAdjacentSquares(newRow, newColumn, board)
        }
      }
    })
  }

  function checkWin () {
    const updatedBoard = [...board]
    let allNonMineSelected = true

    for (let row = 0; row < numberOfRows; row++) {
      for (let column = 0; column < numberOfColumns; column++) {
        const square = updatedBoard[row][column]
        if (!square.hasMine && !square.isSelected) {
          allNonMineSelected = false
          break
        }
      }
    }

    if (allNonMineSelected) {
      setBoard(flagAllMines(updatedBoard))
      setGameOver(true)
      smileyMoodProp = 'happy'
    }
  }

  function flagAllMines (board) {
    const updatedBoard = [...board]
    updatedBoard.map(row =>
      row.map(square => {
        if (square.hasMine) {
          square.flag = '!'
        }
      }
      )
    )
    return updatedBoard
  }

  function markAllWrongFlags (board) {
    const updatedBoard = [...board]
    updatedBoard.map(row =>
      row.map(square => {
        if (!square.hasMine && square.flag === '⚑') {
          square.flag = 'x'
        }
        if (!square.hasMine && square.flag === '?') {
          square.flag = ''
        }
      }
      )
    )
    return updatedBoard
  }

  const initializeGameBoard = () => {
    smileyMoodProp = 'neutral'
    setGameOver(false)
    setFlagsLeft(TOTAL_MINES)
    setTimePassed(0)
    setGameHasStarted(false)

    const input = document.getElementById('mockInput').value

    const rows = input.split('-')
    const numRows = rows.length
    const numCols = Math.max(...rows.map(row => row.length))

    const mockBoard = Array.from({ length: numRows }, (_, rowIndex) =>
      Array.from({ length: numCols }, (_, colIndex) => {
        const cellValue = rows[rowIndex].charAt(colIndex) || '-'
        return {
          isSelected: false,
          minesAround: 0,
          hasMine: cellValue === '*',
          flag: '',
          exploded: false
        }
      })
    )

    const numberOfRowsM = mockBoard.length
    const numberOfColumnsM = mockBoard[0].length

    const isValidsquare = (row, col) =>
      row >= 0 && row < numberOfRowsM && col >= 0 && col < numberOfColumnsM

    const countAdjacentMines = (row, col) => {
      let minesCount = 0
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue
          const newRow = row + i
          const newCol = col + j
          if (isValidsquare(newRow, newCol) && mockBoard[newRow][newCol].hasMine) {
            minesCount++
          }
        }
      }
      return minesCount
    }

    mockBoard.forEach((row, rowIndex) => {
      row.forEach((square, columnIndex) => {
        if (!square.hasMine) {
          square.minesAround = countAdjacentMines(rowIndex, columnIndex)
        }
      })
    })

    setBoard(mockBoard)
  }

  /* useEffect(() => {
      fetch(RANDOM_IMAGE_PREFIX)
        .then(response => {
          const { url } = response
          setImageUrl(url)
          fetchPoemById(extractIdFromImageUrl(url))
          console.log(url)
        })
    }, []) */

  // API learning
  const [imageUrl, setImageUrl] = useState()
  const [poemTitle, setPoemTitle] = useState()
  const [poemBody, setPoemBody] = useState()
  const [poemVirtue, setPoemVirtue] = useState()
  const [poemChapter, setPoemChapter] = useState()

  function fetchImageUrl () {
    fetch(RANDOM_IMAGE_PREFIX)
      .then(response => {
        const { url } = response
        setImageUrl(url)
        fetchPoemById(extractIdFromImageUrl(url))
      })
  }

  function fetchPoemById (id) {
    fetch(`${POEM_BY_ID_PREFIX}${id}`)
      .then(response => response.json())
      .then(poem => {
        setPoemChapter(poem.chap_eng)
        setPoemTitle(poem.eng)
        setPoemBody(poem.eng_exp)
        setPoemVirtue(poem.sect_eng)
      })
      .catch(error => {
        console.error('ERROR, couldnt fetch poem:', error)
      })
  }

  function extractIdFromImageUrl (url) {
    const regex = /id\/(\d+)\//
    const match = url.match(regex)

    if (match && match[1]) {
      return parseInt(match[1], 10)
    } else {
      return null
    }
  }

  return (

    <>
      <div className='bg-black'>

        <div className='h-screen flex items-center container mx-auto justify-center bg-cover  bg-center ' style={{ backgroundImage: `url(${imageUrl})` }}>

          <p className='mb-4 max-w-[100px] text-justify mx-2 p-1 overline bg-white'>{poemTitle}<p className='text-center'>☾</p></p>

          <div>

            <div className='flex items-center justify-center'>

              <div data-testid='app-container' className=' grid grid-cols-3  '>

                <TimeCounter
                  timePassed={timePassed}
                  setTimePassed={setTimePassed}
                  gameOver={gameOver}
                  gameHasStarted={gameHasStarted}
                />
                <Smiley newGame={newGame} smileyMoodProp={smileyMoodProp} />
                <FlagsCounter flagsLeft={flagsLeft} />

              </div>
            </div>
            <h1 className='flex justify-center text-xl bg-white'>🎕{poemChapter}🎕</h1>
            <h1 className='flex justify-center  bg-white'>{poemVirtue}</h1>

            <section className={gridClass} data-testid='board'>
              {board.map((rowArray, row) => {
                return rowArray.map((square, column) => (
                  <Square
                    key={`${row}-${column}`}
                    row={row}
                    column={column}
                    handleSquareDisplay={handleSquareDisplay}
                    handleSquareClassName={handleSquareClassName}
                    handleSquareLeftClicked={handleSquareLeftClicked}
                    handleSquareRightClicked={handleSquareRightClicked}
                    dataTestId={`square-${row}-${column}`}
                  />
                ))
              })}
            </section>
            <p className='flex justify-center bg-white'>· Antonio Gordillo 2023 ·</p>
            <div className='flex justify-center'>
              <Difficulty setGameDifficulty={setGameDifficulty} />

            </div>

            <div>

              {/*  <textarea id='mockInput' data-testid="mockInput"></textarea>
<button data-testid="submitMockdata" onClick={initializeGameBoard} className="font-bold py-2 px-4 rounded">Submit</button> */}

            </div>

          </div>

          <p className='mb-4 max-w-[100px] text-justify mx-2 p-1 overline bg-white '>{poemBody}<p className='text-center'>☼</p></p>

        </div>
      </div>
    </>

  )
}

export default App
