import React, { useState } from "react";
import "./Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 처리 로직 추가
    console.log("Logged in:", { email, password });
    // 서버로 로그인 데이터를 전송하거나 다른 작업을 수행할 수 있습니다.
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>로그인</h2>
      <label>
        이메일:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        비밀번호:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">로그인</button>
    </form>
  );
};

export default Login;
