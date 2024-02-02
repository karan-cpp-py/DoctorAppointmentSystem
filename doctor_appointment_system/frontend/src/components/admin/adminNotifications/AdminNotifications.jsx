import React, { useEffect, useState } from 'react';
import './AdminNotifications.css';
import axios from 'axios';
import {Link} from 'react-router-dom'

const AdminNotifications = () => {
    const [approvalRequests, setApprovalRequests] = useState([]);

    const getRequests = async () => {
        try {
            const response = await axios.get("http://localhost:8000/getApprovalRequestList");
            setApprovalRequests(response.data.doctorsList);
        } catch (error) {
            alert("error fetching details");
        }
    }

    useEffect(() => {
        getRequests();
    }, []);

    return (
        <div className='adminnotifications'>
            <div className='adminnotificationsouter'>
                {
                    approvalRequests.map((item, index) => (
                        <div className='adminnotificationsrequest' key={index}>
                            <p className='adminnotificationsrequestp'>You have an approval request from {item.name}</p>
                            <Link to={`/admin/adminnotifications/viewnotificationdetail/${item._id}`}><button className='adminnotificationsrequestbutton'>View</button></Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AdminNotifications