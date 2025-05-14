import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import ContentTop from '../Dashboard/ContentTop/ContentTop';
import './../Dashboard/Dashboard.css';
import './CoursePreview.css';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';

const CoursePreview = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // courseId

  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [sectionsByModule, setSectionsByModule] = useState({});
  const [hasProgress, setHasProgress] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState(null);
  const [currentModuleId, setCurrentModuleId] = useState(null);
  const completedLesson = location.state?.completedLesson;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseRes = await axiosPrivate.get(`/courses/${id}`);
        const modulesRes = await axiosPrivate.get(`/courses/${id}/modules`);
        const progressRes = await axiosPrivate.get(`/progress/course/${id}`);

        setCourse(courseRes.data);
        setModules(modulesRes.data);
        setHasProgress(progressRes.data?.hasProgress || false);
        setCurrentSectionId(progressRes.data?.nextSection?.id || null);
        setCurrentModuleId(progressRes.data?.nextSection?.module_id || null);

        // Load all sections by module
        const allSections = {};
        for (let mod of modulesRes.data) {
          const secRes = await axiosPrivate.get(`/courses/modules/${mod.id}/sections`);
          allSections[mod.id] = secRes.data;
        }
        setSectionsByModule(allSections);
      } catch (err) {
        console.error("Error loading course:", err);
      }
    };

    fetchCourse();

  // ✅ Added dependency to detect lesson completion & refetch progress
  }, [id, location.state?.timestamp]);

  const handleStartCourse = async () => {
    try {
      const res = await axiosPrivate.get(`/progress/course/${id}`);
      const nextId = res.data?.nextSection?.id;

      if (nextId) {
        navigate(`/lesson/${nextId}`);
      } 
    } catch (err) {
      console.error('Failed to fetch next section:', err);
      alert('Something went wrong. Please try again later.');
    }
  };

  const currentModule = modules.find(mod => mod.id === currentModuleId);

  if (!course) return <div>Loading course...</div>;

  return (
    <div className="main-content">
      <ContentTop />
      {completedLesson && (
        <div className="flash-message">
          Lesson completed successfully!
        </div>
      )}

      <div className="page-container">
        <h1 className="page-title">{course.title}</h1>
        <p className="page-subtitle">{course.subtitle}</p>

        <div className="course-details-container">
          <div className="about-course">
            <h3>About this course</h3>
            <p>{course.about}</p>
          </div>
          <div className="skills-gain">
            <h3>Skills you'll gain</h3>
            <ul>
              {course.skills?.map((skill, i) => (
                <li key={i}>✔ {skill}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="course-preview-container">
          <div className="course-preview-content">
            <h2 className="course-title">{currentModule?.name || 'No module available'}</h2>
            <p className="course-description">{currentModule?.description || 'No module available'}</p>

            <div className="course-sections">
              {currentModuleId && sectionsByModule[currentModuleId]?.map((section, i) => (
                <div
                  key={i}
                  className={`section-item ${section.id === currentSectionId ? 'current-section' : ''}`}
                >
                  <span className="section-icon">{section.is_locked ? '🔒' : '📘'}</span>
                  <span className="section-text">{section.title}</span>
                </div>
              ))}
            </div>

            <div className="start-button-container">
              <button onClick={handleStartCourse} className="start-button">
                {hasProgress ? "Continue Learning" : "Get Started"}
              </button>
            </div>
          </div>
        </div>

        <div className="course-modules-container">
          <h3 className="modules-title">Modules</h3>
          <ul className="modules-list">
            {modules.map((mod) => (
              <li
                key={mod.id}
                className={mod.id === currentModuleId ? 'current-module' : ''}
              >
                <span className="module-name">{mod.name}</span>
                <span className="module-details">{mod.summary}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
