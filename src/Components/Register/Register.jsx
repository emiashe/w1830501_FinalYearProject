import React, {useState} from 'react';
import './Register.css'
import '../../App.css'
import {Link, useNavigate} from 'react-router-dom'
import Axios from 'axios'

//import assets
import logo from '../../LoginAssets/logo.png'

//import icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { MdOutlineMailOutline } from "react-icons/md";



// for video <video src=(video) autoPlay muted loop></video>

const Register = () => {

    //UseState to hold inputs
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigateTo = useNavigate()

    //onClick we will get what the user has entered
    const createUser = (e)=>{

        e.preventDefault()

        Axios.post('https://w1830501-finalyear-project-303a39317c7b.herokuapp.com/register', {
            //creating variables to be sent to the server
            Email: email,
            UserName: userName,
            Password: password
        }).then(()=>{
            navigateTo('/')
            console.log("User has been created")

            //clear the fields
            setEmail('')
            setUserName('')
            setPassword('')
        })

    }




    return(
    <div className='registerPage flex'>
        <div className='container flex'>


            <div className='videoDiv'>
                

                <div className='textDiv'>
                    <h2 className='title'>Info about the website</h2>
                    <p>More Info</p>
                </div>

                <div className='footerDiv flex'>
                    <span className='text'>Have an account?</span>
                    <Link to={'/'}>
                    <button className='btn'>Log in</button>
                    </Link>

                </div>
            

            </div> 

            <div className="formDiv flex">
                <div className="headerDiv">
                    <img src={logo} alt='Logo Image'></img>
                    <h3>Register</h3>
                </div>


                <form action='' className='form grid'>

                    <div className="inputDiv">
                        <label htmlFor="email">Email</label>
                        <div className="input flex">
                        <MdOutlineMailOutline className='icon'/>
                        <input type="email" id='email' placeholder='Enter Email' onChange={(event)=>{
                            setEmail(event.target.value)
                        }}/>
                        </div>

                    </div>

                    <div className="inputDiv">
                        <label htmlFor="username">Username</label>
                        <div className="input flex">
                        <FaUserShield className='icon'/>
                        <input type="text" id='username' placeholder='Enter Username' onChange={(event)=>{
                            setUserName(event.target.value)
                        }}/>
                        </div>

                    </div>
                    <div className="inputDiv">
                        <label htmlFor="password">Password</label>
                        <div className="input flex">
                        <BsFillShieldLockFill className='icon'/>
                        <input type="text" id='password' placeholder='Enter Password' onChange={(event)=>{
                            setPassword(event.target.value)
                        }}/>
                        </div>

                    </div>

                    <button type='submit' className='btn flex' onClick={createUser}>
                        <span>Register</span>
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

export default Register;