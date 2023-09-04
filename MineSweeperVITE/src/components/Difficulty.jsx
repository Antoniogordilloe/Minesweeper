/* import './/Components.css' */

import './index.css'

import React from 'react'
const Difficulty = ({

  setGameDifficulty

}) => {
  return (

    <div>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  md:h-10 md:w-30' onClick={() => setGameDifficulty('easy')}>Easy</button>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  md:h-10 md:w-30' onClick={() => setGameDifficulty('medium')}>Medium</button>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  md:h-10 md:w-30' onClick={() => setGameDifficulty('expert')}>Expert</button>
    </div>

  )
}

export default Difficulty
