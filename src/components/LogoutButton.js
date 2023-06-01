import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    window.location.reload();
  };

  return <button style={{fontSize:"20px",width:"100px",height:"50px",marginTop:"20px"}} onClick={handleLogout}>로그아웃</button>;
};

export default LogoutButton;