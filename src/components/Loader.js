import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <div className='surroundLoader'>
        <div className='ring'>Loading</div>
        <span className='span'></span>
    </div>
  )
}

export default Loader;