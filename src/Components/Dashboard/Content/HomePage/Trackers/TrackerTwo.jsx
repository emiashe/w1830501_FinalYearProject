//w1830501
// Tracker showing last visited sections for quick navigation

import React, { useEffect, useState } from 'react';
import './Trackers.css';
import useAxiosPrivate from '../../../../../Hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';

const TrackerTwo = () => {
  const [sections, setSections] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  // Fetch current sections user is on
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await axiosPrivate.get('/progress/current/all');
        setSections(res.data);
      } catch (err) {
        console.error("Failed to load current sections:", err);
      }
    };
    fetchSections();
  }, []);

  return (
    <div className="tracker-box">
      <h3 className="tracker-title">Current Lessons</h3>
      <ul className="tracker-list">
        {sections.map((section, i) => (
          <li key={i} className="tracker-item clickable" onClick={() => navigate(`/lesson/${section.section_id}`)}>
            <div className="tracker-label">{section.section_title}</div>
            <div className="tracker-course">{section.course_title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackerTwo;
