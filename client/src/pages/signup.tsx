import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SAPIBase = "http://localhost:8080";

const SignUpPage = () => {
  const [NickName, setNickName] = React.useState<string>("");
  const [ID, setID] = React.useState<string>("");
  const [Password, setPassword] = React.useState<string>("");

  const navigate = useNavigate();

  const createNewAccount = () => {
    if(NickName==""||ID==""||Password==""){
      window.alert("Please fill in all the blanks!");
      return;
    }
    const asyncFun = async () => {
      await axios.post( SAPIBase + '/account/signUp', { NickName, ID, Password } )
      .then((result)=>{
        if(result.data.success){
        setNickName("");
        setID("");
        setPassword("");
        window.alert("Your account has been created!");
        navigate("/log-in");
        }
        else{
          setNickName("");
          setID("");
          setPassword("");
          window.alert("Sign up failed!"+result.data.error);
        }
      })
      .catch((e)=>console.log(e));
    };
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
  };

  return (
    <div className={"account"}>
      <h2>Sign up</h2>
      <div className={"account-item"}>
        NickName:  
        <input
          type={"text"}
          value={NickName}
          onChange={(e) => setNickName(e.target.value)}
          required
        />
        <br />
        ID:  
        <input
          type={"text"}
          value={ID}
          onChange={(e) => setID(e.target.value)}
          required
        />
        <br />
        Password:   
        <input
          type={"text"}
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <div
          className={"account-create-button"}
          onClick={(e) => createNewAccount()}
        >
        <button> Create!</button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
