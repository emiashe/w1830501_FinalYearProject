//w1830501
// Main homepage content showing the retake quiz button, courses, and trackers

import './HomePage.css';
import Projects from './Projects/Projects';
import { Link, useNavigate } from 'react-router-dom';
import TrackerOne from './Trackers/TrackerOne';
import TrackerTwo from './Trackers/TrackerTwo';

const ContentBody = () => {
  const navigate = useNavigate();

  // Retake personalization quiz
  const handleRetakeQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className="main-content-holder">
      {/* Retake quiz button */}
      <div className="top-bar">
        <button className="retake-quiz-btn" onClick={handleRetakeQuiz}>
          Retake Personalization Quiz
        </button>
      </div>

      {/* User courses display */}
      <div className="section-heading-wrapper">
        <Projects />
      </div>

      {/* Progress Tracking */}
      <h2 className="section-heading"> Progress Tracking</h2>
      <div className="content-grid-two">
        <TrackerOne />
        <TrackerTwo />
      </div>
    </div>
  );
};

export default ContentBody;
