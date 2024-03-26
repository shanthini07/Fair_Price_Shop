import { useNavigate } from "react-router"

export const AdminHome=()=>{
    const navigate=useNavigate()

    return (

    <div style={{margin:"5rem 13% 0"}}>
  <div className="card" style={{height:"auto",width: "20rem",margin:"20px",float:"left"}}>
     <div style={{height:'55%'}}>
       <img className="card-img-top" style={{width:"100%",height:"300px"}} src="newuser.jpg" alt="Card image cap"/>
     </div>
     <div className="card-body">
      <button className="btn btn-success" style={{width:"95%"}} onClick={()=>navigate('/newuser')}>Add New User</button>   
     </div>
  </div>
 
  <div className="card" style={{height:"auto",width: "20rem",margin:"20px",float:"left"}}>
     <div style={{height:'40%'}}>
       <img className="card-img-top" style={{width:"100%",height:"300px"}} src="store.png" alt="Card image cap"/>
     </div>
     <div className="card-body">
      <button className="btn btn-success" style={{width:"95%"}} onClick={()=>navigate('/newshop')}>Add New Shop</button>   
     </div>
  </div>

  <div className="card" style={{height:"auto",width: "20rem",margin:"20px",float:"left"}}>
     <div style={{height:'55%'}}>
       <img className="card-img-top" style={{width:"100%",height:"300px"}} src="allshop.png" alt="Card image cap"/>
     </div>
     <div className="card-body">
      <button className="btn btn-success" style={{width:"95%"}} onClick={()=>navigate('/admin/viewshops')}>View All Shops</button>   
     </div>
  </div> 
  </div>
    )
}