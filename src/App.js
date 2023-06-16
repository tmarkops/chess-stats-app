import './App.css';
import React, { useEffect, useState } from "react";
import SearchBar from './components/SearchBar';
import Graphs from './components/Graphs';
import ColorPicker from './components/ColorPicker';
import GameTypes from './components/GameTypes';
import logo from './logo.webp';
import Loader from './components/Loader';

function App() {

  const [form, setForm] = useState({
    username: "",
    fromDate: "",
    toDate: ""
  })

  const [filter, setFilter] = useState({
    color: "cumulative",
    timeFormat: "bullet"
  })

  const [chessgames, setChessGames] = useState([])

  const [cumulativeData, setCumulativeData] = useState({
    bullet: {},
    blitz: {},
    rapid: {},
    daily: {}
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'username') {
        setForm({...form, username: value})
      }
    if (name === 'fromDate') {
      let date = new Date(value);
      date.setTime(date.getTime()+date.getTimezoneOffset()*60*1000);

      setForm({...form, fromDate: date});
    }
    if (name === 'toDate') {
      let date = new Date(value)
      date.setTime(date.getTime()+date.getTimezoneOffset()*60*1000);

      setForm({...form, toDate: date});
    }
  }



  async function changeTimeFormat(e){
    e.preventDefault();

    let newTimeFormat = e.target.value;

    setFilter({...filter, timeFormat: newTimeFormat});
  }

  async function changeColorPicker(e){
    e.preventDefault();

    let newColor = e.target.value;
    setFilter({...filter, color: newColor})
  }

  // function that takes date (month-year) as input and returns chess data
  async function getChessData(month, year){
    if (month === 12){
      month = 1;
      month = month.toString().padStart(2, '0');
    } else if(month >= 9 && month<12){
      month++;
    }else{
      month++;
      month = month.toString().padStart(2, '0')
    }
    setLoading(true);
    const response = await fetch(`https://api.chess.com/pub/player/${form.username}/games/${year}/${month}`);
    const data = await response.json();
    setLoading(false);
    return data;
  }

  // takes form data as input, and returns all chess data in range (calls getChessData function) 
  async function collectAllData(e){
    e.preventDefault();
    
    if(form.username === ""){
      alert("Please enter a username.");
    } else if(form.fromDate === "" || form.toDate === ""){
      alert("Please enter a valid date range.");
    }else{
      let begDate = new Date(form.fromDate);
      let endDate = new Date(form.toDate);
      let allData = [];
      const today = new Date();

      while ((begDate<=endDate) && begDate<= today){
        let curData = await getChessData(begDate.getMonth(), begDate.getFullYear());
        curData['games'].map((game)=>{
          let cleanGame = cleanData(game);
          return allData.push(cleanGame);
        });
        begDate.setMonth(begDate.getMonth()+1);
      }
      setChessGames(allData);
      setCumulativeData(oldState=>({...oldState, bullet: (getCumData(allData,'bullet'))}));
      setCumulativeData(oldState=>({...oldState, rapid: (getCumData(allData,'rapid'))}));
      setCumulativeData(oldState=>({...oldState, blitz: (getCumData(allData,'blitz'))}));
      setCumulativeData(oldState=>({...oldState, daily: (getCumData(allData,'daily'))}));
    }
    }



  // take raw game data as input and return clean data in js object
  // can add opening data by parsing game PNG 
  const cleanData = (rawGame) => {
    const draws = ["timevsinsufficient", "stalemate", "repetition", "agreed", "insufficient", "50move"];
    const losses = ["checkmated", "timeout", "resigned", "lose", "abandoned"];
    const cleanGame = {
      time: rawGame.end_time,
      opponent: "",
      opponent_rating: "",
      opponent_profile: "",
      result: "",
      url: rawGame.url,
      game_type: rawGame.time_class,
      color: "",
      rating: ""
    };
    if(rawGame.white.username === form.username){
      cleanGame.color = "white";
      cleanGame.rating = rawGame.white.rating;

      cleanGame.opponent = rawGame.black.username;
      cleanGame.opponent_rating = rawGame.black.rating;
      cleanGame.opponent_profile = rawGame.black["@id"];


      if (rawGame.white.result === "win"){
        cleanGame.result = "win";
      }else if(draws.includes(rawGame.white.result)){
        cleanGame.result = "draw"
      }else if(losses.includes(rawGame.white.result)){
        cleanGame.result = "loss"
      }
    } else{
      cleanGame.color = "black";
      cleanGame.rating = rawGame.black.rating;

      cleanGame.opponent = rawGame.white.username;
      cleanGame.opponent_rating = rawGame.white.rating;
      cleanGame.opponent_profile = rawGame.white["@id"];

      if (rawGame.black.result === "win"){
        cleanGame.result = "win";
      }else if(draws.includes(rawGame.black.result)){
        cleanGame.result = "draw"
      }else if(losses.includes(rawGame.black.result)){
        cleanGame.result = "loss"
      }
    }

    return cleanGame;
    
  }

  const getCumData = (cleanData, timeFormat) => {
    const cumData = {
      white: {
        games_by_time: {
            morning: {
            win: 0,
            loss: 0,
            draw: 0
            },
            afternoon: {
            win: 0,
            loss: 0,
            draw: 0
            },
            evening: {
            win: 0,
            loss: 0,
            draw: 0
            },
            night: {
            win: 0,
            loss: 0,
            draw: 0
            }
        }
      },
      black: {
        games_by_time: {
            morning: {
            win: 0,
            loss: 0,
            draw: 0
            },
            afternoon: {
            win: 0,
            loss: 0,
            draw: 0
            },
            evening: {
            win: 0,
            loss: 0,
            draw: 0
            },
            night: {
            win: 0,
            loss: 0,
            draw: 0
            }
        }
      },
      cumulative: {
        games_by_time: {
            morning: {
            win: 0,
            loss: 0,
            draw: 0
            },
            afternoon: {
            win: 0,
            loss: 0,
            draw: 0
            },
            evening: {
            win: 0,
            loss: 0,
            draw: 0
            },
            night: {
            win: 0,
            loss: 0,
            draw: 0
            }
        }
      }
    }
    cleanData.forEach((game)=>{
        const curColor = game.color
        const curResult = game.result;
        const curTime = new Date();
        curTime.setTime(game.time * 1000)

        const gameHour = (curTime.getHours());

        // cumData.games_by_color[game.color][curResult] ++;
        if (game.game_type === timeFormat){
          if (curColor === 'white'){
              if (gameHour >= 6 && gameHour <12){
                  cumData[curColor].games_by_time.morning[curResult] ++;
              } else if(gameHour >= 12 && gameHour <17){
                  cumData[curColor].games_by_time.afternoon[curResult] ++;
              } else if(gameHour >= 17 && gameHour <22){
                  cumData[curColor].games_by_time.evening[curResult] ++;
              } else {
                  cumData[curColor].games_by_time.night[curResult] ++;
              }
          } else{
              if (gameHour >= 6 && gameHour <12){
                  cumData[curColor].games_by_time.morning[curResult] ++;
              } else if(gameHour >= 12 && gameHour <17){
                  cumData[curColor].games_by_time.afternoon[curResult] ++;
              } else if(gameHour >= 17 && gameHour <22){
                  cumData[curColor].games_by_time.evening[curResult] ++;
              } else {
                  cumData[curColor].games_by_time.night[curResult] ++;
              }
          }
          if (gameHour >= 6 && gameHour <12){
              cumData.cumulative.games_by_time.morning[curResult] ++;
          } else if(gameHour >= 12 && gameHour <17){
              cumData.cumulative.games_by_time.afternoon[curResult] ++;
          } else if(gameHour >= 17 && gameHour <22){
              cumData.cumulative.games_by_time.evening[curResult] ++;
          } else {
              cumData.cumulative.games_by_time.night[curResult] ++;
          }
      }
    }
    
    );

    return cumData;
}

  return (
    <>
    <div className="App">
      <div className='titlesearch'>
        <div className='logo'>
          <img src={logo} alt='chess piece' />
          &nbsp;&nbsp;
          <h1>Tommy's Cool Chess App</h1>
          <br/>
        </div>
        <SearchBar handleChange={handleChange} collectAllData={collectAllData}/>
      
      </div>
      
      {loading ?
      <div>
        <Loader />
      </div>
      :
        ("white" in cumulativeData.bullet) ?
      <div className='content'>
        <div>
          <GameTypes changeTimeFormat={changeTimeFormat} filter={filter}/>
        </div>
        <div>
          <ColorPicker changeColorPicker={changeColorPicker} filter={filter}/>
        </div>
        <div className='graphs'>
          <Graphs chessgames={chessgames} cumulativeData ={cumulativeData[filter.timeFormat][filter.color]} />
        </div> 
      </div>
      :null
      }
    </div>
    </>
  );
}

export default App;
