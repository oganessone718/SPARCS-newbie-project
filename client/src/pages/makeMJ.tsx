import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/home.css";
const SAPIBase = "http://localhost:8080";

const MakeMJPage = () => {

  const [name,setName] = React.useState("");
  const [location,setLocation] = React.useState("");
  const [specificLocation,setSpecificLocation] = React.useState("");
  const [mjType,setMJType] = React.useState("");

  const navigate = useNavigate();

  const createNewPost = () => {
    const asyncFun = async () => {
      await axios.post( SAPIBase + '/mj/addMJ', { name:name, location:location, specificLocation:specificLocation, mjType:mjType});
      window.alert("Post Added!");
      navigate("/");
    }
    asyncFun().catch(e => window.alert(`AN ERROR OCCURED! ${e}`));
  }


  return(
    <>
      <div className={"feed-item-add"}>
        Name: <input type={"text"} value={name} onChange={(e) => setName(e.target.value)}/>
        Location: <input type={"text"} value={location} onChange={(e) => setLocation(e.target.value)}/>
        Specific Location: <input type={"text"} value={specificLocation} onChange={(e) => setSpecificLocation(e.target.value)}/>
        mjType: <input type={"text"} value={mjType} onChange={(e) => setMJType(e.target.value)}/>
        <div className={"post-add-button"} onClick={(e) => createNewPost()}>Add Post!</div>
      </div>
    </>
  );
}

export default MakeMJPage;