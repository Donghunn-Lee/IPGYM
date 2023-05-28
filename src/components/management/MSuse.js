import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './MSuse.css'; // CSS 파일을 import

const MSuse = () => {
  const [showChart, setShowChart] = useState(false);
  const [yearIndex, setYearIndex] = useState(false);

  const years = ['2022 년', '2023 년', '2024 년'];

  // 회원별 월별 이용 통계 데이터 예시
  const usageData = [[//2022년
    { month: '1월', Members: 20 },
    { month: '2월', Members: 80 },
    { month: '3월', Members: 90 },
    { month: '4월', Members: 60 },
    { month: '5월', Members: 75 },
    { month: '6월', Members: 85 },
    { month: '7월', Members: 100 },
    { month: '8월', Members: 92 },
    { month: '9월', Members: 98 },
    { month: '10월', Members: 103 },
    { month: '11월', Members: 120 },
    { month: '12월', Members: 140 },
  ],
  [//2023년
    { month: '1월', Members: 170 },
    { month: '2월', Members: 200 },
    { month: '3월', Members: 188 },
    { month: '4월', Members: 150 },
    { month: '5월', Members: 129 },
    { month: '6월', Members: 140 },
    { month: '7월', Members: 145 },
    { month: '8월', Members: 145 },
    { month: '9월', Members: 85 },
    { month: '10월', Members: 75 },
    { month: '11월', Members: 70 },
    { month: '12월', Members: 55 },
  ],
  [//2024년
    { month: '1월', Members: 48 },
    { month: '2월', Members: 42 },
    { month: '3월', Members: 40 },
    { month: '4월', Members: 33 },
    { month: '5월', Members: 30 },
    { month: '6월', Members: 24 },
    { month: '7월', Members: 0 },
    { month: '8월', Members: 0 },
    { month: '9월', Members: 0 },
    { month: '10월', Members: 0 },
    { month: '11월', Members: 0 },
    { month: '12월', Members: 0 },
  ]];

  // PT 회원별 월별 통계 데이터 예시
  const ptData = [[//2022년
    { month: '1월', ptMembers: 5 },
    { month: '2월', ptMembers: 8 },
    { month: '3월', ptMembers: 14 },
    { month: '4월', ptMembers: 10 },
    { month: '5월', ptMembers: 15 },
    { month: '6월', ptMembers: 23 },
    { month: '7월', ptMembers: 15 },
    { month: '8월', ptMembers: 15 },
    { month: '9월', ptMembers: 11 },
    { month: '10월', ptMembers: 20 },
    { month: '11월', ptMembers: 31 },
    { month: '12월', ptMembers: 26 },
  ],
  [//2023년
    { month: '1월', ptMembers: 52 },
    { month: '2월', ptMembers: 44 },
    { month: '3월', ptMembers: 44 },
    { month: '4월', ptMembers: 40 },
    { month: '5월', ptMembers: 38 },
    { month: '6월', ptMembers: 45 },
    { month: '7월', ptMembers: 42 },
    { month: '8월', ptMembers: 38 },
    { month: '9월', ptMembers: 36 },
    { month: '10월', ptMembers: 20 },
    { month: '11월', ptMembers: 16 },
    { month: '12월', ptMembers: 10 },
  ],
  [//2024년
    { month: '1월', ptMembers: 8 },
    { month: '2월', ptMembers: 8 },
    { month: '3월', ptMembers: 6 },
    { month: '4월', ptMembers: 4 },
    { month: '5월', ptMembers: 3 },
    { month: '6월', ptMembers: 1 },
    { month: '7월', ptMembers: 0 },
    { month: '8월', ptMembers: 0 },
    { month: '9월', ptMembers: 0 },
    { month: '10월', ptMembers: 0 },
    { month: '11월', ptMembers: 0 },
    { month: '12월', ptMembers: 0 },
  ]];

  const toggleChart = () => {
    setShowChart(!showChart);
  };

  const handlePreviousYear = () => {
    setYearIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextYear = () => {
    setYearIndex((prevIndex) => prevIndex + 1);
  };

  const currentYearData = usageData[yearIndex];

  return (
    <div className="usage-statistics">
      <div className="hbackground">
        <h2>통계</h2>
        <button disabled={yearIndex === 0} onClick={handlePreviousYear}>
          이전년도
        </button>
        <span className="current-year">{years[yearIndex]}</span>
        <button disabled={yearIndex === years.length - 1} onClick={handleNextYear}>
          다음년도
        </button>
        <button className="toggle-button" onClick={toggleChart}>
          {showChart ? '회원 수 통계 보기' : 'PT 통계 보기'}
        </button>
      </div>
      <div className="chart-container">
        {showChart ? (
          <div>
            <h3>PT 회원 수 {years[yearIndex]} 통계</h3>
            <LineChart width={950} height={550} data={ptData[yearIndex]}>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Tooltip />
              <Legend />
              <Line type="linear" dataKey="ptMembers" stroke="#ff7300" activeDot={{ r: 8 }} />
            </LineChart>
          </div>
        ) : (
          <div>
            <h3>회원 수 {years[yearIndex]} 통계</h3>
            <LineChart width={950} height={550} data={usageData[yearIndex]}>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Tooltip />
              <Legend />
              <Line type="linear" dataKey="Members" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default MSuse;
