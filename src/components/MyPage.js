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
  const [showEditModal, setShowEditModal]=useState(false);
  const [showDeleteModal, setShowDeleteModal]=useState(false);
  const [trainerlist, setTrainerList] = useState([]);
  const [editedReservation, setEditedReservation] = useState('');
  const [targetReservation, setTargetReservation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTrainer, setSelectedTrainer] = useState("");

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

  useEffect(() => {
    axios
      .get("http://43.200.171.222:8080/api/trainer", {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      })
      .then(response => {
        setTrainerList(response.data);
        console.log(response.data);
      })
      .catch(error => console.log(error));
  }, []);

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

  const handleReservationUpdate = (targetReservation) => {
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(selectedTime, 0, 0, 0);
    const formattedDateTime = [
      selectedDateTime.getFullYear(),
      selectedDateTime.getMonth() + 1,
      selectedDateTime.getDate(),
      selectedDateTime.getHours(),
      selectedDateTime.getMinutes()
    ];
    console.log(selectedDate);
    console.log(selectedTime);
    console.log(formattedDateTime);
    console.log(selectedTrainer);
    axios
      .patch(`http://43.200.171.222:8080/api/reservations/${targetReservation.id}`, {
        reservationTime: formattedDateTime,
        reservationTrainerId: selectedTrainer
      }, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(response => {
        handleReservationHistory();
        console.log(response);
        // setShowEditModal(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleReservationCancel = (targetReservation) => {
    axios
      .delete(`http://43.200.171.222:8080/api/reservations${targetReservation.id}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(response => {
        handleReservationHistory();
        console.log(response);
        setShowDeleteModal(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

useEffect(()=>{
  console.log(targetReservation);
},[targetReservation])

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    const timeValue = parseInt(event.target.value, 10);
    setSelectedTime(timeValue);
  };

  const handleTrainerChange = (event) => {
    setSelectedTrainer(event.target.value);
  };

 
  
  return (
    <div className="container">
      <div className="header">
        <div>{userName} 회원님😊</div>
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
                    일시 :{" "}
                    {`${reservation.reservationTime[0]}년 ${
                      reservation.reservationTime[1]
                    }월 ${reservation.reservationTime[2]}일 ${
                      reservation.reservationTime[3]
                    }~${reservation.reservationTime[3] + 1}시`}
                  </p>
                  <p>담당 트레이너 : {reservation.trainerName}</p>
                  <div>
                    <button onClick={() => {setShowEditModal(true);setTargetReservation(reservation)}}>
                      수정
                    </button>
                    <button onClick={() => {setShowDeleteModal(true);setTargetReservation(reservation)}}>
                      삭제
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
          {showEditModal && (
            <div className="modalll">
              <div className="modalll-content">
                <form>
                  <label>
                    날짜
                    <input type="date" min={getCurrentDate()} value={selectedDate} onChange={handleDateChange} />
                  </label>
                  <label>
                    시간
                    <select value={selectedTime} onChange={handleTimeChange}>
                      <option value="">예약 시간(9 ~ 21)</option>
                      {Array.from({ length: 13 }, (_, index) => index + 9).map((hour) => (
                        <option key={hour} value={`${hour}:00`}>
                          {`${hour}:00`}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    담당 트레이너
                    <select value={selectedTrainer} onChange={handleTrainerChange}>
                      <option value="">담당 트레이너 선택</option>
                      {trainerlist.map(trainer => (
                      <option key={trainer.id} value={trainer.id}>{trainer.name}</option>
                    ))}
                    </select>
                  </label>
                </form>
                <p>PT예약을 수정하시겠습니까?</p>
                <div className="modalll-buttons">
                  <button onClick={() => handleReservationUpdate(targetReservation)}>수정</button>
                  <button onClick={() => setShowEditModal(false)}>취소</button>
                </div>
              </div>
            </div>
          )}
          {showDeleteModal && (
            <div className="modalll">
              <div className="modalll-content">
                <h3>예약 취소</h3>
                {/* <p>{targetReservation.reservationTime}</p>
                <p>{targetReservation.trainerName}</p> */}
                <p>PT예약을 취소하시겠습니까?</p>
                <div className="modalll-buttons">
                  <button onClick={()=>handleReservationCancel(targetReservation)}>확인</button>
                  <button onClick={() => setShowDeleteModal(false)}>취소</button>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default MyPage;
