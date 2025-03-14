import React from 'react';
import './Trackers.css';

const TrackerOne = () => {
  return (
    <div className="circletracker-card">
    <div className="circletracker-header">
      <h3 className="circletracker-title">Beginner Level</h3>
    </div>
    <div className="circletracker-circle-wrapper">
      <div className="circletracker-circle">
        <span className="circletracker-percentage">50%</span>
      </div>
    </div>
    <div className="circletracker-details">
      <p>Courses completed 2 out of 4</p>
      <p>Modules done: 8 </p>
    </div>
  </div>
  );
};

export default TrackerOne;