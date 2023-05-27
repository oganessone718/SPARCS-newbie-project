import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/home.css";

const SAPIBase = "http://ssal.sparcs.org:15189";

interface IMJInfo { name: String; location: String; specificLocation: String; mjType: String; like: number;}

interface Props {
  loggedID: string | null;
  setLoggedID: React.Dispatch<React.SetStateAction<string | null>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>; 
}

const HomePage: React.FC<Props>= ({ loggedID,setLoggedID, count, setCount }) => {
  const [ MJInfo, setMJInfo ] = React.useState<IMJInfo[]>([]);
  const navigate = useNavigate();
  const [edit, setEdit] = React.useState(false);
  const [Sname,setSName] = React.useState("");
  const [Slocation,setSLocation] = React.useState("전체");
  const [SmjType,setSMJType] = React.useState("전체");

  React.useEffect( () => {
    const asyncFun = async () => {
      const { data } = await axios.get<IMJInfo[]>( SAPIBase + '/mj/getMJ');
      setMJInfo(data);
    };
    asyncFun().catch((e) => window.alert(`Error while running MJs Call: ${e}`));
  }, [count,edit]);

  const deleteMJ= (name: String) => {
    const asyncMJFun = async () => {
      await axios.post( SAPIBase + '/mj/deleteMJ', { name: name } );
      const asyncAccountFun = async () => {
        await axios.post( SAPIBase + '/account/deleteMJ', { name: name } );
        const asyncCommentFun = async () => {
          await axios.post( SAPIBase + '/comment/deleteMJ', { name: name } );
        }
        asyncCommentFun().catch(e => window.alert(`AN ERROR OCCURED! ${e}`));
      }
      asyncAccountFun().catch(e => window.alert(`AN ERROR OCCURED! ${e}`));
      setCount(count - 1);
    }
    asyncMJFun().catch(e => window.alert(`AN ERROR OCCURED! ${e}`));
  };


  const editMJ = (mj: IMJInfo) => {
    setEdit(!edit);
    navigate("/editMJ", { state: { name: mj.name, location:mj.location, specificLocation: mj.specificLocation ,mjType:mj.mjType } });
  };  

  const likeMJ = (name:String) => {
    if(loggedID==null){
      window.alert("You need to login first!")
      navigate("/log-in");
      return;
    }
    else{
        const asyncAccountFun = async () => {
        await axios.post( SAPIBase + '/account/likeMJ', { id: loggedID ,name: name } );
        const asyncMJFun = async () => {
        await axios.post( SAPIBase + '/mj/likeMJ', { name: name } );
          setEdit(!edit);
        }
        asyncMJFun().catch(e => window.alert(`AN ERROR OCCURED! ${e}`));
      }
      asyncAccountFun().catch(e => window.alert(`AN ERROR OCCURED! ${e}`));
    }
    
  };  

  const detailMJ = (mj: IMJInfo) => {
    navigate("/detailMJ", { state: { name: mj.name, location:mj.location, specificLocation: mj.specificLocation ,mjType:mj.mjType, like:mj.like} });
  };  

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  }

  return (
    <>    
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">이름 검색:  </label>
      <input
        type="text"
        id="name"
        value={Sname}
        onChange={(e) => setSName(e.target.value)}
      />
      <br />
      <label htmlFor="location">장소:  </label>
      <select id="location" value={Slocation} onChange={(e)=>{setSLocation(e.target.value)}} required>
      <option value="전체">전체</option>
        <option value="어은동">어은동</option>
        <option value="궁동">궁동</option>
        <option value="봉명동">봉명동</option>
        <option value="둔산동">둔산동</option>
        <option value="갈마동">갈마동</option>
        <option value="은행동">은행동</option>
        <option value="기타">기타</option>
      </select>
      <label htmlFor="location">종류:  </label>
      <select id="location" value={SmjType} onChange={(e)=>setSMJType(e.target.value)} required>
        <option value="전체">전체</option>
        <option value="한식">한식</option>
        <option value="일식">일식</option>
        <option value="중식">중식</option>
        <option value="양식">양식</option>
        <option value="카페">카페</option>
        <option value="분식">분식</option>
        <option value="기타">기타</option>
      </select>
    </form>

    <div className="MJ">
      <div className={"mj-item-add"}>
        <div className={"mj-add-button"} onClick={(e) => navigate("/makeMJ")}>Add New 맛집!</div>
      </div>
      <div className={"mj-list"}>
        { MJInfo.map( (val, i) =>{
          if((val.name == (Sname) || Sname=="") && (val.location == (Slocation) || Slocation=="전체") && (val.mjType == (SmjType) || SmjType=="전체")){
            return (
              <div key={i} className={"mj-item"}>
                <div className='buttons'>
                  <div className={"delete-item"} onClick={(e) => deleteMJ(val.name)}>DELETE</div>
                  <div className={"edit-item"} onClick={(e) => editMJ(val)}>EDIT</div>
                  <div className={"like-item"} onClick={(e) => likeMJ(val.name)}>LIKE</div>
                  <div className={"detail-item"} onClick={(e) => detailMJ(val)}>DETAIL</div>
                </div>
                <h2 className={"mj-title"}>{ val.name }</h2>
                <div className='info'>
                  <p className={"mj-body"}>#{ val.location }</p>
                  <p className={"mj-body"}>#{ val.mjType }</p>
                  <p className={"mj-body"}>❤️{ val.like }</p>
                </div>
                
              </div>
            );
          }
        }
        ) }
      </div>
    </div>
    </>
  );
}

export default HomePage;
