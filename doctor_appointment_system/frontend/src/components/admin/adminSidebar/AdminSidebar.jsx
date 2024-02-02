import { Link } from 'react-router-dom';
import React from 'react'
import './AdminSidebar.css';

const AdminSidebar = () => {
  return (
    <div className='adminsidebar'>
      <div className='adminicon'><Link to="/admin">Dashboard</Link></div>
      <div className='adminicon'><Link to="/admin/news">Add news</Link></div>
      <div className='adminicon'><Link to="/admin/admindetails">My Profile</Link></div>
      <div className='adminicon'><Link to="/admin/adminnotifications">Notifications</Link></div>
    </div>
  )
}

export default AdminSidebar