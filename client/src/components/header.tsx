// import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/header.css";



const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={"header"}>
      <div className={"header-content-wrapper"}>
        {/* <div className={"logo"} onClick={(e) => navigate("/")}>
          <img src='./src/images/logo.png' alt='logo' />
        </div> */}
        <div className={"sign-up"} onClick={(e) => navigate("/sign-up")}>
          sign up
        </div>
        <div className={"log-in"} onClick={(e) => navigate("/log-in")}>
          login
        </div>
        <div className={"my-page"} onClick={(e) => navigate("/my-page")}>
          my page
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Header;
