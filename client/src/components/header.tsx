import React from "react";
import { useNavigate }  from "react-router-dom";
import "./css/header.css";

const Header = () => {
  return (
    <div className={"header"}>
      <div className={"header-content-wrapper"}>
        <div className={"logo"} onClick={ (e) => useNavigate()('/') }>
          <img src="./src/images/logo.png" alt="logo"/>
        </div>
        <div className={"sign-up"} onClick={ (e) => useNavigate()('/sign-up') }>
          sign up
        </div>
        <div className={"log-in"} onClick={ (e) => useNavigate()('/log-in') }>
          login
        </div>
        <div className={"my-page"} onClick={ (e) => useNavigate()('/my-page') }>
          my page
        </div>
      </div>
      <hr/>
    </div>
  );
}

export default Header;