import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/header.css";
import axios from 'axios';
const SAPIBase = "http://localhost:8080";

interface Props {
  loggedID: string | null;
  setLoggedID: React.Dispatch<React.SetStateAction<string | null>>;
}

const Header: React.FC<Props>= ({ loggedID, setLoggedID }) => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    setLoggedID(null);
  }

  const onClickMyPage = () => {
    window.alert("You are not logged in! Please log in first!");
  }

  if(loggedID==null){
    return (
      <>
      <div className={"header"}>
          <div className="logo" onClick={(e) => navigate("/")}>
            <img src={"./src/images/logo.png"} alt={"logo"} />
          </div>
          <ul className={"header-content"}>
            <li onClick={(e) => navigate("/sign-up")}>Sign up</li>
            <li onClick={(e) => navigate("/log-in")}>Log in</li>
            <li onClick={(e) => onClickMyPage()}>my page</li>
          </ul>
      </div>
      <hr />
      </>
    );
  }else{
    return (
      <>
      <div className={"header"}>
          <div className="logo" onClick={(e) => navigate("/")}>
            <img src={"./src/images/logo.png"} alt={"logo"} />
          </div>
          <ul className={"header-content"}>
            <li>user:{loggedID}</li>
            <li onClick={(e) => onClickLogout()}>Log out</li>
            <li onClick={(e) => navigate("/my-page")}>my page</li>
          </ul>
      </div>
      <hr />
      </>
    );
  }
  
};

export default Header;
