import React from 'react';
import './TotalGamesDisplay.css'


function TotalGamesDisplay({cumulativeData}) {
    
  let totalGames = 0;

  Object.keys(cumulativeData.games_by_time).forEach((key)=>{
    Object.values(cumulativeData.games_by_time[key]).forEach((val)=>totalGames+=val);
  }); 

  return (
    <div className='circle'>
      {/* Total games played:  */}
      {/* <br/> */}
      <span id='totalgames'>{totalGames}</span>
      <br/>
      {(totalGames===1)? 'game played' : 'games played'} 
    </div>
  )
}

export default TotalGamesDisplay;