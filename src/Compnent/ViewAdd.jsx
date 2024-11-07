//rafce
import React, { useEffect, useState } from 'react'
import { Row,Col} from 'react-bootstrap'

import VideoCard from './VideoCard'
import { getAllVideosAPI, saveVideoAPI, updateCategoryApi } from '../service/allAPI'



const ViewAdd = ({addResponseFromHome,deleteResponseFromCategory,setdeleteResponseFromView}) =>{
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
// category from allvideo drag function
const dragOverView=(e)=>{
  e.preventDefault()
}


const categoryVideoDropOverView = async(e) => {
  console.log("Inside categoryVideoDropOverView");
  const {video,categoryDetails} = JSON.parse(e.dataTransfer.getData("dragData"))
  console.log(video,categoryDetails);
  const updatedCategoryVideoList = categoryDetails?.allVideos?.filter(item=>item.id!=video?.id)
    const updatedCategory = {...categoryDetails,allVideos:updatedCategoryVideoList}
    console.log(updatedCategory);
    // updating category by delete video from category using api
    const result= await updateCategoryApi(updatedCategory)
    // use statelifting to communicate ata from view to category
    setdeleteResponseFromView(result)
    // /use api to upload video
    await saveVideoAPI(video)
    // call getAllVideos function
    getAllVideos()
}




  return (
    <>
    {/* get data display */}
    {/* drag category from view(all videos) */}
     <Row droppable="true" onDragOver={dragOverView} onDrop={e=>categoryVideoDropOverView(e)}>
      
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