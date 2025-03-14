import React, {useEffect, useState} from 'react';
import './Login.css'
import '../../App.css'
import {Link, useNavigate} from 'react-router-dom'
import Axios from 'axios'

//import assets
import logo from '../../LoginAssets/logo.png'

//import icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";


// for video <video src=(video) autoPlay muted loop></video>

const Login = () => {

    //UseState to hold inputs
    const [loginUserName, setLoginUserName] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const navigateTo = useNavigate()

    //Message to the user 
    const[loginStatus, setLoginStatus] = useState('')
    const[statusHolder, setStatusHolder] = useState('message')


        //onClick we will get what the user has entered
        const loginUser = (e)=>{

            //prevent submitting 
            e.preventDefault();

            Axios.post('https://w1830501-finalyear-project-303a39317c7b.herokuapp.com/login', {
                //creating variables to be sent to the server
                LoginUserName: loginUserName,
                LoginPassword: loginPassword
            }).then((response)=>{
                console.log()

                if(response.data.message || loginUserName == '' || loginPassword == '' ) {
                    //if credentials don't match 
                    navigateTo('/') //the user navigates to the login page
                    setLoginStatus("Credetentials don't exist!")
                }
                else {
                    navigateTo('/quiz') //if login is succesfull and all match, it navigated to the dashboard
                }
            })
    
        }

        useEffect(()=>{
            if(loginStatus !== ''){
                setStatusHolder('showMessage') //show message
                setTimeout(() => {
                    setStatusHolder('message') //hide it after 4 seconds
                }, 4000);
            }
        }, [loginStatus])

      



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


                <form className='form grid' >
                    <span className={statusHolder}>{loginStatus}</span>

                    <div className="inputDiv">
                        <label htmlFor="username">Username</label>
                        <div className="input flex">
                        <FaUserShield className='icon'/>
                        <input type="text" id='username' placeholder='Enter Username' onChange={(event)=>{
                            setLoginUserName(event.target.value)
                        }}/>
                        </div>

                    </div>
                    <div className="inputDiv">
                        <label htmlFor="password">Password</label>
                        <div className="input flex">
                        <BsFillShieldLockFill className='icon'/>
                        <input type="text" id='password' placeholder='Enter Password' onChange={(event)=>{
                            setLoginPassword(event.target.value)
                        }}/>
                        </div>

                    </div>

                    <button type='submit' className='btn flex' onClick={loginUser}>
                        <span>Login</span>
                        <AiOutlineSwapRight className='icon'/>

                    </button>
               
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