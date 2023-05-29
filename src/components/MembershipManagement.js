import React, { useState, useEffect } from "react";
import "./MembershipManagement.css";

const MembershipManagement = () => {
  const [expirationDate, setExpirationDate] = useState("");
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [usageHistory, setUsageHistory] = useState([]);
  const [selectedUsage, setSelectedUsage] = useState(null);

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
    </>
  );
};

export default MembershipManagement;
