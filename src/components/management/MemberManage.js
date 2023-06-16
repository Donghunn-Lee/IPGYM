import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MemberManage.css";
import { useNavigate } from "react-router-dom";

const MemberManage = () => {
  const [searchText, setSearchText] = useState("");
  const [memberInfo, setMemberInfo] = useState([]);
  const [filteredMemberInfo, setFilteredMemberInfo] = useState([]);
  const [membership, setMembership] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [ptSubscription, setPtSubscription] = useState(0);
  const [gymMembership, setGymMembership] = useState([]);
  const [addPTsubscription, setAddPTsubscription] = useState([]);
  const [addGymMembership, setAddGymMembership] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  
  const token = localStorage.getItem("token");
  const Navigate = useNavigate();
  const handleGoBack = () => {
    Navigate("/Admin");
  };

  useEffect(() => {
    loadAllMembers();
    loadGymMembership();
  }, []);

  const loadAllMembers = () => {
    axios
      .get("http://43.200.171.222:8080/api/admin/members", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        setMemberInfo(response.data);
        setFilteredMemberInfo(response.data); // 모든 멤버 정보를 저장하고, 필터링된 정보도 초기화
      })
      .catch((error) => console.log(error));
  };

  const loadGymMembership = () => {
    axios
      .get("http://43.200.171.222:8080/api/admin/GymMemberships", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        setMembership(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = () => {
    const filtered = memberInfo.filter((member) => {
      const memberId = String(member.memberId).toLowerCase();
      return (
        member.memberName.toLowerCase().includes(searchValue.toLowerCase()) ||
        memberId.includes(searchValue.toLowerCase())
      );
    });
    setFilteredMemberInfo(filtered);
  };

  const resetSearch = () => {
    setSearchValue('');
    setFilteredMemberInfo(memberInfo);
  };

  useEffect(() => {
    if (searchValue === '') {
      resetSearch();
    } else {
      handleSearch();
    }
  }, [searchValue]);

  const handleModalOpen = (member) => {
    setSelectedMember(member);
    console.log(member);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedMember(null);
    setPtSubscription(0);
    setGymMembership([]);
  };

  const handlePtSubscriptionChange = (e) => {
    setPtSubscription(parseInt(e.target.value));
  };

  const handleGymMembershipMonthsChange = (e) => {
    setGymMembership((prevMembership) => ({
      ...prevMembership,
      months: parseInt(e.target.value),
    }));
    console.log(gymMembership);
  };

  const handleAddPTsubscription = (member) => {
    if (member.ptSubscription === 0) {
      axios
        .post(
          `http://43.200.171.222:8080/api/admin/pt-subscriptions?memberEmail=${member.email}`,
          {
            availableCount: ptSubscription,
            usedCount: "0",
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          handleModalClose();
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .patch(
          `http://43.200.171.222:8080/api/admin/pt-subscriptions?memberEmail=${member.email}`,
          {
            availableCount: member.ptSubscription + ptSubscription,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          handleModalClose();
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    loadAllMembers();
  }, [showModal]);

  const handleAddGymMembership = (gymMembership, member) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
    const day = currentDate.getDate();
    const dateArray = [year, month, day];
    let StartDate = dateArray;
    let endDate = dateArray;

    if (member.gymMembershipEnd > dateArray) {
      StartDate = member.gymMembershipStart;
      endDate = member.gymMembershipEnd;
    }

    console.log(StartDate);
    console.log([endDate[0], endDate[1] + gymMembership.months, endDate[2]]);

    axios
      .patch(
        `http://43.200.171.222:8080/api/admin/GymMembership/memberEmail=${member.email}`,
        {
          startDate: StartDate,
          endDate: [endDate[0], endDate[1] + gymMembership.months, endDate[2]],
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const handleDeletePTSubscription = (member) => {
    axios
      .delete(
        `http://43.200.171.222:8080/api/admin/pt-subscriptions?memberEmail=${member.email}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        handleModalClose();
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteGymMembership = (member) => {
    axios
      .delete(
        `http://43.200.171.222:8080/api/admin/GymMembership/meberEmail=${member.email}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  

  return (
    <>
      <button className="goBackButton" onClick={handleGoBack}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
        뒤로가기
      </button>
      <div className="container">
        <div className="member-container">
          <h2>회원 정보</h2>
          <div className="member-info">
            <label className="info-label">
              이름 :{" "}
              <input
                className="info-input"
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </label>
            <button onClick={handleSearch}>검색</button>
            <button onClick={resetSearch}>초기화</button>
          </div>

          <div className="table-container">
            <table className="member-table">
              <thead>
                <tr style={{ fontSize: "16px" }}>
                  <th>이름</th>
                  <th>성별</th>
                  <th>이메일</th>
                  <th>헬스장 이용권</th>
                  <th>PT 이용권</th>
                  <th>버튼</th>
                </tr>
              </thead>
              <tbody>
                {memberInfo.length > 0 ? (
                  memberInfo.map((member, index) => (
                    <tr key={index}>
                      <td>{member.name}</td>
                      <td>{member.gender}</td>
                      <td>{member.email}</td>
                      <td>
                        {member.gymMembershipEnd} ~ {member.gymMembershipStart}
                      </td>
                      <td>{member.ptSubscription}</td>
                      <td>
                        <button
                          className="aaa"
                          onClick={() => handleModalOpen(member)}
                        >
                          수정
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="no-matching-info">
                      일치하는 회원 정보가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && selectedMember && (
        <div className="modallll">
          <div className="modallll-content">
            <p
              style={{ textAlign: "right" }}
              className="close"
              onClick={() => handleModalClose()}
            >
              닫기
            </p>
            <h2 style={{ marginTop: "0", marginBottom: "30px" }}>
              {selectedMember.name} 회원 수정
            </h2>

            <label className="modallll-label">
              PT 이용권:
              <input
                type="number"
                value={ptSubscription}
                onChange={handlePtSubscriptionChange}
              />
              <button
                className="modallll-button"
                onClick={() => handleAddPTsubscription(selectedMember)}
              >
              PT 이용권 추가
              </button>
              {selectedMember.ptSubscription > 0 && (
                <button
                  className="modallll-button"
                  onClick={() => handleDeletePTSubscription(selectedMember)}
                >
                  PT 이용권 삭제
                </button>
              )}

              <label className="modallll-label">
                헬스장 이용권 시작 시간 :{" "}
                {selectedMember.gymMembershipStart[0]}-
                {selectedMember.gymMembershipStart[1]}-
                {selectedMember.gymMembershipStart[2]}
              </label>
              <label className="modallll-label">
                헬스장 이용권 개월 수:
                <select
                  value={gymMembership}
                  onChange={handleGymMembershipMonthsChange}
                >
                  <option>개월</option>
                  <option value={1}>1</option>
                  <option value={3}>3</option>
                  <option value={6}>6</option>
                  <option value={12}>12</option>
                </select>
                <button
                  className="modallll-button"
                  onClick={() =>
                    handleAddGymMembership(gymMembership, selectedMember)
                  }
                >
                  헬스장 이용권 추가
                </button>
                {selectedMember.gymMembershipStart &&
                selectedMember.gymMembershipEnd ? (
                  <button
                    className="modallll-button"
                    onClick={() => handleDeleteGymMembership(selectedMember)}
                  >
                    헬스장 이용권 삭제
                  </button>
                ) : (
                  ""
                )}
              </label>
            </label>
          </div>
        </div>
      )}
    </>
  );
};

export default MemberManage;
