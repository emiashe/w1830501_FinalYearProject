import React from 'react';
import './Trackers.css';
import { progressData } from '../../../../Data/Data';

const TrackerTwo = () => {
    
    
      return (
        <div className="tracker-card">
          <div className="tracker-header">
            <h3 className="tracker-title">Progress Across Current Courses</h3>
          </div>
          <div className="tracker-content">
            {progressData.map((item, index) => (
              <div className="progress-item" key={index}>
                <span className="progress-label">{item.label}</span>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
  );
};

export default TrackerTwo;