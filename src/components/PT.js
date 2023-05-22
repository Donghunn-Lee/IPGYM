// PT.js

import React, { useState, useEffect } from 'react';
import './PT.css';

function PT() {
  const [availablePackages, setAvailablePackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [reservationHistory, setReservationHistory] = useState([]);

  useEffect(() => {
    fetchAvailablePackages();
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchAvailablePackages = () => {
    const response = [
      { id: 1, name: 'PT Package 1', trainer: 'Trainer A', remaining: 5 },
      { id: 2, name: 'PT Package 2', trainer: 'Trainer B', remaining: 10 },
      { id: 3, name: 'PT Package 3', trainer: 'Trainer C', remaining: 3 },
    ];
    setAvailablePackages(response);
  };

  const handlePackageSelect = (event) => {
    const packageId = event.target.value;
    const selected = availablePackages.find((pkg) => pkg.id === parseInt(packageId));
    setSelectedPackage(selected);
  };

  const handleReservationDateChange = (event) => {
    setReservationDate(event.target.value);
  };

  const handleReservationTimeChange = (event) => {
    setReservationTime(event.target.value);
  };

  const handleReservationSubmit = () => {
    const reservation = {
      packageId: selectedPackage.id,
      package: selectedPackage.name,
      trainer: selectedPackage.trainer,
      date: reservationDate,
      time: reservationTime,
    };
    setReservationHistory([...reservationHistory, reservation]);
  };

  return (
    <div className="pt-component">
      <div className="pt-box">
        <h2>PT 이용권 조회</h2>
        <select onChange={handlePackageSelect}>
          <option value="">이용권 선택</option>
          {availablePackages.map((pkg) => (
            <option key={pkg.id} value={pkg.id}>
              {pkg.name} (트레이너: {pkg.trainer})
            </option>
          ))}
        </select>
        {selectedPackage && (
          <div className="selected-package">
            <p>{selectedPackage.name}</p>
            <p>트레이너: {selectedPackage.trainer}</p>
          </div>
        )}
      </div>

      {selectedPackage && (
        <div className="pt-box">
          <h2>PT 예약/조회</h2>
          <p>예약 날짜: <input type="date" value={reservationDate} onChange={handleReservationDateChange} /></p>
          <p>예약 시간: <input type="time" value={reservationTime} onChange={handleReservationTimeChange} /></p>
          <button onClick={handleReservationSubmit}>예약하기</button>
        </div>
      )}

      <div className="pt-box reservation-history">
        <h2>PT 예약 내역</h2>
        {reservationHistory.map((reservation, index) => (
          <div key={index} className={`reservation-item ${reservation.date < getCurrentDate() ? 'past' : 'current'}`}>
            <p>이용권: {reservation.package}</p>
            <p>트레이너: {reservation.trainer}</p>
            <p>날짜: {reservation.date}</p>
            <p>시간: {reservation.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PT;
