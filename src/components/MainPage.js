import React from 'react';
import Button from './Button';

const MainPage = () => {
  const handleButtonClick = (feature) => {
    // 각 버튼에 대한 클릭 이벤트 처리 로직
    console.log(`Clicked ${feature}`);
  };

  return (
    <div className="main-page">
      <h1 className="main-title">Main Page</h1>
      <div className="button-container">
        <Button text="마이페이지" onClick={() => handleButtonClick("마이페이지")} />
        <Button text="PT 이용권" onClick={() => handleButtonClick("PT 이용권")} />
        <Button text="PT 예약" onClick={() => handleButtonClick("PT 예약")} />
        <Button text="헬스장 이용권" onClick={() => handleButtonClick("헬스장 이용권")} />
      </div>
    </div>
  );
};

export default MainPage;
