//w1930501
// Component to load and display lesson content, either code editor or quiz

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import Output from '../CodeEditor/Output'
import './Lesson.css';
import { Editor } from "@monaco-editor/react";
import ContentTop from '../../Dashboard/ContentTop/ContentTop'
import LessonQuiz from './LessonQuiz'
import LiveOutput from './LiveOutput';

const Lesson = () => {
  const { sectionId } = useParams();
  const [section, setSection] = useState(null);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const editorRef = useRef(null);
  const [value, setValue] = useState('');
  const [lesson, setLesson] = useState(null);

  // Load section data
  useEffect(() => {
    const fetchSection = async () => {
      try {
        const response = await axiosPrivate.get(`/courses/sections/${sectionId}`);
        setSection(response.data);
      } catch (err) {
        console.error('Error fetching section:', err);
        setError('Failed to load lesson.');
      }
    };
    fetchSection();
  }, [sectionId]);

  // Load lesson content if section includes a lesson ID
  useEffect(() => {
    const fetchLesson = async () => {
      if (!section?.lesson_id) return;
      try {
        const response = await axiosPrivate.get(`/lessons/${section.lesson_id}`);
        setLesson(response.data);
      } catch (err) {
        console.error('Error fetching lesson:', err);
        setError('Failed to load lesson content.');
      }
    };
    fetchLesson();
  }, [section]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  }

  if (error) return <div>{error}</div>;
  if (!section) return <div>Loading...</div>;
  if (section.type === 'code' && !lesson) return <div>Loading lesson content...</div>;

  return section.type === 'code' ? (
    <div className='main-content'>
      <ContentTop />
      <div className="editor-wrapper">
        <div className="text-container">
          <h2 className="section-title">Lesson:</h2>
          <div className="lesson-wrapper">
            <div className="lesson-content">
              {(lesson.content || '').split('\n').map((line, index) => (
                <div key={index} className="lesson-line">{line.trim()}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Render based on language */}
        {lesson.language === 'javascript' ? (
          <>
            <div className="editor-container">
              <h2 className="section-title">Editor:</h2>
              <div className="header">
                <p className="language-label">Language:</p>
                <p className="language-value">{lesson.language.toUpperCase()}</p>
              </div>
              <Editor
                height="85%"
                theme="vs-dark"
                language="javascript"
                defaultValue={lesson.starter_code}
                onMount={onMount}
                value={value}
                onChange={(value) => setValue(value)}
              />
            </div>
            <div className="text-container">
              <h2 className="section-title">Output:</h2>
              <Output
                editorRef={editorRef}
                expectedOutput={lesson.expected_output}
                courseId={section.course_id}
              />
            </div>
          </>
        ) : ['html', 'css'].includes(lesson.language) ? (
          <>
            <div className="editor-container">
              <h2 className="section-title">Editor:</h2>
              <div className="header">
                <p className="language-label">Language:</p>
                <p className="language-value">{lesson.language.toUpperCase()}</p>
              </div>
              <Editor
                height="85%"
                theme="vs-dark"
                language={lesson.language}
                defaultValue={lesson.starter_code}
                onMount={onMount}
                value={value}
                onChange={(value) => setValue(value)}
              />
            </div>
            <div className="text-container">
              <h2 className="section-title">Output:</h2>
              <LiveOutput code={value} courseId={section.course_id} />
            </div>
          </>
        ) : (
          <div>Unsupported language</div>
        )}
      </div>
    </div>
  ) : section.type === 'quiz' ? (
    <LessonQuiz sectionId={sectionId} />
  ) : (
    <div>Unsupported lesson type</div>
  );
};

export default Lesson;
