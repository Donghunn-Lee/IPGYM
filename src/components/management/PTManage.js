import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./PTManage.css";
import {useNavigate} from "react-router-dom";

function PTManage() {
  const [reservations, setReservations] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [filteredReservations, setFilteredReservations] = useState([]);

  const Navigate = useNavigate();

  const handleGoBack = () => {
    Navigate('/Admin');
  };

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
        setFilteredReservations(response.data);
        
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
   
  };

  const handleEdit = () => {
    
  };

  return (<>
    <button className="goBackButton" onClick={handleGoBack}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
    </svg>
    뒤로가기
  </button>
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
          {filteredReservations.length === 0 ? (
            <tr>
              <td colSpan="5">회원이 없습니다.</td>
            </tr>
          ) : (
            filteredReservations.map((reservation, index) => {
              const reservationTime = reservation.reservationTime || [0, 0, 0, 0, 0];
              return(
                
                  
                <tr key={index}>
                  <td>{reservation.memberName}</td>
                  <td>{reservation.memberId}</td>
                  <td>
                    {reservationTime[0]}년 {reservationTime[1]}월 {reservationTime[2]}일 {reservationTime[3] + 9} ~ {reservationTime[3] + 10}시
                  </td>
                  <td>{reservation.trainerName}</td>
                  <td>
                    <button onClick={() => setShowEditModal(true)}>수정</button>
                    <button onClick={() => setShowDeleteModal(true)}>삭제</button>
                  </td>
                  </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <div className="modall">
          <div className="modall-content">
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
        <div className="modall">
          <div className="modall-content">
            <h3>예약 수정</h3>
            <form onSubmit={handleEdit}>
              {/* 예약 정보 입력 폼을 구현하세요 */}
              {/* 예약 정보 입력 폼의 값은 useState를 사용하여 관리하세요 */}
              {/* 예약 정보를 제출하면 handleEdit 함수가 호출되도록 처리하세요 */}
              {/* 수정된 예약 정보를 서버로 전송하여 업데이트하세요 */}
              <div className="modall-buttons">
                <button type="submit">저장</button>
                <button onClick={() => setShowEditModal(false)}>취소</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
 </> );
}

export default PTManage;
