import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./PTManage.css";

function PTManage() {
  const [reservations, setReservations] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const token = localStorage.getItem('token');

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = () => {
    axios.get("http://43.200.171.222:8080/api/admin/reservations", {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    })
      .then(response => {
        setReservations(response.data);
        console.log(reservations);
      })
      .catch(error => console.log(error));
  };

  const handleSearch = () => {
    const searchTarget = reservations.find((target) => target.email === searchValue);
    setReservations(searchTarget);
  };

  return (
    <div className='pt-manage'>
      <h2>PT 예약 관리</h2>

      <div className>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="이름 또는 이메일로 검색"
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>이메일</th>
            <th>예약 일시</th>
            <th>트레이너</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr
              key={index}
              className={`reservation-item ${reservation.date < getCurrentDate() ? "past" : "current"}`}
            >
              <th>{reservation.memberName}</th>
              <th>{reservation.memberId}</th>
              <th>{reservation.reservationTime[0]}년{" "}
              {reservation.reservationTime[1]}월{" "}
              {reservation.reservationTime[2]}일{" "}
              {reservation.reservationTime[3]+9}{' ~ '}{reservation.reservationTime[3]+10}시</th>
              <th>{reservation.trainerName}</th>
            </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default PTManage;
