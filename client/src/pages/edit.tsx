import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./css/home.css";
const SAPIBase = "http://ssal.sparcs.org:15189/";

interface Props {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>; 
}

const EditPage = () => {
  const locate = useLocation();
  const navigate = useNavigate();
  
  const state = locate.state as { name: string, location: string, specificLocation: string, mjType: string };

  const oldName = state.name;
  const [name,setName] = React.useState(state.name);
  const [location,setLocation] = React.useState(state.location);
  const [specificLocation,setSpecificLocation] = React.useState(state.specificLocation);
  const [mjType,setMJType] = React.useState(state.mjType);

  const editMJ = () => {
    const asyncFun = async () => {
      await axios.post( SAPIBase + '/mj/editMJ', { oldName:oldName, name:name, location:location, specificLocation:specificLocation, mjType:mjType});
      window.alert("MJ Modified!");
      navigate("/");
    }
    asyncFun().catch(e => window.alert(`AN ERROR OCCURED! ${e}`));
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    editMJ();
  };
  return(
    <>    
    <h2>EDIT the 맛집</h2>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">이름:  </label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <br />
      <label htmlFor="location">장소:  </label>
      <select id="location" value={location} onChange={(e)=>{setLocation(e.target.value)}} required>
        <option value="어은동">어은동</option>
        <option value="궁동">궁동</option>
        <option value="봉명동">봉명동</option>
        <option value="둔산동">둔산동</option>
        <option value="갈마동">갈마동</option>
        <option value="은행동">은행동</option>
        <option value="기타">기타</option>
      </select>
      <br />
      <label htmlFor="specific-location">주소:  </label>
      <input
        type="text"
        id="specific-location"
        value={specificLocation}
        onChange={(e) => setSpecificLocation(e.target.value)}
        required
      />
      <br />
      <label htmlFor="location">종류:  </label>
      <select id="location" value={mjType} onChange={(e)=>setMJType(e.target.value)} required>
        <option value="한식">한식</option>
        <option value="일식">일식</option>
        <option value="중식">중식</option>
        <option value="양식">양식</option>
        <option value="카페">카페</option>
        <option value="분식">분식</option>
        <option value="기타">기타</option>
      </select>
      <br />
      <button type="submit"> Edit! </button>
    </form>
    </>
  );
}
export default EditPage;