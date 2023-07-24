import './/Components.css'

const Difficulty = ({

  setGameDifficulty

}) => {
  return (

    <div>
      <button className='buttons' onClick={() => setGameDifficulty('easy')}>Easy</button>
      <button className='buttons' onClick={() => setGameDifficulty('medium')}>Medium</button>
      <button className='buttons' onClick={() => setGameDifficulty('expert')}>Expert</button>
      <button className='buttons' onClick={() => setGameDifficulty('legend')}>Legend</button>
    </div>

  )
}

export default Difficulty

