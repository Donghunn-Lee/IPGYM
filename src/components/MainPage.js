import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./MainPage.css";

const MainPage = () => {
  const handleButtonClick = (feature) => {
    console.log(`Clicked ${feature}`);
  };

  const [showSignupForm, setShowSignupForm] = useState(false);

  const toggleSignupForm = () => {
    setShowSignupForm(!showSignupForm);
  };

  return (
    <div className="main-page">
      <div className="banner">
        <h1 className="main-title">Welcome to IPGYM</h1>
        <p className="slogan">머라고 하셧슴미까 해엉님?</p>
        <img
          src="/지금 뭐라고 하셨습니까 회원님.png"
          alt="Fitness Image"
          className="banner-image"
        />
        <img
        style={{width:"200px", position:"absolute", top:"30%", left:"60%"}}
          src="/흰둥이법규.png"
          alt="Fitness Image"
          className="banner-image"
        />
      </div>

      <div className="button-container">
        <NavLink exact to="/login" activeClassName="active">
          <button className="button" onClick={() => handleButtonClick("로그인")}>
            로그인
          </button>
        </NavLink>
        <NavLink exact to="/mypage" activeClassName="active">
          <button className="button" onClick={() => handleButtonClick("마이페이지")}>
            마이페이지
          </button>
        </NavLink>
        <NavLink exact to="/pt" activeClassName="active">
          <button className="button" onClick={() => handleButtonClick("PT 예약/조회")}>
            PT 예약/조회
          </button>
        </NavLink>
        <NavLink exact to="/membership" activeClassName="active">
          <button className="button" onClick={() => handleButtonClick("헬스장 이용권")}>
            헬스장 이용권
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default MainPage;
