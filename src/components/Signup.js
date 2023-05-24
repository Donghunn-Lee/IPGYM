import React, { useState } from "react";
import "./Signup.css";

const Signup = (props) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 폼 데이터를 처리하는 로직을 추가할 수 있습니다.
    console.log("Submitted:", { name, email, password });
    // 폼 데이터를 서버로 전송하거나 다른 작업을 수행할 수 있습니다.
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>회원가입</h2>
      <label className="form-label">
        이름:
        <input
          className="form-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <div className="gender">
        <label className="=gender">
          성별:
          <input
            type="radio"
            value="남성"
            checked={gender === "남성"}
            onChange={handleGenderChange}
          />
          남성
        </label>
        <label>
          <input
            type="radio"
            value="여성"
            checked={gender === "여성"}
            onChange={handleGenderChange}
          />
          여성
        </label>
      </div>
      <label className="form-label">
        이메일:
        <input
          className="form-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="form-label">
        비밀번호:
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button className="form-button" type="submit">
        가입하기
      </button>
    </form>
  );
};

export default Signup;
