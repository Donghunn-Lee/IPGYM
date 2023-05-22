import React, { useState, useEffect} from "react";
import { Link, Navigate } from "react-router-dom";
import "./Login.css";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 처리 로직 추가
    console.log("Logged in:", { email, password });
    setIsAuthenticated(true);
    console.log('Login success');
    console.log(isAuthenticated);
    // 서버로 로그인 데이터를 전송하거나 다른 작업을 수행할 수 있습니다.
  };

  useEffect(() => {
    if (isAuthenticated) {
      
      console.log(isAuthenticated);
      props.setIsAuthenticated(true);
    }
  }, [isAuthenticated, props]);

  if (props.IsAuthenticated) {
    return <Navigate to="/mainpage" />;
  }

  return (
    <div>
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
        <button type="submit" onClick={handleSubmit}>로그인</button>
        <Link to="/signup">회원가입</Link>
      </form>
      <Link id="manager-login" to="/adminlogin">관리자 로그인</Link>
    </div>
  );
};

export default Login;
