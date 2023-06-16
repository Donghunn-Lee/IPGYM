import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

const Signup = (props) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('에러가 낫서요 ㅠㅠ');
  

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email,password,name,gender);
    axios.post('http://43.200.171.222:8080/auth/signup', {
      email: email,
      password: password,
      gender: gender,
      name: name
    })
    .then((response) => {
      if (response.data) {
        console.log(response);
        alert('Register success')
        window.location.href = '/login';} // 로그인 화면으로 이동
      else window.location.href = '/mainpage';
    })
    .catch((error) => {
      console.error(error);
      alert(errorMessage);
      
    });
    console.log(localStorage.getItem('token'));
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>회원가입</h2>
      <label className="form-label">
        이름:
        <input
          className="form-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <div className="gender">
        <label style={{color:"black"}} className="=gender">
          성별:
          <input
            type="radio"
            value="Male"
            checked={gender === "Male"}
            onChange={handleGenderChange}
          />
          남성
        </label>
        <label style={{color:"black"}}>
          <input
            type="radio"
            value="Female"
            checked={gender === "Female"}
            onChange={handleGenderChange}
          />
          여성
        </label>
      </div>
      <label className="form-label">
        이메일:
        <input
          className="form-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="form-label">
        비밀번호:
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button className="form-button" type="submit">
        가입하기
      </button>
    </form>
  );
};

export default Signup;
