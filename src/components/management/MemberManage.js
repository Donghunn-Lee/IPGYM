import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MemberManage.css";

const MemberManage = () => {
  const [searchName, setSearchName] = useState("");
  const [memberInfo, setMemberInfo] = useState([]);
  const [membership, setMembership] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(()=>{
    loadAllMembers();
    loadGymMembership();
  },[])

  const loadAllMembers = () => {
    axios.get("http://43.200.171.222:8080/member/admin", {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    })
      .then(response => {
        console.log(response);
        setMemberInfo(response.data)
      })
      .catch(error => console.log(error));
  };

  const loadGymMembership = () => {
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
  }



  const handleSearch = () => {
   
  };
  const handleReset = () => {
    
  };

  return (
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
  );
};

export default MemberManage;
