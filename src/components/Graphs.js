import React from 'react'
import WinsByTimeGraph from './WinsByTimeGraph';
import './Graphs.css';
import TotalGamesDisplay from './TotalGamesDisplay';
import WinPercentageDisplay from './WinPercentageDisplay';

function Graphs({ chessgames, cumulativeData }) {
  return (
    <div className='container'>
        <div className='winDonuts'>
          <div id='totalgamesdisplay'>
            <TotalGamesDisplay cumulativeData={cumulativeData} />
          </div>
          <div id="winpercentage">
            <WinPercentageDisplay cumulativeData={cumulativeData} />
          </div>
        </div>
        <div className='winsGraph'>
          <WinsByTimeGraph chessgames={chessgames} cumulativeData={cumulativeData}/>
        </div>
    </div>
  )
}

export default Graphs;
