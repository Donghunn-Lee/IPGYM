import React, { useState, useEffect } from "react";
import MainPage from "./components/MainPage";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MyPage from "./components/MyPage";
import PT from "./components/PT";
import MembershipManagement from "./components/MembershipManagement";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Admin from "./components/Admin";
import MemberManage from "./components/management/MemberManage";
import PTManage from "./components/management/PTManage";
import BMI from "./components/BMI";
import Msuse from "./components/management/MSuse";
import Quotes from "./components/Quotes";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

  const [quoteKey, setQuoteKey] = useState(window.location.pathname);

  useEffect(() => {
    const handleRouteChange = () => {
      setQuoteKey(window.location.pathname);
    };
  
    window.addEventListener("popstate", handleRouteChange);
  
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [quoteKey]);

  const redirectPath = isAuthenticated ? "/mainpage" : "/login";
  

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1 className="title">IPGYM</h1>
        </header>

        <div className="App.body">
          <Quotes key= {quoteKey} />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} IsAuthenticated={isAuthenticated}/>}/>
            <Route path="/BMI" element={<BMI />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/pt" element={<PT />} />
            <Route path="/membership" element={<MembershipManagement />} />
            <Route path="/mainpage" element={isAuthenticated ? <MainPage /> : <Navigate to="/login" />}/>
            <Route path="/admin" element={isAdmin ? <Admin /> : <Navigate to="/adminlogin" />}/>
            <Route path="/admin/membermanage" element={<MemberManage />} />
            <Route path="/admin/ptmanage" element={<PTManage />} />
            <Route path="/admin/msuse" element={<Msuse />} />
            <Route path="/" element={<Navigate to={redirectPath} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
