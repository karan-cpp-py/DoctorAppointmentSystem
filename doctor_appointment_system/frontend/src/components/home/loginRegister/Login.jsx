import React, { useState } from 'react'
import './Login.css'
import logo from '../images/hospital.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = () => {
  const [registrationData, setRegistrationData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const submitData = async (e) => {
    axios.post("http://localhost:8000/login", registrationData).
      then(response => {
        localStorage.setItem("authToken", response.data.authToken);
        localStorage.setItem("userid",response.data.userData._id);
        //console.log(localStorage.getItem("authToken"));
        //console.log(response.data);
        if(response.data.userData.role === "admin"){
          navigate(`/admin`);
        }
        else if(response.data.userData.role === "doctor"){
          navigate(`/doctor`);
        }
        else if(response.data.userData.role === "patient"){
          navigate(`/patient`);
        }
        else if(response.data.userData.role === "others"){
          navigate('/');
        }
      })
      .catch(error => {
        alert('Error logging in');
      })
  }

  const onChange = (event) => {
    setRegistrationData({ ...registrationData, [event.target.name]: event.target.value });
  }

  return (
    <div className='login'>
      <div className='loginleft'>
        <img className='loginleftimage' src={logo} alt='logo'></img>
      </div>
      <div className='loginright'>
        <h1></h1>
        <h3>Enter your login credentials</h3>
        <div>
          <label className='loginlabel'>Email:</label>
          <input className='logininput' type="email" name="email" id='l5' value={registrationData.email} onChange={onChange} placeholder="Enter your email" required />
          <label className='loginlabel'>Password:</label>
          <input className='logininput' type="password" name="password" id='l6' value={registrationData.password} onChange={onChange} placeholder="Enter new password" required />
          <div className="wrap">
            <button className='loginbutton' type="submit" onClick={submitData}> Submit </button>
          </div>
        </div>
        <p>Not registered? <Link to="/register"> Create an account </Link> </p>
      </div>
    </div>
  )
}

export default Login