import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Button from "./Button";
import MyPage from "./MyPage";

const MainPage = () => {
  const [showMyPage, setShowMyPage] = useState(false);

  const handleButtonClick = (feature) => {
    if (feature === "마이페이지") {
      setShowMyPage(true);
    } else {
      console.log(`Clicked ${feature}`);
    }
  };

  return (
    <Router>
      <div className="main-page">
        <h1 className="main-title">Main Page</h1>
        <div className="button-container">
          <Button
            text="마이페이지"
            onClick={() => handleButtonClick("마이페이지")}
          />
          <Button
            text="PT 이용권"
            onClick={() => handleButtonClick("PT 이용권")}
          />
          <Button text="PT 예약" onClick={() => handleButtonClick("PT 예약")} />
          <Button
            text="헬스장 이용권"
            onClick={() => handleButtonClick("헬스장 이용권")}
          />
        </div>

        <Routes>
          <Route path="/" element={<MainContent showMyPage={showMyPage} />} />
          <Route path="/myPage" element={<MyPage />} />
        </Routes>
      </div>
    </Router>
  );
};

const MainContent = ({ showMyPage }) => {
  return showMyPage ? null : (
    <div>
      {/* 메인페이지의 내용 */}
      <Link to="/myPage">마이페이지로 이동</Link>
    </div>
  );
};

export default MainPage;
