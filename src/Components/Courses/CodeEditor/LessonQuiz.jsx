import React, { useEffect, useRef, useState } from 'react';
import '../../Quiz/Quiz.css';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';

const LessonQuiz = () => {
  const { sectionId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [courseId, setCourseId] = useState(null);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);
  const optionArray = [Option1, Option2, Option3, Option4];

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axiosPrivate.get(`/quizzes/section/${sectionId}`);
        setQuiz(res.data);
            // ✅Use the top-level course_id directly
      if (res.data.course_id) {
        setCourseId(res.data.course_id);
      }

        
      console.log("Saved courseId from quiz:", res.data.course_id);
      
      } catch (err) {
        console.error('Failed to load quiz:', err);
      }
    };

    fetchQuiz();
  }, [sectionId]);

  const checkAnswer = (e, selectedId, correctId) => {
    if (!lock) {
      if (selectedId === correctId) {
        e.target.classList.add('correct');
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add('wrong');
        optionArray[correctId - 1].current.classList.add('correct');
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      if (index === quiz.questions.length - 1) {
        setResult(true);
        return;
      }

      setIndex(prev => prev + 1);
      setLock(false);
      optionArray.forEach(ref => {
        ref.current.classList.remove('wrong', 'correct');
      });
    }
  };

  const handleSubmit = async () => {
    if (!courseId) {
      alert('Missing course ID. Please try again later.');
      return;
    }
  
    try {
      // 1. Mark section as complete
      await axiosPrivate.post('/progress/complete', {
        sectionId: parseInt(sectionId),
      });
  
      // 2. Check for next section
      const res = await axiosPrivate.get(`/progress/course/${courseId}`);
      const nextId = res.data?.nextSection?.id;
  
      if (nextId) {
        // More lessons remain → back to course preview
        navigate(`/coursepreview/${courseId}`, { state: { completedLesson: true } });
      } else {
        // All done → go to homepage
        navigate('/homepage');
      }
  
    } catch (err) {
      console.error('Failed to complete quiz or fetch next section:', err);
      alert('Something went wrong. Please try again.');
    }
  };
  

  

  if (!quiz) return <div>Loading quiz...</div>;
  if (!quiz.questions || quiz.questions.length === 0) return <div>No quiz questions available.</div>;

  const currentQuestion = quiz.questions[index];

  console.log("Loaded quiz:", quiz);
  console.log("Current question:", currentQuestion);
  console.log("Full question data:", quiz.questions);

  return (
    <div className="quiz-container">
      <h1>{quiz.title}</h1>
      <hr />
      {!result ? ( 
        <>
        
          <h2>{index + 1}. {currentQuestion.question_text}</h2>
          {currentQuestion.image && <img src={currentQuestion.image} alt="" />}
          <ul>
            {currentQuestion.options.map((opt, i) => (
              <li
                key={opt.id}
                ref={optionArray[i]}
                onClick={(e) => checkAnswer(e, opt.id, currentQuestion.correct_option_id)}
              >
                {opt.text}
              </li>
            ))}
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">{index + 1} of {quiz.questions.length} questions</div>
        </>
      ) : (
        <>
          <h2>Your Score: {score} out of {quiz.questions.length}</h2>
          <button className="submit-button" onClick={handleSubmit}>Submit Quiz</button>
        </>
      )}
    </div>
  );
};

export default LessonQuiz;
