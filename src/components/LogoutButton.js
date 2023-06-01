import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 처리 로직 작성
    // ...

    // 예시: 로그아웃 후 홈페이지로 이동
    navigate("/login");
    window.location.reload();
  };

  return <button onClick={handleLogout}>로그아웃</button>;
};

export default LogoutButton;
