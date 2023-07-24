import React from 'react'
import smiley from './smiley.png'
import happySmiley from './happySmiley.png'
import sadSmiley from './sadSmiley.png'
import { useState,useEffect } from 'react'
 
const Smiley = ({ smileyMoodProp, newGame }) => {
  const [smileyMood, setSmileyMood] = useState(':|');

  useEffect(() => {
    if (smileyMoodProp === 'happy') {
      setSmileyMood(':)');
    } else if (smileyMoodProp === 'sad') {
      setSmileyMood(':(');
    } else if (smileyMoodProp === 'neutral') {
      setSmileyMood(':|');
    }
  }, [smileyMoodProp]); 

  return (
    <div className='smiley' onClick={() => newGame()}>
      <div alt='Smiley'>{smileyMood} </div>
    </div>
  );
};
export default Smiley
