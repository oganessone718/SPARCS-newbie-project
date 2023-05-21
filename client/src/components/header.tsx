import React from "react";
import { useNavigate }  from "react-router-dom";
import "./css/header.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={"header"}>
      <div className={"header-content-wrapper"}>
        <div className={"logo"} onClick={ (e) => navigate('/') }>
          <img src="/images/logo.png" alt="logo"/>
        </div>
      </div>
    </div>
    
  );
}

export default Header;