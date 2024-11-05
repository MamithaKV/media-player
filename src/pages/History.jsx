// rafce
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { deleteHistoryAPI, getAllHistoryAPI } from '../service/allAPI'

const History = () => {
  const [allVideoHistory,setAllVideoHistory] = useState([]);
  // hook
  useEffect(()=>{
   getAllHistory()
  },[])
  console.log(allVideoHistory);
  
  const getAllHistory= async ()=>{
    try{
     const reslt = await getAllHistoryAPI()
     if(reslt.status>=200 && reslt.status<300){
     setAllVideoHistory(reslt.data)
     }else{
      console.log(reslt);
      
     }
    }catch(err){
      console.log(err);
      
    }
  }

  const removeHistory = async (id)=>{
    try{
    //  api call
    await deleteHistoryAPI(id)
    getAllHistory()
    
    }catch(err){
      console.log(err);
      
    }
  }

  return (
    <div style={{paddingTop:'100px'}}>
      <div className='container d-flex justify-content-between'>
        <h3>Watch History</h3>
        <Link to={'/home'}>Back to Home</Link>
      </div>
      <table className="container my-5 table">
        <thead>
          <tr>
            <th>#</th>
            <th>Caption</th>
            <th>Link</th>
            <th>Time Stamp</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
          {
            allVideoHistory?.length>0?
            allVideoHistory?.map((videoDetails,index)=>(
              <tr key={videoDetails?.id}>
              <td>{index+1}</td>
          <td>Caption</td>
          <td><a target='_blank' href={videoDetails?.youtubeLink}>{videoDetails?.youtubeLink}</a></td>
          <td>{videoDetails?.timeStamp}</td>
          <td><button onClick={()=>removeHistory(videoDetails?.id)} className='btn'><i className='fa-solid fa-trash text-danger'></i></button></td>
          <td></td>
          </tr>
            ))
            :
            <div>you didnot watch any video yet!!1</div>
          }
        </tbody>
      </table>
    </div>
  )
}

export default History