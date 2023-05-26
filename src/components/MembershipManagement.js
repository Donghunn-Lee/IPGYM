import React from 'react';
import Button from './Button';



const MembershipManagement = () => {


  return (
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
      <h3 className="usage-heading">이용 기록:</h3>
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
    </div>
  );
};

export default MembershipManagement;
