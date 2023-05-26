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
      await axios.post( SAPIBase + '/account/login', { ID, Password } )
      .then((account)=>{
        console.log(account.data);
        if(account.data.success){
          window.alert("You have logged in!")
          setID("Please write your ID");
          setPassword("Please write your password");
          setLoggedID(account.data.ID);
          navigate("/");
        }
        else{
          window.alert("Login failed! check your ID and password again");
        }
        
      })
      .catch((e)=>{
        window.alert(`AN ERROR OCCURED! ${e}`);
      });
    };
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    loginAccount();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="ID">ID:</label>
        <input
          type="text"
          id="ID"
          value={ID}
          onChange={(e) => setID(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit"> Login </button>
      </form>
    </>
  );
};

export default LoginPage;
