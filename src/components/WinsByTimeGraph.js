import React from 'react';
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';



function WinsByTimeGraph({ chessgames, cumulativeData}) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );
    
    
    const options = {
        plugins: {
        title: {
            display: true,
            text: 'Result vs Time of Day',
            font: {
              size: 35
            }
        },
        legend:{
          position: 'right'
        }
        },
        responsive: true,
        interaction: {
        mode: 'index',
        intersect: false
        },
        scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
          title: {
            display: true,
            text: 'Number of Games',
            padding: 10,
            font: {
              size: 15
            }
          }
        },
        },
    };

    const getStats = (result, obj) => {
        let arr = [];
        let keys = Object.keys(obj);
        keys.forEach((key)=>{
            arr.push(obj[key][result]);
        })
        return arr;
    }

    const labels = Object.keys(cumulativeData.games_by_time);

    const data = {
        labels,
        datasets: [
          {
            label: 'Win',
            data: getStats('win',cumulativeData.games_by_time),
            backgroundColor: 'rgba(127,166,80,255)',
            stack: 'Stack 0',
          },
          {
            label: 'Loss',
            data: getStats('loss',cumulativeData.games_by_time),
            backgroundColor: '#a650a1',
            stack: 'Stack 1',
          },
          {
            label: 'Draw',
            data: getStats('draw',cumulativeData.games_by_time),
            backgroundColor: '#507fa6',
            stack: 'Stack 2',
          },
        ],
      };
    return (
    <div><Bar options={options} data={data} /></div>
    )
}

export default WinsByTimeGraph;