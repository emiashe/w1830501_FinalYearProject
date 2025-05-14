import React, { useEffect, useState } from 'react';
import './Trackers.css';
import useAxiosPrivate from '../../../../../Hooks/useAxiosPrivate';
import { FaCheckCircle } from 'react-icons/fa';

const TrackerTwo = () => {
  const axiosPrivate = useAxiosPrivate();
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const res = await axiosPrivate.get('/progress/completed');
        setCompletedLessons(res.data);
      } catch (err) {
        console.error("Failed to load completed lessons", err);
      }
    };
    fetchCompleted();
  }, []);

  return (
    <div className="tracker-card">
      <h2 className="tracker-title">✅ Completed Lessons</h2>
      {completedLessons.length === 0 ? (
        <p className="tracker-empty">You haven't completed any lessons yet.</p>
      ) : (
        <ul className="tracker-list">
          {completedLessons.map((item, i) => (
            <li key={i} className="tracker-item">
              <FaCheckCircle className="tracker-icon" />
              <div className="tracker-text">
                <strong>{item.title}</strong>
                <span className="tracker-meta">{item.module} — {item.course}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrackerTwo;
