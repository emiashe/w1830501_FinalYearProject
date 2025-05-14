//w1930501
// Live rendering of HTML/CSS content with next button after preview

import React from 'react';
import './Lesson.css';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import { useNavigate, useParams } from 'react-router-dom';

const LiveOutput = ({ code, courseId }) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { sectionId } = useParams();

  const handleNext = async () => {
    try {
      await axiosPrivate.post('/progress/complete', {
        sectionId: parseInt(sectionId),
      });

      if (!courseId) {
        alert('Missing course ID. Please try again later.');
        return;
      }

      const res = await axiosPrivate.get(`/progress/course/${courseId}`);
      const nextId = res.data?.nextSection?.id;

      if (nextId) {
        navigate(`/coursepreview/${courseId}`, { state: { completedLesson: true } });
      } else {
        navigate('/homepage');
      }
    } catch (err) {
      console.error('Failed to complete or fetch next section:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="output-wrapper">
      <div className="output-area">
        <iframe
          title="Live Preview"
          sandbox="allow-scripts allow-same-origin"
          style={{ width: '100%', height: '100%', border: 'none', backgroundColor: 'transparent' }}
          srcDoc={code}
        />
      </div>
      <div className="success-box">
        <p className="success-text">Feel like you're done?</p>
        <button className="next-button" onClick={handleNext}>Next Lesson</button>
      </div>
    </div>
  );
};

export default LiveOutput;
