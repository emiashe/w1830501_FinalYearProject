import React, { useState, useRef } from "react"
import './Quiz.css'
import {Link, useNavigate} from 'react-router-dom'
import { firstquizdata } from './../Data/Data'

const Quiz = () => {

    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(firstquizdata[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false)

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let option_array = [Option1, Option2, Option3, Option4];




    const checkAnswer = (e, answer) => {
        if (lock === false) {

            if(question.answer===answer) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev=>prev+1)
            }
            else {
                e.target.classList.add("wrong");
                setLock(true);
                option_array[question.answer-1].current.classList.add("correct");
            }

        }
    }

    const next = () => {
        if (lock===true) {
            if (index === firstquizdata.length -1) {
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(firstquizdata[index]);
            setLock(false);
            option_array.map((option) => {
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            })
        }

    }



    return (
      <div className="quiz-container">
        <h1>Quiz App</h1>
        <hr />
        {result?<></>:<>
        <h2>{index+1}. {question.question}</h2>
        <img src={question.image}/>
         <ul>
            <li ref={Option1} onClick={(e)=>{checkAnswer(e,1)}}>{question.option1}</li>
            <li ref={Option2} onClick={(e)=>{checkAnswer(e,2)}}>{question.option2}</li>
            <li ref={Option3} onClick={(e)=>{checkAnswer(e,3)}}>{question.option3}</li>
            <li ref={Option4} onClick={(e)=>{checkAnswer(e,4)}}>{question.option4}</li>
         </ul>
         <button onClick={next}>Next</button>
         <div className="index">{index+1} if {firstquizdata.length} questions</div>
         </>}
         {result?<><h2>Your Score: {score} out of {firstquizdata.length}</h2>
         <Link to={'/homepage'}>
         <button>Start learning</button>
         </Link>
         </>:<></>}
    
      </div>
      
    )
  }
  
  export default Quiz