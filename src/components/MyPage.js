import React from "react";
import Button from "./Button";
import { NavLink } from "react-router-dom";
import "./MyPage.css"; // CSS 파일 import

const MyPage = () => {
  return (
    <div className="container">
      <div className="header">
        <div>반갑습니다😊</div>
      </div>

      <div className="ticket">
        <h2>헬스 피티권</h2>
        <div className="user-pt">피티권 내용이 들어갈 부분입니다.</div>
      </div>
      <div className="ticket">
        <h2>헬스 피티권2</h2>
        <div className="user-pt">피티권 내용이 들어갈 부분입니다.</div>
      </div>
      <div className="ticket">
        <h2>헬스 피티권3</h2>
        <div className="user-pt">피티권 내용이 들어갈 부분입니다.</div>
      </div>
      <div className="ticket">
        <h2>헬스 피티권4</h2>
        <div className="user-pt">피티권 내용이 들어갈 부분입니다.</div>
      </div>
    </div>
  );
};

export default MyPage;
