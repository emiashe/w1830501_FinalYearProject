import React from "react";
import "./SupportPage.css";
import { supportOptions } from './../../../Data/Data'

const SupportPage = () => {
    return (
      
                   
        <div className="support-container">
        <div className="support-header">
          <h1>How can we help you?</h1>
          <div className="search-bar">
            <input type="text" placeholder="Enter your search term" />
            <button>
              <span role="img" aria-label="search">🔍</span>
            </button>
          </div>
        </div>
        <div className="support-options">
          {supportOptions.map((option, index) => (
            <div className="support-box" key={index}>
              <div className="support-icon">{option.icon}</div>
              <h2>{option.title}</h2>
              <p>{option.description}</p>
            </div>
          ))}
        </div>
      </div>
      
    )
  }
  
  export default SupportPage