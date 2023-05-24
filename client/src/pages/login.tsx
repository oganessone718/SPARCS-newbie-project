import React from "react";
import axios from "axios";
import "./css/login.css";
const SAPIBase = "http://localhost:8080";

const LoginPage = () => {
  const [ID, setID] = React.useState<string>("Please write your ID");
  const [Password, setPassword] = React.useState<string>(
    "Please write your password"
  );

  const loginAccount = () => {
    const asyncFun = async () => {
      await axios.post( SAPIBase + '/account/login', { ID, Password } )
      .then(()=>{
        setID("Please write your ID");
        setPassword("Please write your password");
      })
      .catch((e)=>console.log(e));
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
