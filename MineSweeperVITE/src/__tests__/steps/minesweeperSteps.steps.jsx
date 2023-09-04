import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../../App.jsx'
import userEvent from '@testing-library/user-event'

const leftClickCell = async (row, column) => {
  await userEvent.click(screen.getByTestId('square' + '-' + row + '-' + column))
}

const rightClickCell = async (row, column) => {
  await fireEvent.contextMenu(screen.getByTestId('square' + '-' + row + '-' + column))
}

const getCell = (row, column) => {
  return screen.getByTestId('square' + '-' + row + '-' + column)
}

const getAllSquares = () => {
  return screen.getAllByTestId(/^square-/)
}

export const loadMockData = async (mockData) => {
  const text = screen.getByTestId('mockInput')
  const button = screen.getByTestId('submitMockdata')
  await userEvent.clear(text)
  await userEvent.type(text, mockData)
  await fireEvent.click(button)
}

export const minesweeper = ({
  given: Given,
  and: And,
  when: When,
  then: Then
}) => {
  Given(/^the player opens the game$/, () => {
    render(<App />)
  })

  Given(/^the player loads the following mock data:$/, async (docString) => {
    console.log(docString)
    await loadMockData(docString)
    await waitFor(() => expect(screen.getByTestId('board')).toBeInTheDocument())
  })

  Given(/^the player tags the \((\d+),(\d+)\) cell with a \('([^']+)'\)$/, async (row, column, tag) => {
    await rightClickCell(row, column)
    if (tag === '?') {
      await rightClickCell(row, column)
    }
  })

  When(/^the player left clicks the cell \((\d+),(\d+)\)$/, async (row, column) => {
    await leftClickCell(row, column)
  })

  When(/^the player right clicks the cell \((\d+),(\d+)\)$/, async (row, column) => {
    await rightClickCell(row, column)
  })

  When(/^the player uncovers the cell \((\d+),(\d+)\)$/, async (row, column) => {
    await leftClickCell(row, column)
  })

  Then(/^ the cell should be covered\((\d+),(\d+)\)$/, (row, column) => {
    const cell = getCell(row, column)
    expect(cell).not.toHaveClass('square is-selected')
  })

  Then(/^the cell should be uncovered \((\d+),(\d+)\)$/, (row, column) => {
    const cell = getCell(row, column)
    expect(cell).toHaveClass('square is-selected')
  })

  Then(/^all the cells should be covered$/, () => {
    const cells = getAllSquares()
    cells.forEach(cell => {
      expect(cell).not.toHaveClass('square is-selected')
    })
  })

  Then(/^all the cells should be uncovered$/, () => {
    const cells = getAllSquares()
    cells.forEach(cell => {
      expect(cell).toHaveClass('square is-selected')
    })
  })

  Then(/^all the cells should be enabled$/, () => {
    const cells = getAllSquares()
    cells.forEach(cell => {
      expect(cell).toHaveClass('square')
    })
  })

  Then(/^the \((\d+),(\d+)\) cell display should be \('([^']+)'\)$/, (row, column, display) => {
    const cell = getCell(row, column)
    expect(cell.textContent).toContain(display)
  })

  Then(/^the \((\d+),(\d+)\) cell display should show the following number \((\d+)\)$/, async (row, column, number) => {
    const cell = getCell(row, column)
    await waitFor(() => expect(cell.textContent).toContain(number))
  })

  /* Then(/^the \((\d+),(\d+)\) cell display should show the following number:$/, async (row, column, number) => {
    const cell = getCell(row, column);
    await expect(cell.textContent).toContain(number)
  }); */

  Then(/^the \((\d+),(\d+)\) cell display should be blank$/, (row, column) => {
    const cell = getCell(row, column)
    expect(cell.textContent).not.toContain('⚑')
    expect(cell.textContent).not.toContain('?')
  })
}

export default minesweeper
