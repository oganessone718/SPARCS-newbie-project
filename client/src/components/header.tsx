// import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/header.css";



const Header = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className={"header"}>
        <div className="logo" onClick={(e) => navigate("/")}>
          <img src={"./src/images/logo.png"} alt={"logo"} />
        </div>
        <ul className={"header-content"}>
          <li onClick={(e) => navigate("/sign-up")}>Sign up</li>
          <li onClick={(e) => navigate("/log-in")}>Log in</li>
          <li onClick={(e) => navigate("/my-page")}>my page</li>
        </ul>
    </div>
    <hr />
    </>
    
  );
};

export default Header;
