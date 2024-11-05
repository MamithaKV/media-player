//rafce
import React,{useState} from 'react'
import { Modal,Button,Form,FloatingLabel } from 'react-bootstrap'
import { saveVideoAPI } from '../service/allAPI'

const AddVideo = ({setAddResponseFromHome}) => {
  // invalid youtube link
 const[InvalidYoutubeLink,setInvalidYoutubeLink] =useState(false)
     const [videoDetails,setVideoDetails]=useState({
     caption:"",imgUrl:"",youTubeLink:""
     })
     console.log(videoDetails);
     //modal
     const [show, setShow] = useState(false);
     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);

     const extractingEmbedLinkFroYoutubeLink=(userInputYoutubeLink)=>{
      // steps creating embed link from youtube link
       if(userInputYoutubeLink.includes("https://www.youtube.com/watch?v=")){
       console.log(userInputYoutubeLink.split("v=")[1].slice(0,11));
       const videoId=userInputYoutubeLink.split("v=")[1].slice(0,11)
       setInvalidYoutubeLink(false)
       setVideoDetails({...videoDetails,youTubeLink:`https://www.youtube.com/embed/${videoId}`})
       }else{
        //alert("invalid youtube link...please try with other...")
        setInvalidYoutubeLink(true)
        setVideoDetails({...videoDetails,youTubeLink:""})
       }
     }
  
     const handleUploadVideo = async ()=>{
      //object destructure : const {key1,key2....}=object-name
      const{caption,imgUrl,youTubeLink}=videoDetails
      if(caption && imgUrl && youTubeLink){
        //store video details permanently
     try{
      const reslt= await saveVideoAPI(videoDetails)
      console.log(reslt);
     
      if(reslt.status>=200 && reslt.status<300){
        alert("video uploaded!!")
        handleClose()
      //pass result to view component
       setAddResponseFromHome(reslt)
      }else{
        console.log(reslt);
        
      }
     }catch(err){
       console.log(err);
       
     }
      }else{
        alert("please fill the form!!!")
      }
     }
  return (
    <>
       <div className="d-flex align-items-center">
       <h5>Upload New Video</h5>
       <button onClick={handleShow} className='btn btn-warning ms-3 rounded-circle fw-bolder fs-5'>+</button>
       </div>
       <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        >
        <Modal.Header closeButton>
        <Modal.Title>Uploading Video details!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="border rounded p-3">
        <FloatingLabel  controlId="floatingCaption" label="Video caption">
        <Form.Control onChange={e=>setVideoDetails({...videoDetails,caption:e.target.value})} type="text" placeholder="caption" />
         </FloatingLabel>
        <FloatingLabel  className='mt-2' controlId="floatingUrl" label="Video Image URL">
        <Form.Control  onChange={e=>setVideoDetails({...videoDetails,imgUrl:e.target.value})} type="text" placeholder="video Image URL" />
        </FloatingLabel>
        <FloatingLabel className='mt-2' controlId="floatingLink" label="Video Youtube Link">
        <Form.Control onChange={e=>extractingEmbedLinkFroYoutubeLink(e.target.value)} type="text" placeholder="video Youtube Link" />
        </FloatingLabel>
        {/* condition rendering */}
        {
        InvalidYoutubeLink &&
        <div className="text-danger fw-bolder mt-2">Invalid youtube link...please try with another one</div>
         }
        </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
         Cancel
        </Button>
        <Button onClick={handleUploadVideo} className='btn btn-info' variant="primary">Add</Button>
        </Modal.Footer>
        </Modal>
    </>
  )
}

export default AddVideo