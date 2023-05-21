import React, { useState, useEffect } from 'react';
import './GymMembership.css';

const GymMembership = () => {
  const [expirationDate, setExpirationDate] = useState('');
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [usageHistory, setUsageHistory] = useState([]);

  // 예제로 사용할 데이터
  const membershipData = {
    expirationDate: '2023-12-31',
    usageHistory: ['2023-01-15', '2023-02-05', '2023-03-20']
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

  return (
    <div className="membership-container">
      <h2 className="membership-heading">Gym Membership</h2>
      <div className="membership-info">
        <p className="info-label">Expiration Date:</p>
        <p className="info-value">{expirationDate}</p>
      </div>
      <div className="membership-info">
        <p className="info-label">Days Remaining:</p>
        <p className="info-value">{daysRemaining}</p>
      </div>
      <h3 className="usage-heading">Usage History:</h3>
      <ul className="usage-history">
        {usageHistory.map((usage, index) => (
          <li key={index}>{usage}</li>
        ))}
      </ul>
    </div>
  );
};

export default GymMembership;
