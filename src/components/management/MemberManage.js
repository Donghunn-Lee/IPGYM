import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MemberManage.css";
import {useNavigate} from "react-router-dom";

const MemberManage = () => {
  const [searchName, setSearchName] = useState("");
  const [memberInfo, setMemberInfo] = useState([]);
  const token = localStorage.getItem('token');

  const Navigate = useNavigate();

  const handleGoBack = () => {
    Navigate('/Admin');
  };

  useEffect(()=>{
    loadAllMembers()
  },[])

  const loadAllMembers = () => {
    axios.get("http://43.200.171.222:8080/api/admin/GymMemberships", {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    })
      .then(response => {
        console.log(response);
        // setMemberInfo(response.data)
      })
      .catch(error => console.log(error));
  };

  const handleSearch = () => {
   
  };
  const handleReset = () => {
    
  };

  return (<>
  <button className="goBackButton" onClick={handleGoBack}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
  </svg>
  뒤로가기
</button>
    <div className="container">
      <div className="member-container">
        <h2>회원 정보</h2>
        <div className="member-info">
          <label className="info-label">
            이름 : {' '}
            <input
              className="info-input"
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </label>
          <button onClick={handleSearch}>검색</button>
          <button onClick={handleReset}>초기화</button>
        </div>

        <div className="table-container">
          <table className="member-table">
            <thead>
              <tr>
                <th>이름</th>
                <th>성별</th>
                <th>이메일</th>
                <th>헬스장 이용권</th>
                <th>PT 이용권</th>
                <th>버튼</th>
              </tr>
            </thead>
            <tbody>
              {memberInfo.length > 0 ? (
                memberInfo.map((member, index) => (
                  <tr key={index}>
                    <td>{member.name}</td>
                    <td>{member.gender}</td>
                    <td>{member.email}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="no-matching-info">
                    일치하는 회원 정보가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>);
};

export default MemberManage;
