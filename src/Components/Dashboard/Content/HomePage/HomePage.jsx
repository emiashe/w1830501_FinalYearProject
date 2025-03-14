import './HomePage.css'
import Projects from './Projects/Projects'
import {Link, useNavigate} from 'react-router-dom'
import TrackerOne from './Trackers/TrackerOne'
import TrackerTwo from './Trackers/TrackerTwo'


const ContentBody = () => {
  return (
    
             
    <div className="main-content-holder">
      {/* Your Courses Section */}
      <h2 className="section-heading">Your Courses:</h2>
      <Link to={'/coursepreview'}>
        <div className="content-grid-one">
          <Projects />
        </div>
      </Link>

      {/* Your Progress Tracking Section */}
      <h2 className="section-heading"> Progress Tracking</h2>
      <div className="content-grid-two">
        <TrackerOne />
        <TrackerTwo />
      </div>
    </div>
       
  )
}

export default ContentBody