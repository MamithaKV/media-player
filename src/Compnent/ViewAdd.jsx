//rafce
import React, { useEffect, useState } from 'react'
import { Row,Col} from 'react-bootstrap'

import VideoCard from './VideoCard'
import { getAllVideosAPI } from '../service/allAPI'



const ViewAdd = (addResponseFromHome,deleteResponseFromCategory) =>{
  const[deleteVideoResponseFromVideoCard,setdeleteVideoResponseFromVideoCard]=useState("")
  //2nd create state, state usestate return array so give it an empty array
  const[allVideos,setAllVideos]=useState([])
  //3rd hook
useEffect(()=>{
  // function is call inside useffect
  getAllVideos()
},[addResponseFromHome,deleteVideoResponseFromVideoCard,deleteResponseFromCategory])
console.log(allVideos);
// fst function
const getAllVideos = async()=>{
  try{
    const reslt =await getAllVideosAPI()
    console.log(reslt);
    if(reslt.status>=200 && reslt.status<300){
      // state, update(setAllVideos) 
      setAllVideos(reslt.data)
    }
  }catch(err){
    console.log(err);
    
  }
}


  return (
    <>
    {/* get data display */}
    <Row>
      
      {
      allVideos?.length>0?
      // all videos one by one map
      allVideos?.map(video=>(
        <Col key={video?.id} className='mb-2' sm={12} md={6} lg={4}>
        <VideoCard setdeleteVideoResponseFromVideoCard={setdeleteVideoResponseFromVideoCard} displayData={video}/>
        </Col>
      ))
    :
    <div className="fw-bolder text-danger fs-5">No videos are uploaded yet</div>
      }
    </Row>
    </>
  )
}

export default ViewAdd