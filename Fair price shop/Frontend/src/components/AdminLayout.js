import { Outlet, useNavigate } from "react-router"

export const AdminLayout=()=>{
    const navigate=useNavigate()

    return (
<div>
    <div style={{fontFamily:"Roboto Slab"}}>
    <nav className="navbar navbar-dark bg-success navbar-expand lg" style={{justifyContent:"space-between",padding:"10px",color:"white",fontfamily: "Georgia"}}>
        <div>
        <img src="dash.png" style={{width:"2rem",height:"2rem", fontfamily: "Georgia"}}/>
          <h3 style={{float:"right"}} onClick={()=>navigate('/adminhome')}>Dashboard</h3>
        </div>
        <div>
            <img src="logout.png" style={{width:"2rem",height:"2rem", fontfamily: "Georgia"}}/>
          <h4 style={{float:"right",margin:"auto"}} onClick={()=>navigate('/login')}>Logout</h4>
        </div>        
    </nav>
    </div>
        <Outlet/>

</div>
    )
}