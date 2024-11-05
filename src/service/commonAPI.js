import axios from "axios"

const commonAPI=async(httpMethod,url,reqBody)=>{
    const reqConfig={
        //when key and value will be same then onluy write keyname
        method:httpMethod,
        //instead of   url:url wrte url
        url,
        data:reqBody
        
    }
    return await axios(reqConfig).then(res=>{
        return res
    }).catch(err=>{
        return err
    })
}
export default commonAPI