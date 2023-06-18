import React from "react";
import './SearchBar.css';

const SearchBar = ({ handleChange, collectAllData, form }) => {

  return (
    <div className="searchbar">
      <form>
        <label>Chess.com username: </label>
        <input name="username" value={form.username} type="search" onChange={(e)=>handleChange(e)} placeholder="Enter username"></input>
        &nbsp; &nbsp; 
        <label>From: </label>
        <input name="fromDate" value={form.fromDate} type="search" onChange={(e)=>handleChange(e)}></input>
        &nbsp; &nbsp; 
        <label>To: </label>
        <input name="toDate" value={form.toDate} type="search" onChange={(e)=>handleChange(e)}></input>
        &nbsp;&nbsp;
        <button className='button-33' type="submit" onClick={(e)=>collectAllData(e)}>GetData</button>
      </form>
      
    </div>
  )
};

export default SearchBar;