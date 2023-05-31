import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./PTManage.css";

function PTManage() {
  const [reservations, setReservations] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [filteredReservations, setFilteredReservations] = useState([]);

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
    const filtered = reservations.filter((reservation) => {
      const memberId = String(reservation.memberId).toLowerCase();
      return (
        reservation.memberName.toLowerCase().includes(searchValue.toLowerCase()) ||
        memberId.includes(searchValue.toLowerCase())
      );
    });
    setFilteredReservations(filtered);
  };

  const resetSearch = () => {
    setSearchValue('');
    setFilteredReservations(reservations);
  };

  useEffect(() => {
    if (searchValue === '') {
      resetSearch();
    } else {
      handleSearch();
    }
  }, [searchValue]);



  const handleDelete = () => {
    // 예약 삭제 로직을 구현하세요.
    // 삭제 확인 모달을 띄우고, 확인 시 해당 예약 정보를 삭제하도록 처리하세요.
    // 이후 fetchReservations()를 호출하여 업데이트된 예약 목록을 가져옵니다.
    setShowDeleteModal(false);
    // axios.delete(...) 등의 로직을 추가하세요.
  };

  const handleEdit = () => {
    // 예약 수정 모달을 띄우고, 수정할 예약 정보를 입력하도록 처리하세요.
    // 이후 해당 예약 정보를 삭제하고, 수정된 예약 정보를 추가하는 로직을 구현하세요.
    // axios.delete(...) 및 axios.post(...) 등의 로직을 추가하세요.
    setShowEditModal(false);
    setSelectedReservation(null);
  };



  return (
    <div className='pt-manage'>
      <h2>PT 예약 관리</h2>

      <div className="search">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="이름 또는 이메일로 검색"
        />
        <button onClick={handleSearch}>검색</button>
        <button onClick={resetSearch}>새로고침</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>이메일</th>
            <th>예약 일시</th>
            <th>트레이너</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation, index) => {
            const reservationTime = reservation.reservationTime || [0, 0, 0, 0, 0];
            return (
              <tr
                key={index}
                className={`reservation-item ${reservation.date < getCurrentDate() ? "past" : "current"}`}
              >
                <th>{reservation.memberName}</th>
                <th>{reservation.memberId}</th>
                <th>
                  {reservationTime[0]}년 {reservationTime[1]}월 {reservationTime[2]}일 {reservationTime[3] + 9} ~ {reservationTime[3] + 10}시
                </th>
                <th>{reservation.trainerName}</th>
                <th>
                  <button onClick={() => setShowEditModal(true)}>수정</button>
                  <button onClick={() => setShowDeleteModal(true)}>삭제</button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>예약 삭제</h3>
            <p>정말 삭제하시겠습니까?</p>
            <div className="modal-buttons">
              <button onClick={handleDelete}>확인</button>
              <button onClick={() => setShowDeleteModal(false)}>취소</button>
            </div>
          </div>
        </div>
      )}

      {/* 수정 모달 */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>예약 수정</h3>
            <form onSubmit={handleEdit}>
              {/* 예약 정보 입력 폼을 구현하세요 */}
              {/* 예약 정보 입력 폼의 값은 useState를 사용하여 관리하세요 */}
              {/* 예약 정보를 제출하면 handleEdit 함수가 호출되도록 처리하세요 */}
              {/* 수정된 예약 정보를 서버로 전송하여 업데이트하세요 */}
              <div className="modal-buttons">
                <button type="submit">저장</button>
                <button onClick={() => setShowEditModal(false)}>취소</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PTManage;
