import React, { useState } from "react";

const MemberManage = () => {
  // 회원가입 시 입력한 정보를 상태로 관리합니다.
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 이름 변경 핸들러
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // 성별 변경 핸들러
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  // 이메일 변경 핸들러
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // 비밀번호 변경 핸들러
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="member-container">
      <h2>회원 정보</h2>
      <div className="member-info">
        <label className="info-label">
          이름:
          <input
            className="info-input"
            type="text"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label className="info-label">
          성별:
          <input
            className="info-input"
            type="text"
            value={gender}
            onChange={handleGenderChange}
          />
        </label>
        <label className="info-label">
          이메일:
          <input
            className="info-input"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <label className="info-label">
          비밀번호:
          <input
            className="info-input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
      </div>
    </div>
  );
};

export default MemberManage;
