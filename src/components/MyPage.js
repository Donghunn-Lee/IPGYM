import React from "react";
import "./MyPage.css";

const MyPage = () => {
  return (
    <div className="my-page-container">
      {/* 프로필 영역 */}
      <div className="profile-section">
        <div className="profile-info">
          <div className="user-name">John Doe</div>
          <div className="user-email">john.doe@example.com</div>
        </div>
      </div>

      {/* 내 정보 영역 */}
      <div className="info-section">
        <div className="info-heading">내 정보</div>
        <div className="info-content">성별: 남성</div>
        <div className="info-content">나이: 30세</div>
        {/* 추가 정보 */}
      </div>

      {/* 설정 버튼 */}
      <a href="/settings" className="setting-button">
        설정
      </a>
    </div>
  );
};

export default MyPage;
