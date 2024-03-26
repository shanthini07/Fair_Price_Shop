import { Outlet, useNavigate } from "react-router";

export default function ShopLayout(){
    const navigate=useNavigate()

    const logout=()=>{
        localStorage.removeItem('shop')
        navigate('/login')
    }

    return <div>
        <nav class="navbar navbar-dark bg-success navbar-expand-lg">
            <div class="collapse navbar-collapse" id="navbarNavDropdown" style={{justifyContent:"space-between"}}>
                <ul class="navbar-nav">
                    <li className="nav-link" style={{color:"white",fontFamily:"Roboto Slab"}} onClick={()=>navigate("/shop/shopprofile")}>Profile</li>
                    <li className="nav-link" style={{color:"white",fontFamily:"Roboto Slab"}} onClick={()=>navigate("/shop/shopmembers")} >Members </li>
                </ul> 
                <ul class="navbar-nav">
                    <li className="nav-link" style={{color:"white",fontFamily:"Roboto Slab",margin:"5px"}} onClick={()=>logout()} >LogOut</li>
                </ul>
            </div>
        </nav>
        <Outlet/>
    </div>
}