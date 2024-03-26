import { useNavigate } from "react-router"

export const Login=()=>{
    const navigate=useNavigate()

    return (
<div>
    
    <div style={{margin:"7rem 13% 0"}}>
  <div className="card" style={{height:"auto",width: "20rem",margin:"20px",float:"left"}}>
     <div style={{height:'55%'}}>
       <img className="card-img-top" style={{width:"100%",height:"300px"}} src="setting.png" alt="Card image cap"/>
     </div>
     <div className="card-body" style={{margin:"auto auto",width:"100%"}}>
      <button className="btn btn-success" style={{width:"100%"}} onClick={()=>navigate('/adminlogin')}>Admin Login</button>   
     </div>
  </div>
 
  <div className="card" style={{height:"auto",width: "20rem",margin:"20px",float:"left"}}>
     <div style={{height:'40%'}}>
       <img className="card-img-top" style={{width:"100%",height:"300px"}} src="idd.png" alt="Card image cap"/>
     </div>
     <div className="card-body" style={{margin:"auto auto",width:"100%"}}>
      <button className="btn btn-success" style={{width:"100%"}} onClick={()=>navigate('/userlogin')}>User Login</button>   
     </div>
  </div>

  <div className="card" style={{height:"auto",width: "20rem",margin:"20px",float:"left"}}>
     <div style={{height:'40%'}}>
       <img className="card-img-top" style={{width:"100%",height:"300px"}} src="store.png" alt="Card image cap"/>
     </div>
     <div className="card-body" style={{margin:"auto auto",width:"100%"}}>
      <button className="btn btn-success" style={{width:"100%"}} onClick={()=>navigate('/shoplogin')}>Shop Login</button>   
     </div>
  </div>
  </div>
</div>
)
}