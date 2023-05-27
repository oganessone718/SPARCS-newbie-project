import React from 'react';
const SAPIBase = "http://ssal.sparcs.org:15189";
import axios from "axios";
import "./css/mypage.css";

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
    <h2>My Page</h2>
    <div>
      <div className='tag'> Nickname: </div>{NickName}
    </div>
    <br/>
    <div>
      <div className='tag'> ID: </div>{ID}
    </div>
    <br/>
    <div><div className="tag"> Your liked 맛집 Lists: </div>{MJString}
    </div>
    <br/>
    </>
  );
}

export default MyPage;