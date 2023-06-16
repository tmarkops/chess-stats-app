import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


function WinsByBlackDonut({cumulativeData}) {
    ChartJS.register(ArcElement, Tooltip, Legend);

    // set default chart color to black
    ChartJS.defaults.color = '#000'

    const getFilteredData = () => {
      let wins = 0;
      let losses = 0;
      let draws = 0;

      Object.keys(cumulativeData.games_by_time).forEach((key)=>{
        wins += cumulativeData.games_by_time[key].win;
        losses += cumulativeData.games_by_time[key].loss;
        draws += cumulativeData.games_by_time[key].draw;
    });
      return [wins,losses,draws];

    }
    
    const labels = Object.keys(cumulativeData.games_by_time.morning)
    let data = {
        labels,
        datasets: [
          {
            label: 'frequency',
            data: getFilteredData(),
            backgroundColor: [
                'rgba(127,166,80,255)',
                '#a650a1',
                '#507fa6'
            ],
            borderColor: [
                'rgba(127,166,80,255)',
                '#a650a1',
                '#507fa6'
            ],
            borderWidth: 1,
          },
        ],
      };

      const winPercent = (data) => {
        const wins = data.datasets[0].data[0]
        const losses = data.datasets[0].data[1]
        const draws = data.datasets[0].data[2]
        return Math.round(100*wins/(wins+losses+draws))
  
      }
  
      const options = {
        cutout: '70%',
        plugins: {
          title: {
            display: true,
            maintainAspectRatio: true,
            text: 'Win Percentage',
            font: function (context){
                  let width = context.chart.width;
                  let size = Math.round(width/9);
                  return {
                      weight: 'bold',
                      size: size
                  };
                }
          },
          legend: {
            position: 'right',
            maintainAspectRatio: true,
            display: ((winPercent(data))? true : false),
            labels: {
              font: function (context){
                let width = context.chart.width;
                let size = Math.round(width/18);
                return {
                    weight: 'bold',
                    size: size
                };
              },
              boxWidth: function (context){
                let width = context.chart.width;
                let size = Math.round(width/12);
                return size;
              },
            }
          }
        }
      }

      const textCenter = {
        id : "textCenter",
        beforeDatasetsDraw(chart, args, pluginOptions){
          const { ctx, data} = chart;
          let fontSize = (chart.height/150).toFixed(2);
          ctx.save();
          ctx.font = `bolder ${fontSize}em sans-serif`;
          ctx.fillStyle = 'green';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(
            ((winPercent(data)) ? (`${winPercent(data)}%`): "No games played"), 
            chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
        }
  
      }

  return (
    <div>
        <Doughnut options={options} data={data} plugins={[textCenter]} />
    </div>
  )
}

export default WinsByBlackDonut;