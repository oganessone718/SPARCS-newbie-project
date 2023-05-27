import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SAPIBase = "http://localhost:8080";

interface Props {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>; 
}

const MakeMJPage: React.FC<Props>= ({ count, setCount }) => {

  const [name,setName] = React.useState("");
  const [location,setLocation] = React.useState("어은동");
  const [specificLocation,setSpecificLocation] = React.useState("");
  const [mjType,setMJType] = React.useState("한식");

  const navigate = useNavigate();

  const createMJ = () => {
    const asyncFun = async () => {
      await axios.post( SAPIBase + '/mj/addMJ', { name:name, location:location, specificLocation:specificLocation, mjType:mjType});
      window.alert("맛집 Added!");
      navigate("/");
      setCount(count + 1);
    }
    asyncFun().catch(e => window.alert(`AN ERROR OCCURED! ${e}`));
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    createMJ();
  };

  return(
    <>    
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">이름:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <br />
      <label htmlFor="location">장소:</label>
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
      <label htmlFor="specific-location">주소:</label>
      <input
        type="text"
        id="specific-location"
        value={specificLocation}
        onChange={(e) => setSpecificLocation(e.target.value)}
        required
      />
      <br />
      <label htmlFor="location">종류:</label>
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
      <button type="submit"> 맛집 추가하기 </button>
    </form>
    </>
  );
}
export default MakeMJPage;