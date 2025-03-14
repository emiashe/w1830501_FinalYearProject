import React from "react"

import './CoursesPage.css'
import Projects from './../HomePage/Projects/Projects'
import {Link, useNavigate} from 'react-router-dom'

const CoursesPage = () => {
    return (
      
                   
    <div className="main-content-holder">
        <Link to={'/coursepreview'}>
         <div className="content-grid-one">
           
             <Projects />
         </div>
         </Link>
         
     </div>
      
    )
  }
  
  export default CoursesPage