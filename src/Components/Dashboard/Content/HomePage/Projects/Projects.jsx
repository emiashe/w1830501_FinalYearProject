//w1830501
// Displays active and archived user courses in a scrollable format

import { useEffect, useRef, useState } from 'react';
import './Projects.css';
import useAxiosPrivate from '../../../../../Hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const [courses, setCourses] = useState([]);
  const [current, setCurrent] = useState([]);
  const [archivedCourses, setArchivedCourses] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  // Fetch active and archived courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosPrivate.get('/usercourses/active');
        setCourses(response.data);
        const archivedRes = await axiosPrivate.get('/usercourses/archive');
        setArchivedCourses(archivedRes.data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };
    fetchCourses();
  }, []);

  // Fetch user's current progress sections
  useEffect(() => {
    const fetchCurrent = async () => {
      try {
        const response = await axiosPrivate.get('/progress/current');
        setCurrent(response.data);
      } catch (err) {
        console.error("Failed to fetch current progress:", err);
      }
    };
    fetchCurrent();
  }, []);

  // Enable/disable scroll buttons
  useEffect(() => {
    const scrollEl = scrollRef.current;
    const checkScroll = () => {
      if (!scrollEl) return;
      setCanScrollLeft(scrollEl.scrollLeft > 0);
      setCanScrollRight(scrollEl.scrollLeft + scrollEl.offsetWidth < scrollEl.scrollWidth);
    };

    if (scrollEl) {
      checkScroll();
      scrollEl.addEventListener('scroll', checkScroll);
      return () => scrollEl.removeEventListener('scroll', checkScroll);
    }
  }, [courses]);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <>
      {/* Active Courses */}
      <div className="section-heading-wrapper">
        <h2 className="section-heading">Your Courses:</h2>
        <div className="scroll-controls">
          {canScrollLeft && <button className="scroll-btn heading-left" onClick={scrollLeft}>←</button>}
          {canScrollRight && <button className="scroll-btn heading-right" onClick={scrollRight}>→</button>}
        </div>
      </div>

      <div className="scroll-container" ref={scrollRef}>
        <ul className="project-list">
          {courses.map((course, index) => (
            <li
              key={index}
              onClick={() => navigate(`/coursepreview/${course.id}`)}
              className="grid-one-item grid-common grid-c1"
              style={{ cursor: 'pointer' }}
            >
              <span className="grid-c1-content">
                <p>{course.level}</p>
                <span className="lg-value">{course.title}</span>
                <span className="card-wrapper">
                  <span className="card-pin-hidden">{course.description}</span>
                </span>
                <span className="card-logo-wrapper">
                  <span>
                    <p className="text text-silver-v1 expiry-text">----</p>
                    <p className="text text-sm text-white">Includes {course.modulesCount} modules</p>
                  </span>
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Archived Courses */}
      {archivedCourses.length > 0 && (
        <>
          <h2 className="section-heading">Archived Courses:</h2>
          <div className="scroll-container">
            <ul className="project-list">
              {archivedCourses.map((course, index) => (
                <li
                  key={index}
                  className="grid-one-item grid-common grid-c1"
                  style={{ cursor: 'default', opacity: 0.6 }}
                >
                  <span className="grid-c1-content">
                    <p>{course.level}</p>
                    <span className="lg-value">{course.title}</span>
                    <span className="card-wrapper">
                      <span className="card-pin-hidden">{course.description}</span>
                    </span>
                    <span className="card-logo-wrapper">
                      <span>
                        <p className="text text-sm text-white">Completed & Archived</p>
                        <p className="text text-silver-v1 expiry-text">Includes {course.modulesCount} modules</p>
                      </span>
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Projects;
