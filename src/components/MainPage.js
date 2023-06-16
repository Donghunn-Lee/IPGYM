import React, { useState } from "react";
import Button from "./Button";
import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import "./MainPage.css"; // CSS 파일 import

const MainPage = () => {
  const handleButtonClick = (feature) => {
    console.log(`Clicked ${feature}`);
  };

  return (
    <div className="main-page">
      <div className="button-container">
        <NavLink exact to="/mypage" activeClassName="active">
          <Button
            text="마이페이지"
            onClick={() => handleButtonClick("마이페이지")}
          />
        </NavLink>

        <NavLink exact to="/pt" activeClassName="active">
          <Button text="PT 예약" onClick={() => handleButtonClick("PT")} />
        </NavLink>

        <NavLink exact to="/membership" activeClassName="active">
          <Button
            text="헬스장 이용권"
            onClick={() => handleButtonClick("헬스장 이용권")}
          />
        </NavLink>

        <NavLink exact to="/bmi" activeClassName="active">
          <Button text="BMI 계산기" onClick={() => handleButtonClick("BMI")} />
        </NavLink>
        <LogoutButton />
      </div>
    </div>
  );
};

export default MainPage;
