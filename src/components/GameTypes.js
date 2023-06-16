import React from 'react';
import './GameTypes.css'

function GameTypes({ changeTimeFormat, filter }) {
  return (
    <div className='containerGameTypes'>
        <div className='labelForGameType'>
            <h2>Pick a time control: </h2>
        </div>
        <div className='gametype'>
            {filter.timeFormat==='bullet'
            ?<button id='isclicked' className='isclicked button-35' value="bullet" onClick={(e)=>changeTimeFormat(e)}>bullet</button>
            :<button className='button-35' value="bullet" onClick={(e)=>changeTimeFormat(e)}>bullet</button>
          }
        </div>
        <div className='gametype'>
            {filter.timeFormat==='blitz'
            ?<button id='isclicked' className='isclicked button-35' value="blitz" onClick={(e)=>changeTimeFormat(e)}>blitz</button>
            :<button className='button-35' value="blitz" onClick={(e)=>changeTimeFormat(e)}>blitz</button>
          }
        </div>
        <div className='gametype'>
            {filter.timeFormat==='rapid'
            ?<button id='isclicked' className='isclicked button-35' value="rapid" onClick={(e)=>changeTimeFormat(e)}>rapid</button>
            :<button className='button-35' value="rapid" onClick={(e)=>changeTimeFormat(e)}>rapid</button>
          }
        </div>
        <div className='gametype'>
            {filter.timeFormat==='daily'
            ?<button id='isclicked' className='isclicked button-35' value="daily" onClick={(e)=>changeTimeFormat(e)}>daily</button>
            :<button className='button-35' value="daily" onClick={(e)=>changeTimeFormat(e)}>daily</button>
          }
        </div>
    </div>
  )
}

export default GameTypes;