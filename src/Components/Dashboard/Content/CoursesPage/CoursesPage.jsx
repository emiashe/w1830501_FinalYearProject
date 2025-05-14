//w1830501
// Displays available courses categorized by topic and level with enrollment support

import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../../Hooks/useAxiosPrivate';
import '../HomePage/Projects/Projects.css';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [archivedCourseIds, setArchivedCourseIds] = useState([]);
  const [flashMessage, setFlashMessage] = useState('');
  const axiosPrivate = useAxiosPrivate();

  // Fetch all available courses
  const fetchCourses = async () => {
    try {
      const res = await axiosPrivate.get('/courses');
      setCourses(res.data);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
  };

  // Fetch user's active courses
  const fetchEnrolled = async () => {
    try {
      const res = await axiosPrivate.get('/usercourses/active');
      const ids = res.data.map(course => course.id);
      setEnrolledCourseIds(ids);
    } catch (err) {
      console.error('Failed to fetch enrolled courses:', err);
    }
  };

  // Fetch user's archived (completed) courses
  const fetchArchived = async () => {
    try {
      const res = await axiosPrivate.get('/usercourses/archive');
      const ids = res.data.map(course => course.id);
      setArchivedCourseIds(ids);
    } catch (err) {
      console.error('Failed to fetch archived courses:', err);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrolled();
    fetchArchived();
  }, []);

  // Handle course enrollment
  const enroll = async (courseId) => {
    try {
      await axiosPrivate.post('/usercourses/enroll', { courseId });
      setFlashMessage('Enrolled successfully!');
      setTimeout(() => setFlashMessage(''), 4000);
      fetchEnrolled();
    } catch (err) {
      console.error('Enrollment failed:', err);
      setFlashMessage('Enrollment failed');
      setTimeout(() => setFlashMessage(''), 4000);
    }
  };

  // Organize courses by topic and level
  const groupedCourses = (topic) => {
    const order = ['Beginner', 'Intermediate', 'Advanced'];
    return order.flatMap(level =>
      courses.filter(c => c.topic === topic && c.level === level)
    );
  };

  // Render course row grouped by level
  const renderCourseRow = (group, label) => (
    <>
      <h2 className="section-heading">{label}</h2>
      <div className="scroll-wrapper">
        <div className="scroll-container">
          <ul className="project-list">
            {group.map((course, index) => {
              const isEnrolled = enrolledCourseIds.includes(course.id);
              const isArchived = archivedCourseIds.includes(course.id);
              const shouldHideButton = isEnrolled || isArchived;

              return (
                <li key={index} className="grid-one-item grid-common grid-c1">
                  <p className="text text-sm text-white">Level: {course.level}</p>
                  <span className="grid-c1-content">
                    <span className="lg-value">{course.title}</span>
                    <span className="card-wrapper">
                      <span className="card-pin-hidden">{course.description}</span>
                    </span>
                    <span className="card-logo-wrapper">
                      <span>
                        <p className="text text-sm text-white">
                          Includes {course.modulesCount || 1} modules
                        </p>
                        {!shouldHideButton ? (
                          <div className="btn-wrapper">
                            <button className="enroll-btn" onClick={() => enroll(course.id)}>Enroll</button>
                          </div>
                        ) : (
                          <p className="enrolled-label">
                            {isArchived ? 'Completed' : 'Already Enrolled'}
                          </p>
                        )}
                      </span>
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="section-heading-wrapper">
        {flashMessage && <div className="flash-message">{flashMessage}</div>}
      </div>
      {renderCourseRow(groupedCourses('javascript'), 'All JavaScript Courses:')}
      {renderCourseRow(groupedCourses('html'), 'All HTML & CSS Courses:')}
    </>
  );
};

export default CoursesPage;
