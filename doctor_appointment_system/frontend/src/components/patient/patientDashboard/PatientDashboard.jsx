import React, { useState, useEffect } from 'react';
import './PatientDashboard.css';
import axios from 'axios';
import BookNow from '../bookNow/BookNow';

const PatientDashboard = () => {
  const [doctorDetails, setDoctorDetails] = useState([]);
  const [selectedBookNow, setSelectedBookNow] = useState([]);

  const getdoctors = async () => {
    try {
      const dataset = await axios.get("http://localhost:8000/getapproveddoctors");
      setDoctorDetails(dataset.data);
    } catch (error) {
      alert(error)
    }
  };

  useEffect(() => {
    getdoctors();
  }, []);

  const toggleAvailability = (index) => {
    setSelectedBookNow((prevSelected) => {
      const isSelected = prevSelected.includes(index);
      return isSelected ? prevSelected.filter((selected) => selected !== index) : [...prevSelected, index];
    });
  };

  return (
    <div className='patientdashboard'>
      {
        doctorDetails.map((item, index) => (
          <div key={index}>
            <div className='itemclass'>
              <img className='patientdashboardimage' src={`http://localhost:8000/profileImages/` + item.profile_image} alt={item.name}></img>
              <div className='detailscss'>
                <div><h4>{item.name}</h4></div>
                <div><p>{item.specialization}</p></div>
                <div><p>{item.work_experience} years experience overall</p></div>
                <div><p><b>{item.fee_per_consultation}</b> Consultation fee at clinic</p></div>
              </div>
              <div className='bookcss'>
                <button className='bookbuttondashboard' onClick={() => toggleAvailability(index)}>Book Now</button>
              </div>
            </div>
            <div className='timingcss'>
              {selectedBookNow.includes(index) && (<BookNow id={item._id} />)}
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default PatientDashboard;
