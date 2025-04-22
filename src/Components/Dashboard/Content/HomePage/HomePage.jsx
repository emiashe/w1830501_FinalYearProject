import './HomePage.css'
import Projects from './Projects/Projects'
import {Link, useNavigate} from 'react-router-dom'
import TrackerOne from './Trackers/TrackerOne'
import TrackerTwo from './Trackers/TrackerTwo'


const ContentBody = () => {
  return (
    <div className="main-content-holder">
    {/*  Courses Section Title + Buttons */}
    <div className="section-heading-wrapper">
      <Projects />
    </div>

      <h2 className="section-heading"> Progress Tracking</h2>
      <div className="content-grid-two">
        <TrackerOne />
        <TrackerTwo />
      </div>
    </div>
  );
};

export default ContentBody