import React, { useState } from "react";
import "./SignupForm.css";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 폼 데이터를 처리하는 로직을 추가할 수 있습니다.
    console.log("Submitted:", { name, email, password });
    // 폼 데이터를 서버로 전송하거나 다른 작업을 수행할 수 있습니다.
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label className="form-label">
        이름:
        <input
          className="form-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
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

export default SignupForm;
