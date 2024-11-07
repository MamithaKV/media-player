//rafce
import React,{useEffect, useState} from 'react'
import { Modal,Button,Form,FloatingLabel } from 'react-bootstrap'
import { deleteCategoryAPI, getAllCategoryAPI, removeVideoAPI, saveCategoryAPI, updateCategoryApi } from '../service/allAPI';
import VideoCard from './VideoCard';

const Category = ({setDeleteResponseFromCategory,deleteResponseFromView}) => {
  const[allCategories,setAllCategories] = useState([])
  const[categoryName,setcategoryName] = useState("")
  const [show, setShow] = useState(false);
 
  useEffect(()=>{
    getAllCategories()
  },[deleteResponseFromView])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // category
  const handleSaveCategory =async ()=>{
     if(categoryName){
       const categoryDetails = {categoryName,allVideos:[]}
       try{
        const result =await saveCategoryAPI(categoryDetails)
        if(result.status>=200 && result.status<300){
        alert("categry created")
        // modal close
        handleClose()
        }
       }catch(err){
        console.log(err);
        
       }
     }else{
      alert("please fill form")
     }
  }
  const getAllCategories = async () =>{
    try{
   const result = await getAllCategoryAPI()
   if(result.status>=200 && result.status<300)
    setAllCategories(result.data)

  }catch(err){
   console.log(err);
   
  }
}
console.log(allCategories);
const removeCategory = async(id)=>{
  try{
   await deleteCategoryAPI(id)
   getAllCategories()
  }catch(err){
   console.log(err);
   
  }
}
const dragOverCategory = (e)=>{
  e.preventDefault( )
}
const videoCaDropOverCategory =async(e,categoryDetails)=>{
  // refreshing can stop
  // additional event done by browser can stop using below code
  //e.prevent
  console.log("inside videoCaDropOverCategory");
  const videoDetails=JSON.parse(e.dataTransfer.getData("videoDetails"))
  console.log(categoryDetails);
  // update category by add video to its allvideos
  categoryDetails.allVideos.push(videoDetails)
  console.log(videoDetails);
  
  // api call to make update the category
  await updateCategoryApi(categoryDetails)
  getAllCategories()
  const result = await removeVideoAPI(videoDetails.id)
  
  setDeleteResponseFromCategory(result)
}
const categoryVideoDragStarted= (e,dragVideoDetails,categoryDetails) => {
  console.log("Inside  categoryVideoDragStarted");
  let dragData = {video:dragVideoDetails,categoryDetails}
  e.dataTransfer.setData("dragData",JSON.stringify(dragData))
}

  return (
    <>
      <div className="d-flex justify-content-around align-items-center">
      <h3>All Categories</h3>
      <button onClick={handleShow} className='btn btn-warning ms-3 rounded-circle fw-bolder fs-5'>+</button>
      </div>
      {/* display all category */}
      <div className="container-fluid mt-3">
      {/* single category */}
      {
        allCategories?.length>0?
        allCategories?.map(categoryDetails=>(
          // drag element in videocard dropped here  ("true" is a string value)
          // drag element will drop here corresponding event is ondrop  (e,  dropped by which category id done is giving after comma)
          <div droppable="true" onDragOver={dragOverCategory} onDrop={e=>videoCaDropOverCategory(e,categoryDetails)} key={categoryDetails?.id} className="border rounded p-3 mb-3">
        <div className="d-flex justify-content-between">
        <h5>{categoryDetails?.categoryName}</h5>
        {/* inside arrow fn not usee curly brace */}
        <button onClick={()=>removeCategory(categoryDetails?.id)} className='btn'><i className='fa-solid fa-trash text-danger'></i></button>
        </div> 
        {/* display category videos */}
        <div className="row mt-2">
       {
        categoryDetails?.allVideos?.length>0 &&
        categoryDetails?.allVideos?.map(video=>(
<div draggable={true} onDragStart={e=>categoryVideoDragStarted(e,video,categoryDetails)} key={video?.id} className="col-lg-4">       
        {/* videocard */}
        {/* inside videocard one element  hide */}
        {/* videocard element if insideCategory={true} button dont display */}
       <VideoCard insideCategory={true} displayData={video}/>
        </div>
       ))
      }
        </div>
        </div>
        ))
        
        :
        <div className='fw-bolder text-danger fs-5'>no categories are added</div>
      }
     
      </div>
      <Modal
      centered
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      >
      <Modal.Header closeButton>
      <Modal.Title>Add Category Details!!!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <FloatingLabel controlId="floatingCategoryName" label=" Category Name">
      <Form.Control onChange={e=>setcategoryName(e.target.value)} type="text" placeholder="category Name" />
      </FloatingLabel>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
      Cancel
      </Button>
      <Button variant="primary" onClick={handleSaveCategory} >Add</Button>
      </Modal.Footer>
      </Modal>
    </>
  )
}

export default Category