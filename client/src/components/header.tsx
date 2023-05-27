import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/header.css";
const SAPIBase = "http://localhost:8080";
const url = "https://times.kaist.ac.kr/news/articleList.html?sc_serial_code=SRN12&view_type=sm"

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
        <ul className={"header-content"}>
          <li className="logo" onClick={(e) => navigate("/")}>
            <img src={"./src/images/logo.png"} alt={"logo"}  width={"300px"} height={"150px"}/>
          </li>
        </ul>
          
          <ul className={"header-content"}>
            <li onClick={(e) => navigate("/sign-up")}><button>Sign up</button></li>
            <li onClick={(e) => navigate("/log-in")}><button>Login</button></li>
            <li onClick={(e) => onClickMyPage()}><button>My page</button></li>
            <li className="kaisttimes" onClick={()=>{window.open(url)}}>
              <img src={"./src/images/kaisttimes.png"} alt={"kaisttimes"} width={"100px"} height={"50px"}/>
            </li>
          </ul>
      </div>
      <hr />
      </>
    );
  }else{
    return (
      <>
      <div className={"header"}>
        <ul className={"header-content"}>
          <li className="logo" onClick={(e) => navigate("/")}>
            <img src={"./src/images/logo.png"} alt={"logo"}  width={"300px"} height={"150px"}/>
          </li>
          
        </ul>
          <ul className={"header-content"} >
            <li>user:{loggedID}</li>
            <li onClick={(e) => onClickLogout()}><button>Log out</button></li>
            <li onClick={(e) => navigate("/my-page")}><button>My Page</button></li>
            <li className="kaisttimes" onClick={()=>{window.open(url)}}>
              <img src={"./src/images/kaisttimes.png"} alt={"kaisttimes"} width={"100px"} height={"50px"}/>
            </li>
          </ul>
      </div>
      <hr />
      </>
    );
  }
  
};

export default Header;
