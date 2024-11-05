//rafce
import React,{useState} from 'react'
import { Card , Modal } from 'react-bootstrap'
import { removeVideoAPI, saveHistoryAPI } from '../service/allAPI';

// props is object so put it as destructuring
// props (insideCategory ) data share from videocard component( button hide)
const VideoCard = ({displayData,setdeleteVideoResponseFromVideoCard,insideCategory}) => {
    // modal function from live demo
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = async () => {
      // display modal
      setShow(true);
     //store history in json
     const {caption,youTubeLink} = displayData
     const sysDateTime = new Date()
     console.log(sysDateTime.toLocaleString('en-US',{timeZoneName:'short'}));
     const timeStamp = sysDateTime.toLocaleString('en-US',{timeZoneName:'short'})
     const historyDetails={caption,youTubeLink,timeStamp}
     try{
      //return doesnot give because no display this willonly store in localhost:3000/history
        await saveHistoryAPI(historyDetails)
     }catch(err){
     console.log(err);
     
     }
    }
// deletevideo function
   const deleteVideo = async (id)=>{
    try{
     const reslt = await removeVideoAPI(id)
     setdeleteVideoResponseFromVideoCard(reslt)
    }catch(err){
      console.log(err);
      
    }
   }

  //  drag function
  const videoCardDragStarted = (e,dragVideoDetails)=>{
    console.log("inside videoCardDragStarted with videoId : "+dragVideoDetails?.id);
    //share dataa using event drag start thatswhy ondragstart comes with variable e ,e can transfer data using below method
    // stringify used to convert object to string dragvideodetails is a n object it conert into string
  e.dataTransfer.setData("videoDetails",JSON.stringify(dragVideoDetails))
  }
  return (
    <>
    {/* videocard dragging = draggable={true} dragevent-ondragstart*/}
      <Card draggable={true} onDragStart={e=>videoCardDragStarted(e,displayData)} style={{ height:'250px'}}>
      <Card.Img onClick={handleShow} variant="top" height={'150px'} src={displayData?.imgUrl} />
      <Card.Body>
      <Card.Text className='d-flex justify-content-between'>
      <p style={{color:'white'}}>{displayData?.caption}</p>
      {/* call in button */}
      {/* inside category false - button hide */}
      {
        !insideCategory && <button onClick={()=>deleteVideo(displayData?.id)} className='btn'> <i className='fa-solid fa-trash text-danger'></i></button>}
      </Card.Text>
      </Card.Body>
      </Card>
      <Modal size='lg' centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      <Modal.Title>Caption</Modal.Title>
      </Modal.Header>
      <Modal.Body>youTubeLink
      <iframe width="497" height="360" src={`${displayData?.youTubeLink}?autoplay=1`} title="caption"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    
      </Modal.Body>
        
      </Modal>
    </>
  )
}

export default VideoCard