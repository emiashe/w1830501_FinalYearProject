import React, {useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import ContentTop from '../Dashboard/ContentTop/ContentTop';
import './../Dashboard/Dashboard.css'
import './CoursePreview.css'

const CoursePreview = () => {


    return (
        <div className='main-content'>
            
            <ContentTop />

          <div className="page-container">
      <h1 className="page-title">Master the Foundations of Web Development</h1>
      <p className="page-subtitle">
      Learn how to use HTML & CSS - foundational technologies for creating beautiful and structured web pages.
      </p>
      <div className="course-details-container">
        <div className="about-course">
          <h3>About this course</h3>
          <p>
          In this course, you’ll learn the essential building blocks of
           web development with HTML and CSS. Understand how to structure 
           web pages with HTML, style them with CSS, and create layouts
            that are both functional and visually appealing.
          </p>
        </div>
        <div className="skills-gain">
          <h3>Skills you'll gain</h3>
          <ul>
            <li>✔ Build and structure web pages using HTML</li>
            <li>✔ Style and design pages with CSS</li>
            <li>✔ Create responsive and modern layouts</li>
          </ul>
        </div>
      </div>
      <div className="course-preview-container">
        <div className="course-preview-content">
          <h2 className="course-title">1. Introduction</h2>
          <p className="course-description">
          In this module, you will learn the basics of HTML and CSS, how to structure web pages using HTML tags, and style them with CSS. You will also apply your knowledge to build a personal portfolio project
          </p>
          <div className="course-sections">
            <div className="section-item">
              <span className="section-icon">📘</span>
              <span className="section-text">Introduction to HTML</span>
            </div>
            <div className="section-item">
              <span className="section-icon">📘</span>
              <span className="section-text">Introduction to CSS</span>
            </div>
            <div className="section-item">
              <span className="section-icon">📘</span>
              <span className="section-text"> HTML Tags and Structure</span>
            </div>
            <div className="section-item">
              <span className="section-icon">🔒</span>
              <span className="section-text">Project: Build a Personal Portfolio</span>
            </div>
            <div className="section-item">
              <span className="section-icon">🔒</span>
              <span className="section-text">Quiz: Basics of HTML/CSS</span>
            </div>
          </div>
          <div className="start-button-container">
            <Link to="/codeeditor" className="start-button">
              Get Started
            </Link>
          </div>
        </div>
      </div>

       {/* New Box for Module Overview */}
       <div className="course-modules-container">
        <h3 className="modules-title">Modules</h3>
        <ul className="modules-list">
          <li>
            <span className="module-name">Introduction</span>
            <span className="module-details">3 Lessons, 1 Project, 1 Quiz</span>
          </li>
          <li>
            <span className="module-name">HTML Basics</span>
            <span className="module-details">3 Lessons, 1 Project, 1 Quiz</span>
          </li>
          <li>
            <span className="module-name">CSS Basics</span>
            <span className="module-details">2 Lessons, 2 Projects, 1 Quiz</span>
          </li>
          <li>
            <span className="module-name">Responsive Design</span>
            <span className="module-details">1 Lesson, 1 Project</span>
          </li>
        </ul>
      </div>

    </div>
    {/* New Box Section */}
    
    
    </div>

        
    )
}
export default CoursePreview;