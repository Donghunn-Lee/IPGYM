import React, { useState, useEffect} from "react";
import { Link, Navigate } from "react-router-dom";

const AdminLogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // 수정: 초기값을 false로 설정

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAdmin(true);
  };

  useEffect(() => {
    if (isAdmin) {
      console.log(isAdmin);
      props.setIsAdmin(true);
    }
  }, [isAdmin, props]);

  if (props.isAdmin) {
    return <Navigate to="/admin" />;
  }

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>관리자 로그인</h2>
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
        <label>
          직원코드:
          <input
            type="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </label>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default AdminLogin;
