import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import './Quiz.css';
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

const Quiz = () => {
  const [topic, setTopic] = useState(null); // 'html' or 'javascript'
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [lock, setLock] = useState(false);
  const [loading, setLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const optionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Step 1: Fetch quiz questions
  useEffect(() => {
    if (!topic) return;

    const fetchQuiz = async () => {
      setLoading(true);
      try {
        const res = await axiosPrivate.get(`/onboardingquiz/topic/${topic}`);
        setQuestions(res.data.questions);
      } catch (err) {
        console.error("Failed to fetch quiz:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [topic]);

  const checkAnswer = (e, selected) => {
    if (lock) return;

    const correct = questions[index].correct_option;
    if (selected === correct) {
      e.target.classList.add("correct");
      setScore((prev) => prev + 1);
    } else {
      e.target.classList.add("wrong");
      optionRefs[correct - 1].current.classList.add("correct");
    }
    setLock(true);
  };

  const next = () => {
    if (!lock) return;
    if (index === questions.length - 1) {
      setResult(true);
    } else {
      setIndex((prev) => prev + 1);
      optionRefs.forEach(ref => {
        ref.current.classList.remove("correct", "wrong");
      });
      setLock(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axiosPrivate.post("/onboardingquiz/submit", {
        topic,
        score
      });

      // Quiz complete → user is now enrolled
      navigate('/homepage');
    } catch (err) {
      console.error("Quiz submit failed:", err);
      alert("Something went wrong!");
    }
  };

  if (!topic) {
    return (
      <div className="quiz-container">
        <h1>Choose a Quiz Topic</h1>
        <button onClick={() => setTopic("html")}>HTML Quiz</button>
        <button onClick={() => setTopic("javascript")}>JavaScript Quiz</button>
      </div>
    );
  }

  if (loading) return <div className="quiz-container">Loading quiz...</div>;

  if (!questions.length || !questions[index]) {
    return <div className="quiz-container">Loading question...</div>;
  }
  
  const current = questions[index];

  return (
    <div className="quiz-container">
      <h1>{topic.toUpperCase()} Quiz</h1>
      <hr />

      {!result ? (
        <>
          <div className="quiz-question-block">
            <h2>{index + 1}. {current.question}</h2>
          </div>
          <ul>
            {[1, 2, 3, 4].map((opt, i) => (
              <li
                key={i}
                ref={optionRefs[i]}
                onClick={(e) => checkAnswer(e, opt)}
              >
                {current[`option${opt}`]}
              </li>
            ))}
          </ul>

          <button onClick={next}>Next</button>
          <div className="index">{index + 1} of {questions.length} questions</div>
        </>
      ) : (
        <>
          <div className="quiz-results">
            <p>✅ You scored {score} out of {questions.length}</p>
          </div>
          <button onClick={handleSubmit}>Finish & See My Courses</button>
        </>
      )}
    </div>
  );
};

export default Quiz;
