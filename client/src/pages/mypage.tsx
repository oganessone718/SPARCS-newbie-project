import React from 'react';
const SAPIBase = "http://localhost:8080";
import axios from "axios";

interface Props {
  loggedID: string | null;
  setLoggedID: React.Dispatch<React.SetStateAction<string | null>>;
}

const MyPage: React.FC<Props>= ({ loggedID, setLoggedID }) => {
  const [ID, setID] = React.useState<string>("");
  const [MJ, setMJ] = React.useState<Array<String>>([]);
  const [NickName, setNickName] = React.useState<string>("");

  const getInfo = () => {
    const asyncFun = async () => {
      const account =  await axios.post( SAPIBase + '/account/myPage', {loggedID} )
      setID(account.data.ID);
      setNickName(account.data.NickName);
      setMJ(account.data.MJ);
    };
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
  };
  
  React.useEffect(() => {
    getInfo();
  }, []);

  const MJString = MJ.join(', ');

  return (
    <>
    <div>Nickname: {NickName}</div>
    <div>ID: {ID}</div>
    <div>Your liked MJ Lists: {MJString}</div>
    </>
  );
}

export default MyPage;