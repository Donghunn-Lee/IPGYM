import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './MSuse.css'; // CSS 파일을 import

const UsageStatistics = () => {
  const [showChart, setShowChart] = useState(false);

  // 회원별 월별 이용 통계 데이터 예시
  const usageData = [
    { month: '1월', Members: 20 },
    { month: '2월', Members: 80 },
    { month: '3월', Members: 90 },
    { month: '4월', Members: 60 },
    { month: '5월', Members: 75 },
    { month: '6월', Members: 85 }
  ];

  // PT 회원별 월별 통계 데이터 예시
  const ptData = [
    { month: '1월', ptMembers: 5 },
    { month: '2월', ptMembers: 8 },
    { month: '3월', ptMembers: 14 },
    { month: '4월', ptMembers: 10 },
    { month: '5월', ptMembers: 15 },
    { month: '6월', ptMembers: 23 }
  ];

  const toggleChart = () => {
    setShowChart(!showChart);
  };

  return (
    <div className="usage-statistics">
      <div className="hbackground">
      <h2>통계</h2>
      <button className="toggle-button" onClick={toggleChart}>
        {showChart ? '이용 통계 보기' : 'PT 통계 보기'}
      </button></div>
      <div className="chart-container">
        {showChart ? (
          <div>
            <h3>PT 회원별 월별 통계</h3>
            <LineChart width={1000} height={600} data={ptData}>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="ptMembers" stroke="#ff7300" activeDot={{ r: 8 }} />
            </LineChart>
          </div>
        ) : (
          <div>
            <h3>회원별 월별 이용 통계</h3>
            <LineChart width={1000} height={600} data={usageData}>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Members" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsageStatistics;
