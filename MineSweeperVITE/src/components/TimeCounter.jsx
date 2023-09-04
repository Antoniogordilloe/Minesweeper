import React, { useEffect } from 'react'

const TimeCounter = ({ gameOver, gameHasStarted, timePassed, setTimePassed }) => {
  useEffect(() => {
    const calculateTimePassed = () => {
      if (timePassed > 999) {
        setTimePassed('∞')
      } else if (gameHasStarted && !gameOver) {
        setTimePassed((prevTime) => prevTime + 1)
      }
    }
    const intervalId = setInterval(calculateTimePassed, 1000)
    return () => clearInterval(intervalId)
  }, [gameHasStarted, gameOver])

  return <div className='text-4xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 '>{timePassed}''</div>
}

export default TimeCounter
