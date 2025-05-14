//w1830501
// Progress tracker for enrolled courses showing completion percentage

import React, { useEffect, useState } from 'react';
import './Trackers.css';
import useAxiosPrivate from '../../../../../Hooks/useAxiosPrivate';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const TrackerOne = () => {
  const [progressData, setProgressData] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axiosPrivate.get('/progress/summary');
        setProgressData(res.data);
      } catch (err) {
        console.error('Failed to fetch progress data', err);
      }
    };

    fetchProgress();
  }, []);

  return (
    <div className="circletracker-card">
    <div className="circletracker-header">
      <h3 className="circletracker-title">Course Progress Overview</h3>
    </div><div className="circular-tracker-container">
        {progressData.map((course, index) => (
          <div key={index} className="circular-progress-item">
            <CircularProgressbar
              value={course.percentage}
              text={`${course.percentage}%`}
              styles={buildStyles({
                textColor: '#fff',
                pathColor: course.color || '#4ade80',
                trailColor: '#1f2937',
              })}
            />
            <p className="tracker-label">{course.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackerOne;