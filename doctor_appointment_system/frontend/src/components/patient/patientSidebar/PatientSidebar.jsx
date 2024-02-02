import React from 'react'
import './PatientSidebar.css'
import { Link } from 'react-router-dom'

const PatientSidebar = () => {
  return (
    <div className='patientsidebar'>
      <div className='patienticon'><Link to="/patient">Search Doctors</Link></div>
      <div className='patienticon'><Link to="/patient/patientappointments">Booked Appointment</Link></div>
      <div className='patienticon'><Link to="/patient/patientnotifications">Notifications</Link></div>
      <div className='patienticon'><Link to="/patient/patientbillings">Billing</Link></div>
      <div className='patienticon'><Link to="/patient/patientreports">Reports</Link></div>
      <div className='patienticon'><Link to="/patient/patientmessagings">Messaging</Link></div>
      <div className='patienticon'><Link to="/patient/patientdetails">My Profile</Link></div>
    </div>
  )
}

export default PatientSidebar