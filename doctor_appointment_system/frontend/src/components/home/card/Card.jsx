import React from 'react'
import './Card.css'

const Card = (imagedata) => {
  let image = [1,2,3,4];
  return (
    <>
    {
      image.map((item, index)=>(
        <div className="card" key={index}>
      <img className="card-image" src={item}></img>
      <h2 className="card-title">Bro </h2>
      <p className="card-text">play games</p>
      <button>Book Slot</button>
    </div>
      ))
    }
    </> 
  );
}



export default Card