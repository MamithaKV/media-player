import commonAPI from "./commonAPI"
import SERVERURL from "./serverURL"

//saveVdeoAPI - post http reqst called Add Component
export const saveVideoAPI=async(videoDetails)=>{
    //posted video details=argument
    //api call-axios-in commonAPI so import
  return await commonAPI("POST",`${SERVERURL}/uploadVideos`,videoDetails)
}


//getAllVideosAPI - get http rqst called ViewAdd component wnen component displayed in browser its useefect hook
export const getAllVideosAPI=async()=>{
    //get video details=argument
    //api call-axios-in commonAPI so import
   return await commonAPI("GET",`${SERVERURL}/uploadVideos`,"")
}

//saveHistoryAPI - post http rqst to http://localhost:3000/history called by VideoCard component when we play video
export const saveHistoryAPI = async (historyDetails)=>{
    
   return await commonAPI("POST",`${SERVERURL}/history`,historyDetails)

}

// getAllHistoryAPI - get http rqst to  http://localhost:3000/history called by History componnent when it open in browser
export const getAllHistoryAPI=async()=>{
    
  return await commonAPI("GET",`${SERVERURL}/history`,"")
}

//deleteHistoryAPI - get http rqst to http://localhost:3000/history/id called by History component when user click on delete button
//we have to pass id in argument 
export const deleteHistoryAPI=async(id)=>{
    
  return await commonAPI("DELETE",`${SERVERURL}/history/${id}`,{})
}

//removeHistoryAPI - delete http rqst  called videoCard component when user click on delete button
//we have to pass id in argument 
export const removeVideoAPI=async(id)=>{
    
  return await commonAPI("DELETE",`${SERVERURL}/uploadVideos/${id}`,{})
}

// saveCategoryAPI - post http rqst to http://localhost:3000/categories called by CCategory component when user click on button
// categoryDetails={categoryName,allVideos}
export const saveCategoryAPI = async(categoryDetails)=>{
    return await commonAPI("POST",`${SERVERURL}/categories`,categoryDetails)
}

// removeCategoryAPI - delete http rqst t http://localhost:3000/history called Category component whenn usr click on delete button
export const deleteCategoryAPI=async(id)=>{
    
  return await commonAPI("DELETE",`${SERVERURL}/categories/${id}`,{})
}
// getAllCatgoryAPI  - get http reqst to http://localhost:3000/categories called by category component when 
export const getAllCategoryAPI=async()=>{
    
  return await commonAPI("GET",`${SERVERURL}/categories`,{})
}
// updateCategoryApi - put http rqst to http://localhost:3000/categories/id called by category component when  video drop over the category
export const updateCategoryApi = async(categoryDetails)=>{
  return await commonAPI("PUT",`${SERVERURL}/categories/${categoryDetails.id}`,categoryDetails)
}

