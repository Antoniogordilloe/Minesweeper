import React from 'react'
import './/Components.css'

const Square = ({
  row, column,
  handleSquareDisplay,
  handleSquareClassName,
  handleSquareLeftClicked,
  handleSquareRightClicked,
  dataTestId
}) => {
  const className = handleSquareClassName(row, column)
  const cellDisplay = handleSquareDisplay(row, column)

  const handleLeftClick = () => {
    handleSquareLeftClicked(row, column)
  }

  const handleRightClick = (event) => {
    handleSquareRightClicked(row, column)
    event.preventDefault()
  }



  return (
<div
  onContextMenu={handleRightClick}
  onClick={handleLeftClick}
  class={`${
    className
  } w-full md:w-1/2 lg:w-1/3 p-2 md:p-4 lg:p-6 text-center text-xl md:text-2xl lg:text-3xl overflow-hidden`}
  data-testid={dataTestId}
>
  <div class="whitespace-nowrap overflow-ellipsis">
    {cellDisplay}
  </div>
</div>

  )
}

export default Square
