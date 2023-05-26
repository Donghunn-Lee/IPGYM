import React, { useState, useEffect } from "react";
import PT from "../PT";

function PTManage() {
  // PT 컴포넌트에서 사용할 상태와 이벤트 핸들러 정의
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 회원가입 폼 제출 이벤트 핸들러
  const handleSignupSubmit = (formData) => {
    // 여기서 폼 데이터를 처리하는 로직을 추가할 수 있습니다.
    console.log("Submitted:", formData);
    // 폼 데이터를 서버로 전송하거나 다른 작업을 수행할 수 있습니다.
  };

  useEffect(() => {
    // 마운트 시에 수행할 작업을 추가할 수 있습니다.
    // 예를 들어 초기 데이터를 가져오거나 초기화 등의 작업을 수행할 수 있습니다.
    console.log("PTManage component mounted");
    // fetchInitialData();
    // performInitialization();
  }, []);

  return (
    <div>
      <h2>PT 회원 관리</h2>
      <PT
        name={name}
        setName={setName}
        gender={gender}
        setGender={setGender}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSignupSubmit={handleSignupSubmit}
      />
    </div>
  );
}

export default PTManage;
