import React, { useState } from "react";
import './SearchBar.css';

const SearchBar = ({ handleChange, collectAllData }) => {

  return (
    <div className="searchbar">
      <form>
        <label>Chess.com username: </label>
        <input name="username" type="search" placeholder="Enter username" onChange={(e)=>handleChange(e)}></input>
        &nbsp; &nbsp; 
        <label>From: </label>
        <input name="fromDate" type="month" onChange={(e)=>handleChange(e)}></input>
        &nbsp; &nbsp; 
        <label>To: </label>
        <input name="toDate" type="month" onChange={(e)=>handleChange(e)}></input>
        &nbsp;&nbsp;
        <button className='button-33' type="submit" onClick={(e)=>collectAllData(e)}>GetData</button>
      </form>
      
    </div>
  )
}

export default SearchBar