// PT.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PT.css';


function PT() {
  const [PTsubscription, setPTsubscription] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [reservation, setReservation] = useState('');
  const [reservationHistory, setReservationHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  const token = localStorage.getItem('token');

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    handlePTsubscriptionLoad();
    console.log(reservationDate);
  }, []);


  const handlePTsubscriptionLoad = () => {
    axios.get("http://43.200.171.222:8080/api/pt-subscriptions/user",{
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    })
    .then(response => {
      setPTsubscription(response.data.availableCount)
      console.log(response);
    })
    .catch(error => console.log(error));
  }

  useEffect(() => {
      handleReservationHistory();
    }, []);


  // const handlePTreservationSubmit = () => {
  //   axios.post("http://43.200.171.222:8080/api/admin/pt-subscriptions?memberEmail=1@1", {
  //     "availableCount" : "10",
  //     "usedCount" : "0"
  // }, {
  //     headers: {
  //       'Authorization': 'Bearer ' + token
  //     }
  //   })
  //   .then(response => {
  //   handleReservationHistory()
  //   console.log(response);
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });
  // };

  const handlePTreservationSubmit = () => {
    axios.post("http://43.200.171.222:8080/api/reservations", {
      reservationTime: reservation,
      reservationTrainerId : 1
    }, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(response => {
    handleReservationHistory()
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
  };

  const handleReservationHistory = () => {
    axios.get("http://43.200.171.222:8080/api/user",{
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    })
    .then(response => {
      console.log(response)
      setReservationHistory(response);
    })
    .catch(error => console.log(error));
  }
  
  const handleTimeSlotClick = (hour) => {
    const selectedDateTime = new Date(reservationDate);
    selectedDateTime.setHours(hour, 0, 0, 0);
    setReservation(selectedDateTime)
    console.log(selectedDateTime);
  };


  const handleReservationDateChange = (event) => {
    setReservationDate(event.target.value);
    console.log(event.target.value);
  };


  return (
    <div className="pt-component">
      <div className="pt-box">
        <h2>PT 이용권 조회</h2>
        <h3>{PTsubscription}</h3>
        <h2>PT 예약/조회</h2>

        <div>
          <p>선택한 날짜: {selectedDate}</p>
          <input
            type="date"
            value={reservationDate}
            min={getCurrentDate()}
            onChange={handleReservationDateChange}
            style={{marginBottom:"1.5rem"}}
          />
        </div>

        <div className="time-slots">
          {[9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((hour) => (
            <div key={hour} className="time-slot" onClick={()=>handleTimeSlotClick(hour)}>
              {hour}:00 - {hour + 1}:00
            </div>
          ))}
        </div>
        


        
        <button onClick={handlePTreservationSubmit}>예약하기</button>
      </div>

      {/* <div className="pt-box reservation-history">
        <h2>PT 예약 내역</h2>
        {reservationHistory.map((reservation, index) => (
          <div
            key={index}
            className={`reservation-item ${reservation.date < getCurrentDate() ? 'past' : 'current'}`}
          >
            <p>날짜: {reservation.date}</p>
            <p>시간: {reservation.time}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default PT;

