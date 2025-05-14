//w1830501
// Progress tracker for enrolled courses showing completion percentage

import React, { useEffect, useState } from 'react';
import './Trackers.css';
import useAxiosPrivate from '../../../../../Hooks/useAxiosPrivate';

const TrackerOne = () => {
  const [progressData, setProgressData] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  // Fetch progress summary
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axiosPrivate.get('/progress/summary');
        setProgressData(res.data);
      } catch (err) {
        console.error("Failed to load progress summary:", err);
      }
    };
    fetchProgress();
  }, []);

  return (
    <div className="tracker-box">
      <h3 className="tracker-title">Course Completion</h3>
      <ul className="tracker-list">
        {progressData.map((item, i) => (
          <li key={i} className="tracker-item">
            <span className="tracker-label">{item.label}</span>
            <div className="tracker-bar">
              <div
                className="tracker-bar-fill"
                style={{ width: `${item.percentage}%` }}
              />
              <span className="tracker-percent">{item.percentage}%</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackerOne;
