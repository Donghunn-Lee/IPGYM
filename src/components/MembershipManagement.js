import React, { useState, useEffect } from "react";
import "./MembershipManagement.css";
import {useNavigate} from "react-router-dom";


const MembershipManagement = () => {
  const [expirationDate, setExpirationDate] = useState("");
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [usageHistory, setUsageHistory] = useState([]);
  const [selectedUsage, setSelectedUsage] = useState(null);

  const Navigate = useNavigate();

  const handleGoBack = () => {
    Navigate('/MainPage');
  };

  const handleButtonClick = (feature) => {
    console.log(`Clicked ${feature}`);
  };

  // 예제로 사용할 데이터
  const membershipData = {
    expirationDate: "2023-12-31",
    usageHistory: [
      { date: "2023-01-15", time: "10:30" },
      { date: "2023-02-05", time: "15:45" },
      { date: "2023-03-20", time: "18:20" },
      { date: "2023-04-01", time: "13:00" },
      { date: "2023-04-13", time: "13:20" },
    ],
  };

  useEffect(() => {
    // 만료 날짜와 사용 기록 초기화
    setExpirationDate(membershipData.expirationDate);
    setUsageHistory(membershipData.usageHistory);

    // 남은 일 수 계산
    const today = new Date();
    const expiration = new Date(membershipData.expirationDate);
    const diffTime = Math.abs(expiration - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysRemaining(diffDays);
  }, []);

  const handleUsageClick = (index) => {
    setSelectedUsage(index === selectedUsage ? null : index);
  };

  return (
    <>
    <button className="goBackButton" onClick={handleGoBack}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
  </svg>
  뒤로가기
</button>
      <div className="membership-container">
        <h2 className="membership-heading">헬스장 이용권</h2>
        <div className="membership-info">
          <p className="info-label">회원권 만기 날짜:</p>
          <p className="info-value">{expirationDate}</p>
        </div>
        <div className="membership-info">
          <p className="info-label">만기까지 남은 날짜:</p>
          <p className="info-value">{daysRemaining} 일</p>
        </div>
      </div>

      {/* <div className="membership-container">
        <h3 className="usage-heading">이용 기록</h3>
        <p className="usage-allday">사용 일 수 : {usageHistory.length}일</p>
        <ul className="usage-history">
          {usageHistory.map((usage, index) => (
            <li
              key={index}
              onClick={() => handleUsageClick(index)}
              className={index === selectedUsage ? "selected" : ""}
            >
              {usage.date} (
              {new Date(usage.date).toLocaleDateString("ko-KR", {
                weekday: "long",
              })}
              ){index === selectedUsage && <span> - {usage.time}</span>}
            </li>
          ))}
        </ul>
      </div> */}
    </>
  );
};

export default MembershipManagement;
