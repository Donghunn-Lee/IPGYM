import React, { useState } from "react";
import "./MemberManage.css";

const MemberManage = () => {
  const [searchName, setSearchName] = useState("");
  const [memberInfo, setMemberInfo] = useState([
    { name: "John Doe", gender: "Male", email: "johndoe@example.com" },
    { name: "최승근", gender: "male", email: "janesmith@example.com" },
    { name: "이동훈", gender: "male", email: "janesmith@example.com" },
    { name: "김혁", gender: "male", email: "janesmith@example.com" },
    { name: "전성권", gender: "male", email: "janesmith@example.com" },
    { name: "정경완", gender: "male", email: "janesmith@example.com" },
    { name: "박상혁", gender: "male", email: "janesmith@example.com" },
    { name: "함석명", gender: "male", email: "함석명@example.com" },
    { name: "함석명", gender: "Female", email: "함석명@example.com" },

    // ... 다른 회원 정보들
  ]);

  const handleSearch = () => {
    // 검색 기능을 구현합니다.
    const filteredMembers = memberInfo.filter((member) =>
      member.name.includes(searchName)
    );
    setMemberInfo(filteredMembers);
  };
  const handleReset = () => {
    // 검색 결과를 초기화합니다.
    setSearchName("");
    setMemberInfo([
      { name: "John Doe", gender: "Male", email: "johndoe@example.com" },
      { name: "최승근", gender: "male", email: "janesmith@example.com" },
      { name: "이동훈", gender: "male", email: "janesmith@example.com" },
      { name: "김혁", gender: "male", email: "janesmith@example.com" },
      { name: "전성권", gender: "male", email: "janesmith@example.com" },
      { name: "정경완", gender: "male", email: "janesmith@example.com" },
      { name: "박상혁", gender: "male", email: "janesmith@example.com" },
      { name: "함석명", gender: "male", email: "함석명@example.com" },
      { name: "함석명", gender: "Female", email: "함석명@example.com" },
    ]);
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
              </tr>
            </thead>
            <tbody>
              {memberInfo.length > 0 ? (
                memberInfo.map((member, index) => (
                  <tr key={index}>
                    <td>{member.name}</td>
                    <td>{member.gender}</td>
                    <td>{member.email}</td>
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
