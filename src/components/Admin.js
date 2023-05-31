import React, { useState } from "react";
import Button from "./Button";
import { NavLink } from "react-router-dom";

const Admin = () => {
  const handleButtonClick = (feature) => {
    console.log(`Clicked ${feature}`);
  };

  return (
    <div className="main-page">
      
      <div className="button-container">
        {/* <NavLink exact to="/login" activeClassName="active">
             <Button text="로그인" onClick={() => handleButtonClick("로그인")} />
           </NavLink> */}
        <NavLink exact to="/membermanage" activeClassName="active">
          <Button
            text="회원관리"
            onClick={() => handleButtonClick("마이페이지")}
          />
        </NavLink>

        <NavLink exact to="/ptmanage" activeClassName="active">
          <Button text="PT 관리" onClick={() => handleButtonClick("PT")} />
        </NavLink>
        <NavLink exact to="/MSuse" activeClassName="active">
          <Button
            text="헬스장 이용권 관리"
            onClick={() => handleButtonClick("헬스장 이용권")}
          />
        </NavLink>
      </div>
    </div>
  );
};

export default Admin;
