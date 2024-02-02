import React, { useEffect, useState } from 'react';
import './BookNow.css';
import axios from 'axios';

const BookNow = ({ id }) => {
    const [availability, setAvailability] = useState({});
    const [selectedSlot, setSelectedSlot] = useState(null);

    const getDoctorsDetails = async () => {
        try {
            const dataset = await axios.get(`http://localhost:8000/getdoctoravailability/${id}`);
            console.log(dataset.data);
            setAvailability(dataset.data);
        } catch (error) {
            alert("error fetching doctor details");
        }
    };

    useEffect(() => {
        getDoctorsDetails();
    }, []);

    const generateTimeSlots = (from, to, slotTime) => {
        const slots = [];
        let currentTime = new Date(0, 0, 0, ...from.split(':').map(Number));
        const endTime = new Date(0, 0, 0, ...to.split(':').map(Number));
        while (currentTime < endTime) {
            const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            slots.push(formattedTime);
            currentTime.setMinutes(currentTime.getMinutes() + slotTime);
        }
        return slots;
    };

    const handleBookAppointment = (timeSlot) => {
        //console.log(`Appointment booked for ${timeSlot}`);
        setSelectedSlot(timeSlot);
    };

    return (
        <div>
            {availability && availability.morning && (
                <div className='doctor-availability-item'>
                    <p><h4>Morning</h4> {generateTimeSlots(availability.morning.from, availability.morning.to, availability.time_slot).map((slot, index) => (
                        <button className='booknowbutton' key={index} onClick={() => handleBookAppointment(slot)} disabled={selectedSlot === slot}>
                            {slot}
                        </button>
                    ))}</p>
                    {availability.afternoon && (
                        <p><h4>Afternoon</h4> {generateTimeSlots(availability.afternoon.from, availability.afternoon.to, availability.time_slot).map((slot, index) => (
                            <button className='booknowbutton' key={index} onClick={() => handleBookAppointment(slot)} disabled={selectedSlot === slot}>
                                {slot}
                            </button>
                        ))}</p>
                    )}
                    {availability.evening && (
                        <p><h4>Evening</h4> {generateTimeSlots(availability.evening.from, availability.evening.to, availability.time_slot).map((slot, index) => (
                            <button className='booknowbutton' key={index} onClick={() => handleBookAppointment(slot)} disabled={selectedSlot === slot}>
                                {slot}
                            </button>
                        ))}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default BookNow;
