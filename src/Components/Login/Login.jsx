//w1830501
// Login component with credential input, authentication logic, and onboarding quiz check

import React, { useRef, useEffect, useState } from 'react';
import './Login.css'
import '../../App.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from '../../axios';

import useAuth from '../../Hooks/useAuth'
import logo from '../../LoginAssets/logo.png'
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

const LOGIN_URL = '/login';

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();
    const navigateTo = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/homepage";

    const userRef = useRef();
    const errRef = useRef();

    const [loginUserName, setLoginUserName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const [statusHolder, setStatusHolder] = useState('message');

    useEffect(() => {
        if (loginStatus !== '') {
            setStatusHolder('showMessage');
            const timer = setTimeout(() => setStatusHolder('message'), 4000);
            return () => clearTimeout(timer);
        }
    }, [loginStatus]);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    const loginUser = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL, {
                LoginUserName: loginUserName,
                LoginPassword: loginPassword
            });

            if (response?.data?.accessToken) {
                const { accessToken, roles, hasTakenOnboarding } = response.data;

                setAuth({ LoginUserName: loginUserName, roles, accessToken });
                setLoginUserName('');
                setLoginPassword('');

                if (!hasTakenOnboarding) {
                    navigateTo('/quiz', { replace: true });
                } else {
                    navigateTo(from, { replace: true });
                }
            } else {
                setLoginStatus('Invalid credentials');
            }
        } catch (err) {
            if (!err?.response) setErrMsg('No Server Response');
            else if (err.response.status === 400) setErrMsg('Missing Username or Password');
            else if (err.response.status === 401) setErrMsg('Unauthorized');
            else setErrMsg('Login Failed');

            if (errRef.current) errRef.current.focus();
        }
    };

    const togglePersist = () => setPersist(prev => !prev);

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist]);

    return (
        <div className='loginPage flex'>
            <div className='container flex'>
                <div className='videoDiv'>
                    <div className='textDiv'>
                        <h2 className='title'>Build the Web, One Tag at a Time.</h2>
                        <p>Learn HTML, CSS, and JavaScript by doing — right in your browser.</p>
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
                        <img src={logo} alt='Logo Image' />
                        <h3>Welcome back</h3>
                    </div>

                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                        {errMsg}
                    </p>

                    <form className='form grid' onSubmit={loginUser}>
                        <span className={statusHolder}>{loginStatus}</span>

                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                                <FaUserShield className='icon' />
                                <input
                                    type="text"
                                    id='username'
                                    ref={userRef}
                                    autoComplete='off'
                                    placeholder='Enter Username'
                                    onChange={(e) => setLoginUserName(e.target.value)}
                                    value={loginUserName}
                                    required
                                />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className='icon' />
                                <input
                                    type="password"
                                    id='password'
                                    placeholder='Enter Password'
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    value={loginPassword}
                                    required
                                />
                            </div>
                        </div>

                        <button className='btn flex'>
                            <span>Login</span>
                            <AiOutlineSwapRight className='icon' />
                        </button>

                        <div className="persistCheck">
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    id="persist"
                                    onChange={togglePersist}
                                    checked={persist}
                                />
                                <span className="slider" />
                                <span className="label-text">Trust This Device</span>
                            </label>
                        </div>

                        <span className='forgetPassword'>
                            <a href=''>Forgot your password? Click here</a>
                        </span>
                    </form>
                </div>
            </div>
            <p className="credits">By Emina Asherbekova (w1830501)</p>
        </div>
    );
};

export default Login;
