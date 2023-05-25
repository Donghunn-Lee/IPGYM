import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옴

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAdmin(true);
    console.log("Logged in:", { email, password, code });
    console.log("Login success");
  };

  useEffect(() => {
    if (isAdmin) {
      console.log(isAdmin);
      props.setIsAdmin(true);
      navigate("/admin"); // navigate 함수를 사용하여 /admin 경로로 이동
    }
  }, [isAdmin, props, navigate]);

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
