import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='doctorsidebar'>
      <div className='doctoricon'><Link to="/doctor">Dashboard</Link></div>
      <div className='doctoricon'><Link to="/doctor/doctorappointments">Appointment</Link></div>
      <div className='doctoricon'><Link to="/doctor/doctornotifications">Notifications</Link></div>
      <div className='doctoricon'><Link to="/doctor/doctorbillings">Billing</Link></div>
      <div className='doctoricon'><Link to="/doctor/doctorreports">Reports</Link></div>
      <div className='doctoricon'><Link to="/doctor/doctormessagings">Messaging</Link></div>
      <div className='doctoricon'><Link to="/doctor/doctoravailability">Update Availability</Link></div>
      <div className='doctoricon'><Link to="/doctor/doctordetails">My Profile</Link></div>
    </div>
  )
}

export default Sidebar