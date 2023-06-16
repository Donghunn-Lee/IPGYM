import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyPage.css";

const MyPage = () => {
  const [exerciseGoal, setExerciseGoal] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [usageHistory, setUsageHistory] = useState([]);
  const [selectedUsage, setSelectedUsage] = useState(null);
  const [reservationHistory, setReservationHistory] = useState([]);
  const [reservationHistoryCheck, setReservationHistoryCheck] = useState([]);
  const token = localStorage.getItem("token");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    loadName();
  }, []);

  const loadName = () => {
    axios
      .get("http://43.200.171.222:8080/me", {
      
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUserName(response.data.name);
      })
      .catch((error) => console.log(error));
  };

  const handleGoalChange = (e) => {
    setExerciseGoal(e.target.value);
  };

  // 헬스장 이용내역
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
    const clickedReservation = reservationHistory[index];
    showPopup(clickedReservation);
  };
  

  useEffect(() => {
    handleReservationHistory();
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleReservationHistory = () => {
    axios
      .get("http://43.200.171.222:8080/api/user", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const sortedReservationHistory = response.data.sort((a, b) => {
          const timeA = a.reservationTime
            ? new Date(
                a.reservationTime[0],
                a.reservationTime[1] - 1,
                a.reservationTime[2],
                a.reservationTime[3]
              )
            : null;
          const timeB = b.reservationTime
            ? new Date(
                b.reservationTime[0],
                b.reservationTime[1] - 1,
                b.reservationTime[2],
                b.reservationTime[3]
              )
            : null;
          return timeA - timeB;
        });
        console.log(sortedReservationHistory);
        setReservationHistory(sortedReservationHistory);
      })
      .catch((error) => console.log(error));
  };

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  
  const showPopup = (reservation) => {
    setSelectedReservation(reservation);
    setPopupVisible(true);
  };
  
  const hidePopup = () => {
    setPopupVisible(false);
  };
  
  const handleReservationUpdate = (updatedReservation) => {
    // 여기에 예약 정보를 업데이트하는 API 요청 코드를 추가해주세요
    // 성공적으로 업데이트가 완료되면 알림창을 표시해줄 수 있습니다
    // 예: showNotification("예약이 수정되었습니다.");
  };
  
  const handleReservationCancel = (reservationId) => {
    // 여기에 예약을 취소하는 API 요청 코드를 추가해주세요
    // 성공적으로 예약이 취소되면 알림창을 표시해줄 수 있습니다
    // 예: showNotification("예약이 취소되었습니다.");
  };
  
  
  return (
    <div className="container">
      <div className="header">
        <div>{userName}회원님😊</div>
      </div>

      <div className="exercise-goal">
        <h3 style={{ color: "black" }} className="usage-heading">
          이용 기록
        </h3>
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
              )
              {index === selectedUsage && <span> - {usage.time}</span>}
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-history">
        <h2>PT 예약 내역</h2>

        {reservationHistory &&
          reservationHistory.map((reservation, index) => (
            <div
              key={index}
              className={`reservation-item ${
                reservation.reservationTime &&
                reservation.reservationTime[0] < getCurrentDate()
                  ? "past"
                  : "current"
              }`}
            >
              {reservation.reservationTime && (
                <>
                  <p>
                    예약 일시 :{" "}
                    {`${reservation.reservationTime[0]}년 ${
                      reservation.reservationTime[1]
                    }월 ${reservation.reservationTime[2]}일 ${
                      reservation.reservationTime[3]
                    } ~ ${reservation.reservationTime[3] + 1}시`}
                  </p>
                  <p>담당 트레이너 : {reservation.trainerName}</p>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyPage;
