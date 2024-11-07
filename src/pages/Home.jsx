// rafce
import React, { useState } from 'react'
import AddVideo from '../Compnent/AddVideo'
import { Link } from 'react-router-dom'
import ViewAdd from '../Compnent/ViewAdd'
import Category from '../Compnent/Category'

const Home = () => {
  const [deleteResponseFromView,setdeleteResponseFromView]=useState("")

const [addResponseFromHome,setAddResponseFromHome]=useState("")

const[deleteResponseFromCategory,setDeleteResponseFromCategory] = useState("")

  return (
    <div style={{paddingTop:'100px'}}>
      <div className="container mb-5 d-flex justify-content-between">
      <AddVideo setAddResponseFromHome={setAddResponseFromHome}/>
      <Link to={'/history'}>Watch History</Link>
      </div>
      <div className="container-fluid row my-5">
        <div className="col-lg-6">
          <h3>All Videos</h3>
          <ViewAdd setdeleteResponseFromView={setdeleteResponseFromView} deleteResponseFromCategory={deleteResponseFromCategory} addResponseFromHome={addResponseFromHome} />
        </div>
        <div className="col-lg-6">
          <Category deleteResponseFromView={deleteResponseFromView} setDeleteResponseFromCategory={setDeleteResponseFromCategory}/>
        </div>
      </div>
    </div>
  )
}

export default Home