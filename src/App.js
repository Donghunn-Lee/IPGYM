import React from 'react';
import MainPage from './components/MainPage';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import MyPage from './components/MyPage';
import PTticketInquiry from './components/PTticketInquiry';
import PTReservation from './components/PTReservation';
import MembershipManagement from './components/MembershipManagement';





const App = () => {
  return (
    <BrowserRouter>
    <div className="App">

        <header className='App-header'>
    
        </header>

        <div className='App.body'>
          
            <Routes>
              <Route path="/mypage" element={<MyPage/>}/>
              <Route path="/ptticket" element={<PTticketInquiry/>}/>
              <Route path="/ptreservation" element={<PTReservation/>}/>
              <Route path="/membership" element={<MembershipManagement/>}/>
              <Route path="/mainpage" element={<MainPage/>}/>
              <Route path="/" element={<MainPage/>}/>
            </Routes>

        </div>


    </div>
    </BrowserRouter>
  );
};

export default App;