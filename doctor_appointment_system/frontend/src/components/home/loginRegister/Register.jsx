import React, { useState } from 'react'
import './Register.css';
import logo from '../images/hospital.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"

const Register = () => {
    const navigate = useNavigate();
    const [registrationData, setRegistrationData] = useState(
        {
            name: "",
            email: "",
            password: "",
            role: ""
        }
    );

    const submitData = async (e) => {
        axios.post("http://localhost:8000/register", registrationData)
            .then((response) => {
                alert("Registration successful. Login now!");
                navigate('/login');
            })
            .catch(error => {
                alert('Error registering:', error);
            })
    }

    const onChange = (event) => {
        setRegistrationData({ ...registrationData, [event.target.name]: event.target.value });
    }

    return (
        <div className='register'>
            <div className='registerleft'>
                <img className='registerleftimage' src={logo} alt='logo'></img>
            </div>
            <div className='registerright'>
                <h1></h1>
                <h3>Enter your details</h3>
                <div>
                    <label className='registerlabel'>Name:</label>
                    <input className='registerinput' type="text" name="name" id='l1' value={registrationData.name} onChange={onChange} placeholder="Enter your full name" required />
                    <label className='registerlabel'>Email:</label>
                    <input className='registerinput' type="email" name="email" id='l1' value={registrationData.email} onChange={onChange} placeholder="Enter your email" required />
                    <label className='registerlabel'>Password:</label>
                    <input className='registerinput' type="text" name="password" id='l1' value={registrationData.password} onChange={onChange} placeholder="Enter new password" required />
                    <label className='registerlabel'>Role:</label>
                    <select className='registerselect' name="role" value={registrationData.role} onChange={onChange} id="role" required>
                        <option value="" disabled selected>Select your role</option>
                        {/* <option value="admin">admin</option> */}
                        <option value="doctor">doctor</option>
                        <option value="patient">patient</option>
                        <option value="others">others</option>
                    </select>
                    <div className="registerwrap">
                        <button className='registerbutton' type="submit" onClick={submitData}> Register </button>
                    </div>
                </div>
                <p>Already registered? <Link to="/login"> Login </Link> </p>
            </div>
        </div>
    )
}

export default Register