import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SAPIBase = "http://ssal.sparcs.org:15189";

interface Props {
  loggedID: string | null;
  setLoggedID: React.Dispatch<React.SetStateAction<string | null>>;
}

const LoginPage: React.FC<Props>= ({ loggedID, setLoggedID }) => {
  const [ID, setID] = React.useState<string>("");
  const [Password, setPassword] = React.useState<string>("");

  if(loggedID!=null){
    console.log("[login error]: already logged in");
  }

  const navigate = useNavigate();

  const loginAccount = () => {
    const asyncFun = async () => {
      await axios.post( SAPIBase + '/account/login', { ID, Password } )
      .then((account)=>{
        if(account.data.success){
          window.alert("You have logged in!")
          setID("");
          setPassword("");
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
        <h2>Login</h2>
        <label htmlFor="ID">ID:  </label>
        <input
          type="text"
          id="ID"
          value={ID}
          onChange={(e) => setID(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Password:  </label>
        <input
          type="password"
          id="password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit"> Login </button>
      </form>
    </>
  );
};

export default LoginPage;
