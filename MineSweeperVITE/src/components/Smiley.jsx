import React, { useState, useEffect } from 'react'
import smiley from './smiley.png'
import happySmiley from './happySmiley.png'
import sadSmiley from './sadSmiley.png'

const Smiley = ({ smileyMoodProp, newGame }) => {
  const [smileyMood, setSmileyMood] = useState('😐')

  useEffect(() => {
    if (smileyMoodProp === 'happy') {
      setSmileyMood('😁')
    } else if (smileyMoodProp === 'sad') {
      setSmileyMood('💀')
    } else if (smileyMoodProp === 'neutral') {
      setSmileyMood('😐')
    }
  }, [smileyMoodProp])

  return (
    <div className='flex justify-center text-5xl bg-white text-white font-bold py-2 px-4 cursor-pointer hover:bg-yellow-300 ' onClick={() => newGame()}>
      <div alt='Smiley'>{smileyMood} </div>
    </div>
  )
}
export default Smiley
