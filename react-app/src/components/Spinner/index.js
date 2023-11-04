import React from 'react';
import './Loader.css'; // Import the CSS styles for the loader
const Loader = () => {
    return (
      <div className="loader">
        <div className="loader-inner">
          <div className="loader-text"></div>
          <div className="loader-subtext"></div>
        </div>
      </div>
    );
  };

  export default Loader;
