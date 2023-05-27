import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./css/detailMJ.css";
const SAPIBase = "http://localhost:8080";

interface Props {
  loggedID: string | null;
  setLoggedID: React.Dispatch<React.SetStateAction<string | null>>;
}

interface ICOMMENTInfo { mjName: string, ID: string, nickName: string, comment: string};

const DetailPage : React.FC<Props>= ({ loggedID,setLoggedID}) => {
  const locate = useLocation();
  const [count, setCount] = React.useState(0);
  const [comment, setComment] = React.useState("");
  
  const state = locate.state as { name: string, location: string, specificLocation: string, mjType: string, like: number, comments:Array<String>};

  const [ COMMENTInfo, setCOMMENTInfo ] = React.useState<ICOMMENTInfo[]>([]);

  React.useEffect( () => {
    const asyncFun = async () => {
      const { data } = await axios.post<ICOMMENTInfo[]>( SAPIBase + '/comment/getComment',{mjName: state.name});
      setCOMMENTInfo(data);
    };
    asyncFun().catch((e) => window.alert(`Error while running Comments Call: ${e}`));
  }, [count]);

  const submitComment = () => {
    const asyncFun = async () => {
      if(loggedID==null){
        return;
      }
      const {data} = await axios.post( SAPIBase + '/account/getAccount',{id: loggedID});
      await axios.post( SAPIBase + '/comment/addComment', { mjName:state.name,ID: loggedID, nickName: data.nickName, comment: comment } );
      setCount(count + 1);
      setComment("");
    }
    asyncFun().catch(e => window.alert(`kerweAN ERROR OCCURED! ${e}`));
  }

  const deleteComment = (id: string) => {
    if(id!=loggedID){
      window.alert("You can only delete your own comment!");
      return;
    }
    const asyncFun = async () => {
      await axios.post( SAPIBase + '/comment/deleteComment', { id:id } );
      setCount(count - 1);
    }
    asyncFun().catch(e => window.alert(`AN ERROR OCCURED! ${e}`));
  };

  if(loggedID!=null){
  return(
      <>
      <div className="Info">
        <h2>{state.name}</h2>
        <div>location: # {state.location}</div>
        <div>specific Location: {state.specificLocation}</div>
        <div>맛집Type: # {state.mjType}</div>
        <div>♥ {state.like}</div>
      </div>
      <br/>
      <br/>
      <div className='comments'>
        <h3>comments</h3>
          <div className='make-comment'>
            comment:  <input type="text" id="comment" value={comment} onChange={(e)=>setComment(e.target.value)}/>
            <button onClick={submitComment}>submit</button>
          </div>
          <div className={"comment-list"}>
            { COMMENTInfo.map( (val, i) =>{
              return (
                  <div key={i} className={"comment-item"}>
                  <div className={"delete-comment"} onClick={(e) => deleteComment(val.ID)}>DELETE</div>
                  <h3 className={"comment-title"}>{ val.nickName }</h3>
                  <p className={"comment-body"}>{ val.comment }</p>
                </div>
                );
            }
            ) }
          </div>
        </div>
    </>);
  }else{
    return(
      <>
        <div className="Info">
          <h2>name: {state.name}</h2>
          <div>location: # {state.location}</div>
          <div>specificLocation: {state.specificLocation}</div>
          <div>mjType: # {state.mjType}</div>
          <div>♥ {state.like}</div>
        </div>
        <div className='comments'>
          <h3>comments</h3>
            <p> If you wanna leave a comment, please login first</p>
            <div className="comment-list">
              { COMMENTInfo.map( (val, i) =>{
                return (
                    <div key={i} className={"comment-item"}>
                    <h3 className={"comment-title"}>{ val.nickName }</h3>
                    <p className={"comment-body"}>{ val.comment }</p>
                  </div>
                  );
              }
              ) }
            </div>
          </div>
      </>
    );
  }
}
export default DetailPage;