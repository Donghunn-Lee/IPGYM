import React, { useState, useEffect } from "react";
import "./MyPage.css";

const MyPage = () => {
  const [exerciseGoal, setExerciseGoal] = useState("");

  const handleGoalChange = (e) => {
    setExerciseGoal(e.target.value);
  };

  return (
    <div className="container">
      <div className="header">
        <div>회원님😊</div>
      </div>

      <div className="exercise-goal">
        <h2>운동 목적</h2>
        <select value={exerciseGoal} onChange={handleGoalChange}>
          <option value="">선택하세요</option>
          <option value="건강">건강</option>
          <option value="바디프로필">바디프로필</option>
          <option value="몸매 유지">몸매 유지</option>
          <option value="다이어트">다이어트</option>
        </select>
      </div>
    </div>
  );
};

export default MyPage;
