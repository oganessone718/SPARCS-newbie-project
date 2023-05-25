import React, { useEffect } from "react";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/home.css";
const SAPIBase = "http://localhost:8080";

interface IMJInfo { name: String; location: String; specificLocation: String; mjType: String; like: number; comments:Array<String>}

const HomePage = (props: {}) => {
  const [ MJInfo, setMJInfo ] = React.useState<IMJInfo[]>([]);
  const navigate = useNavigate();

  React.useEffect( () => {
    const asyncFun = async () => {
      const { data } = await axios.get<IMJInfo[]>( SAPIBase + '/mj/getMJ');
      setMJInfo(data);
    };
    asyncFun().catch((e) => window.alert(`Error while running MJs Call: ${e}`));
  }, []);

  const deleteMJ= () => {

  };

  const editMJ = () => {
    
  };  

  const likeMJ = () => {
    
  };  

  return (
    <div className="Feed">
      <h2>MJ List</h2>
      <div className={"feed-item-add"}>
        <div className={"post-add-button"} onClick={(e) => navigate("/makeMJ")}>Add New MJ!</div>
      </div>
      <div className={"feed-list"}>
        { MJInfo.map( (val, i) =>
          <div key={i} className={"feed-item"}>
            <div className={"delete-item"} onClick={(e) => deleteMJ()}>DELETE</div>
            <div className={"edit-item"} onClick={(e) => editMJ()}>EDIT</div>
            <div className={"edit-item"} onClick={(e) => likeMJ()}>LIKE</div>
            <h3 className={"feed-title"}>{ val.name }</h3>
            <p className={"feed-body"}>{ val.location }</p>
            <p className={"feed-body"}>{ val.mjType }</p>
            <p className={"feed-body"}>{ val.like }</p>
          </div>
        ) }
      </div>
    </div>
  );
}

export default HomePage;
