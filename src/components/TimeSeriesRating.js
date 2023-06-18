import React from 'react';
import {
    Chart as ChartJS,
    TimeScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from "react-chartjs-2";
import { milliseconds, millisecondsInHour, monthsInQuarter } from 'date-fns';
import {de} from 'date-fns/locale';
import zoomPlugin from 'chartjs-plugin-zoom';




ChartJS.register(
    TimeScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin
);

// I can also pass the currentColorState and display only white or only black or both 
// I can also pass the result of each game, and if its a win it will be a green dot vs  red dot
function TimeSeriesRating({ cumulativeData }) {

    // console.log(cumulativeData.map((game)=>Object.keys(game)[0]));

    // data must be in this format: [ {timedata in ms since 1970: value},...]
    

    const data = {
        labels : (cumulativeData.length === 0 ? [] : cumulativeData.map((game)=>{
            let strDate = Object.keys(game)[0];
            let intDate = parseInt(strDate)
            return intDate;
        })
        ),
        datasets: [
            {
                label: "Rating",
                data: (cumulativeData.length === 0 ? [] :cumulativeData.map((game)=>Object.values(game)[0])),
                // backgroundColor: 'aqua',
                borderColor: 'black',
                // tension: 1,
                pointBackgroundColor: cumulativeData.length === 0 ? 'aqua' :function(context) {
                    var index = context.dataIndex;
                    var curResult = cumulativeData[index].result;
                    if (curResult==='win'){
                        return 'green';
                    }else if(curResult==='loss'){
                        return 'red';
                    }else{
                        return 'blue';
                    }
                }
            }
        ]
    }


    const options = {
        scales: {
            y: {

            },
            x: {
                adapters: {
                    date: {
                        locale: de
                    }
                },
                type: 'time',
                time: {
                    // unit: 'millisecond',
                    format: 'timeFormat',
                    // round: 'second'
                },
                ticks: {
                    source: 'auto'
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: "Rating over Time",
                font: {
                    size: 35
                  }
            },
            zoom: {
                zoom: {
                  wheel: {
                    enabled: true,
                  },
                  pinch: {
                    enabled: true
                  },
                  mode: 'xy',
                  drag: {
                    enabled: true
                  }
                },
                limits: {
                    x: {min: 'original', max: 'original'},
                    y: {min: 'original', max: 'original'}
                },
                pan: {
                    // enabled: 'True'
                }
            },
            legend: {
                display: false
            }
        }
    }

    




  return (
    <>
        <div>
            <Line 
            data={data}
            options={options}/>
        </div>
    </>
  )
}

export default TimeSeriesRating;