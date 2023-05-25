import React from "react";
import axios from "axios";
import "./css/login.css";
import { useNavigate } from "react-router-dom";
const SAPIBase = "http://localhost:8080";

interface Props {
  loggedID: string | null;
  setLoggedID: React.Dispatch<React.SetStateAction<string | null>>;
}

const LoginPage: React.FC<Props>= ({ loggedID, setLoggedID }) => {
  const [ID, setID] = React.useState<string>("Please write your ID");
  const [Password, setPassword] = React.useState<string>("Please write your password");

  if(loggedID!=null){
    console.log("[login error]: already logged in");
  }

  const navigate = useNavigate();

  const loginAccount = () => {
    const asyncFun = async () => {
      const account =  await axios.post( SAPIBase + '/account/login', { ID, Password } )
      setID("Please write your ID");
      setPassword("Please write your password");
      window.alert("You have logged in!");
      setLoggedID(account.data.ID);
      navigate("/");
    };
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
  };

  return (
    <div className={"account"}>
      <h2>Login</h2>
      <div className={"account-item"}>
        ID:{" "}
        <input
          type={"text"}
          value={ID}
          onChange={(e) => setID(e.target.value)}
        />
        Password:{" "}
        <input
          type={"text"}
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          className={"account-create-button"}
          onClick={(e) => loginAccount()}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
