import React from "react";
import axios from "axios";
import "./css/signup.css";
const SAPIBase = "http://localhost:8080";

const SignUpPage = () => {
  const [NickName, setNickName] = React.useState<string>(
    "Please write your nickname"
  );
  const [ID, setID] = React.useState<string>("Please write your ID");
  const [Password, setPassword] = React.useState<string>(
    "Please write your password"
  );

  // const getAccountInformation = () => {
  //   const asyncFun = async() => {
  //     interface IAPIResponse { balance: number };
  //     const { data } = await axios.post<IAPIResponse>(SAPIBase + '/account/getInfo', { credential: SAPIKEY });
  //     setNBalance(data.balance);
  //   }
  //   asyncFun().catch((e) => window.alert(`AN ERROR OCCURED: ${e}`));
  // }

  const createNewAccount = () => {
    const asyncFun = async () => {
      await axios.post( SAPIBase + '/account/signUp', { NickName, ID, Password } )
      .then(()=>{
        setNickName("Please write your nickname");
        setID("Please write your ID");
        setPassword("Please write your password");
        window.alert("Your account has been created!");
      })
      .catch((e)=>console.log(e));
    };
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
  };

  return (
    <div className={"account"}>
      <h2>Sign up</h2>
      <div className={"account-item"}>
        NickName:{" "}
        <input
          type={"text"}
          value={NickName}
          onChange={(e) => setNickName(e.target.value)}
        />
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
          onClick={(e) => createNewAccount()}
        >
          Create your account!
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
