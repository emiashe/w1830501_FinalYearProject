import React, { useState } from 'react';
import { executeCode } from '../../../api';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import { useNavigate, useParams } from 'react-router-dom';
import './Lesson.css';

const Output = ({ editorRef, expectedOutput = null, courseId }) => {
  console.log("Output received courseId:", courseId);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { sectionId } = useParams();
  

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    
    try {

      const { run: result } = await executeCode(sourceCode);
      const cleanedOutput = result.output?.trim() || '';
      setOutput(cleanedOutput);
      setError(null);

      if (expectedOutput?.trim() === cleanedOutput) {
        setSuccess(true);

        console.log(" Calling /progress/complete with sectionId:", sectionId);
        // Mark progress as complete
        await axiosPrivate.post('/progress/complete', {
          sectionId: parseInt(sectionId),
        });
      } else {
        setSuccess(false);
      }
    } catch (err) {
      setOutput(null);
      setError(err.run?.stderr || err.message || 'An unexpected error occurred.');
      setSuccess(false);
    }
  };

  const handleNext = async () => {
    if (!courseId) {
      alert('Missing course ID. Please try again later.');
      return;
    }
  
    try {
      const res = await axiosPrivate.get(`/progress/course/${courseId}`);
      
      const nextId = res.data?.nextSection?.id;
  
      if (nextId) {
        // There are still lessons remaining → navigate to course preview
        navigate(`/coursepreview/${courseId}`, { state: { completedLesson: true } });
      } else {
        // No more lessons → navigate to homescreen
        navigate('/homepage');
      }
    } catch (err) {
      console.error('Failed to fetch next section:', err);
      alert('Something went wrong. Please try again later.');
    }
  };
  

return (
  <div className="output-wrapper">
<div className="output-header">
  <button className="run-button" type="submit" onClick={runCode}>
    Run Code
  </button>
</div>
<div className="output-area">
  {error ? (
    <div className="error-message">
      <strong>Error:</strong> {error}
    </div>
  ) : (

    <div>
      {output
                      ? output.split('\n').map((line, index) => (
                            <div key={index}>{line}</div>
                        ))
                      : "Click 'Run Code' to see output here."}
      </div>
  )}
</div>
{success && (
        <div className="success-box">
          <p className="success-text"> Success in the lesson!</p>
          <button className="next-button" onClick={handleNext}>
            Next Lesson
          </button>
        </div>
      )}
    </div>


)
}

 

export default Output;
