import React, {useRef, useEffect, useState} from 'react';
import './Login.css'
import '../../App.css'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import axios from '../../axios';

import useAuth from '../../Hooks/useAuth'

//import assets
import logo from '../../LoginAssets/logo.png'

//import icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

const LOGIN_URL = '/login';

// for video <video src=(video) autoPlay muted loop></video>

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();

    const navigateTo = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/quiz";

    const userRef = useRef();
    const errRef = useRef();


    //UseState to hold inputs
    const [loginUserName, setLoginUserName] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    


    //Message to the user 
    const[loginStatus, setLoginStatus] = useState('')
    const[statusHolder, setStatusHolder] = useState('message')

    useEffect(() => {
        if (loginStatus !== '') {
            setStatusHolder('showMessage');
            const timer = setTimeout(() => setStatusHolder('message'), 4000);
            return () => clearTimeout(timer); // cleanup
        }
    }, [loginStatus]);

    useEffect(()=> {
        userRef.current.focus();
    }, [])

  

        //onClick we will get what the user has entered
        const loginUser = async (e) => {
            e.preventDefault();
    
            try {
                const response = await axios.post(
                    LOGIN_URL,
                    {
                        LoginUserName: loginUserName,
                        LoginPassword: loginPassword
                    }
                );

                console.log("LOGIN SUCCESS:", response.data); // ✅ Check this!
    
                // Check expected success structure
                if (response?.data?.accessToken) {
                    const accessToken = response.data.accessToken;
                    const roles = response.data.roles;
    
                    setAuth({ 
                        LoginUserName: loginUserName,  
                        roles, 
                        accessToken });
                    setLoginUserName('');
                    setLoginPassword('');
                    //navigateTo(from, '/quiz'); //Redirect on success
                    navigateTo(from, {replace: true });
                } else {
                    setLoginStatus('Invalid credentials');
                }
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response.status === 400) {
                    setErrMsg('Missing Username or Password');
                } else if (err.response.status === 401) {
                    setErrMsg('Unauthorized');
                } else {
                    setErrMsg('Login Failed');
                }
                // ✅ Only call focus if the ref exists
                if (errRef.current) errRef.current.focus();
            }
        };

    const togglePersist = () => {
            setPersist(prev => !prev);
        }
    
    useEffect(() => {
            localStorage.setItem("persist", persist);
        }, [persist])
    

    return(
        
    <div className='loginPage flex'>
        <div className='container flex'>


            <div className='videoDiv'>
                {/* <img src={codepic} alt='Logo Image'></img> */}

                <div className='textDiv'>
                    <h2 className='title'>Info about the website</h2>
                    <p>More Info</p>
                </div>

                <div className='footerDiv flex'>
                    <span className='text'>Don't have an account?</span>
                    <Link to={'/register'}>
                    <button className='btn'>Sign up</button>
                    </Link>

                </div>
            

            </div> 

            <div className="formDiv flex">
                <div className="headerDiv">
                    <img src={logo} alt='Logo Image'></img>
                    <h3>Welcome back</h3>
                </div>

                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                    {errMsg}
                    </p>


                <form className='form grid' onSubmit={loginUser} >
                    <span className={statusHolder}>{loginStatus}</span>

                    <div className="inputDiv">
                        <label htmlFor="username">Username</label>
                        <div className="input flex">
                        <FaUserShield className='icon'/>
                        <input 
                        type="text" 
                        id='username' 
                        ref={userRef}
                        autoComplete='off'
                        placeholder='Enter Username' 
                        onChange={(event)=>{
                            setLoginUserName(event.target.value)
                        }}
                        value={loginUserName}
                        required  
                        />
                        </div>
                    </div>

                    <div className="inputDiv">
                        <label htmlFor="password">Password</label>
                        <div className="input flex">
                        <BsFillShieldLockFill className='icon'/>
                        <input 
                        type="password" 
                        id='password' 
                        placeholder='Enter Password' 
                        onChange={(event)=>{
                            setLoginPassword(event.target.value)
                        }}
                        value={loginPassword}
                        required
                        />
                        </div>
                    </div>

                    <button className='btn flex'>
                        <span>Login</span>
                        <AiOutlineSwapRight className='icon'/>

                    </button>
                    <div className="persistCheck">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor="persist">Trust This Device</label>
                   </div>
               
                    <span className='forgetPassword'>
                    <a href=''>Forgot your password? Click here</a>

                    </span>


                </form>
            </div>



        </div>
    </div>

    )

}

export default Login;