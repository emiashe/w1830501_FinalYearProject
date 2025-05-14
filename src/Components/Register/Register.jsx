import React from 'react';
import { useRef, useState, useEffect } from 'react';
import './Register.css'
import '../../App.css'
import {Link, useNavigate} from 'react-router-dom'
import Axios from 'axios'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import assets
import logo from '../../LoginAssets/logo.png'
import axios from '../../axios';

//import icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { MdOutlineMailOutline } from "react-icons/md";

//email, password and username checkers
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGISTER_URL = '/register'

// for video <video src=(video) autoPlay muted loop></video>

const Register = () => {

    const userRef = useRef();
    const errRef = useRef();


    //UseState to hold inputs
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [userName, setUserName] = useState('')
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('')
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = USER_REGEX.test(userName);
        console.log(result);
        console.log(userName);
        setValidName(result);
    }, [userName])

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPassword(result);
        const match = password == matchPassword
        setValidMatch(match)
    }, [password, matchPassword])

    useEffect(() => {
        setErrMsg('')
    }, [email, userName, password, matchPassword])


    const navigateTo = useNavigate()

    //onClick we will get what the user has entered
    const createUser = async (e)=>{

        e.preventDefault()

        // if button enabled with JS hack
        const v1 = USER_REGEX.test(userName);
        const v2 = PWD_REGEX.test(password);
        const v3 = EMAIL_REGEX.test(email);
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }

        try {
            const response = await axios.post(REGISTER_URL, {
               //creating variables to be sent to the server
                Email: email,
                UserName: userName,
                Password: password
            }, {
                headers: { 'Content-Type': 'application/json' }, // Set headers
                withCredentials: true // Include credentials (if needed)
               }
            );
            console.log(response.data);
            console.log(JSON.stringify(response));
            navigateTo('/')
            //clear input fields 


        }catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed');
            }
        
            errRef.current.focus();

        }


    }




    return(
      
    <div className='registerPage flex'>
        <div className='container flex'>


            <div className='videoDiv'>
                

                <div className='textDiv'>
                <h2 className='title'>Build the Web, One Tag at a Time.</h2>
                <p>Learn HTML, CSS, and JavaScript by doing — right in your browser.</p>
                </div>

                <div className='footerDiv flex'>
                    <span className='text'>Have an account?</span>
                    <Link to={'/'}>
                    <button className='btn'>Log in</button>
                    </Link>

                </div>
            

            </div> 

            <div className="formDiv flex">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                <div className="headerDiv">
                    <img src={logo} alt='Logo Image'></img>
                    <h3>Register</h3>
                </div>
                


                <form onSubmit={createUser}  className='form grid'>

                    <div className="inputDiv">
                        <label htmlFor="email">Email
                        <span className={validEmail ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validEmail || !email ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                        </label>
                        
                        <div className="input flex">
                        <MdOutlineMailOutline className='icon'/>
                        <input 
                        type="email" 
                        id='email' 
                        placeholder='Enter Email' 
                        ref={userRef}
                        autoComplete='off'
                        onChange={(event)=>{
                            setEmail(event.target.value)
                        }}
                        required
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="uemailnote"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        />
                        </div>
                        <p id="uemailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} /> <br />
                         - Must contain an "@" symbol.<br />
                         - Valid domain extension .<br />
                         (e.g., .com, .org, .net).<br />
                         </p>

                    </div>

                    <div className="inputDiv">
                        <label htmlFor="username">Username
                        <span className={validName ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validName || !userName ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                        </label>
                        

                        <div className="input flex">
                        <FaUserShield className='icon'/>
                        <input 
                        type="text" 
                        id='username' 
                        autoComplete='off'
                        onChange={(event)=>{
                            setUserName(event.target.value)
                        }}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        placeholder='Enter Username'
                        />
                        </div>
                        <p id="uidnote" className={userFocus && !validName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} /> <br />
                         - 4 to 24 characters.<br />
                         - Must begin with a letter.<br />
                         </p>


                    </div>
                    <div className="inputDiv">
                        <label htmlFor="password">Password
                        <span className={validPassword ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validPassword || !password ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                        </label>

                        <div className="input flex">
                        <BsFillShieldLockFill className='icon'/>
                        <input 
                        type="password" 
                        id='password' 
                        placeholder='Enter Password' 
                        onChange={(event)=>{
                            setPassword(event.target.value)
                        }}
                        required
                        aria-invalid={validPassword ? "false " : "true"}
                        aria-describedby='pwdnote'
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}

                        />
                        </div>

                        <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} /> <br />
                        - Must include uppercase <br />
                        - At least one numeral (0-9) <br />
                        - At least one symbol: 
                        <span aria-label="exclamation mark">!</span> 
                        <span aria-label="at symbol">@</span> 
                        <span aria-label="hashtag">#</span> 
                        <span aria-label="dollar sign">$</span> 
                        <span aria-label="percent">%</span>
                        <br />
                        - 8-24 characters
                        </p> 

                    </div>
                    <div className="inputDiv">
                        <label htmlFor="password">Confirm Password
                        <span className={validMatch && matchPassword ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validMatch || !matchPassword ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                        </label>

                        <div className="input flex">
                        <BsFillShieldLockFill className='icon'/>
                        <input 
                        type="password" 
                        id='confirm_password' 
                        placeholder='Repeat Password' 
                        onChange={(event)=>{
                            setMatchPassword(event.target.value)
                        }}
                        required
                        aria-invalid={validMatch ? "false " : "true"}
                        aria-describedby='confirmnote'
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}

                        />
                        </div>
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            - Passwords don't match
                            </p>

                    </div>
                    


                    

                    <button disabled={!validEmail || !validName || !validPassword || !validMatch ? true : false } 
                    className='btn flex'>
                        <span>Register</span>
                        <AiOutlineSwapRight className='icon'/>

                    </button>

                    <span className='forgetPassword'>
                    <a href=''>Forgot your password? Click here</a>

                    </span>
                </form>
            </div>



        </div>
        <p class="credits">By Emina Asherbekova (w1830501)</p>
    </div>
  
    )
}

export default Register;