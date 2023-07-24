const Smiley = ({ smileyMood, newGame }) => {
  return (
    <div className='smiley' onClick={() => newGame()}><img src={smileyMood} alt='Smiley' /></div>
  )
}

export default Smiley
