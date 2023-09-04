import React from 'react'
const FlagsCounter = ({ flagsLeft }) => {
  return (

    <div className='text-4xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  '>{flagsLeft}⚑</div>
  )
}

export default FlagsCounter
