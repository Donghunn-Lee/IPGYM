import React, { useState} from "react";
import MainPage from "./components/MainPage";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MyPage from "./components/MyPage";
import PT from "./components/PT";
import MembershipManagement from "./components/MembershipManagement";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AdminLogin from "./components/AdminLogin";
import Admin from "./components/Admin";
import MemberManage from "./components/management/MemberManage";
import PTManage from "./components/management/PTManage";
import Msuse from "./components/management/MSuse";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

  const redirectPath = isAuthenticated ? "/mainpage" : "/login";
  // const adminPath = isAdmin ? "/admin" : "/adminlogin";


  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
       <h1>- IPGYM -</h1>
          
        </header>

        <div className="App.body">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element = {<Login setIsAuthenticated={setIsAuthenticated} IsAuthenticated={isAuthenticated}/>}/>
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/pt" element={<PT />} />
            <Route path="/membership" element={<MembershipManagement />} />
            <Route
              path="/mainpage"
              element={
                isAuthenticated ? <MainPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/adminlogin"
              element={<AdminLogin setIsAdmin={setIsAdmin} IsAdmin={isAdmin} />}
            />
            <Route
              path="/admin"
              element={isAdmin ? <Admin /> : <Navigate to="/adminlogin" />}
            />
            <Route path="/membermanage" element={<MemberManage />} />
            <Route path="/ptmanage" element={<PTManage />} />
            <Route path="/msuse" element={<Msuse />} />
            <Route path="/" element={<Navigate to={redirectPath} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
