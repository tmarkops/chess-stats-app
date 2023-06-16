import React from 'react';
import './ColorPicker.css'

function GameTypes({ changeColorPicker, filter }) {
  return (
    <div className='containerColorPicker'>
      <div className='labelForColorPicker'>
            <h2>Pick a color: </h2>
        </div>
        <div className='colorbutton'>
          {filter.color==='white'
            ?<button id='isclicked' className='isclicked button-35' value="white" onClick={(e)=>changeColorPicker(e)}>white</button>
            :<button className='button-35' value="white" onClick={(e)=>changeColorPicker(e)}>white</button>
          }
        </div>
        <div className='colorbutton'>
            {filter.color==='black'
            ?<button id='isclicked' className= 'button-35' value="black" onClick={(e)=>changeColorPicker(e)}>black</button>
            :<button className='button-35' value="black" onClick={(e)=>changeColorPicker(e)}>black</button>
          }
        </div>
        <div className='colorbutton'>
            {filter.color==='cumulative'
            ?<button id='isclicked' className='isclicked button-35' value="cumulative" onClick={(e)=>changeColorPicker(e)}>cumulative</button>
            :<button className='button-35' value="cumulative" onClick={(e)=>changeColorPicker(e)}>cumulative</button>
          }
        </div>
    </div>
  )
}

export default GameTypes;

