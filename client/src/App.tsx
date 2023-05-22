import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';
import MyPage from './pages/mypage';
import MJPage from './pages/mj';
import UpdatePage from './pages/update';
import PageNotFound from './pages/404';

const App = () => {
  return (
    <>
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={ <HomePage/> }/>
          <Route path="/log-in" element={ <LoginPage/> }/>
          <Route path="/sign-up" element={ <SignUpPage/> }/>
          <Route path="/my-page" element={ <MyPage/> }/>
          <Route path="/mj" element={ <MJPage/> }/>
          <Route path="/update" element={ <UpdatePage/> }/>
          <Route path="*" element={ <PageNotFound/> }/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
    </>

  );
}

export default App;
