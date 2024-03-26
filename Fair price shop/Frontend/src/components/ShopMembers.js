import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"

export const ShopMembers=()=>{
    const [shop,setShop]=useState({})
    const [users,setUsers]=useState({})
    const navigate=useNavigate()

    const LoadUser = async()=>{
        const s=JSON.parse(localStorage.getItem('shop'))
        var ration=await axios.post('http://localhost:8090/shoplogin',s)
        setShop(ration.data)
        var us=await axios.post('http://localhost:8090/viewmembers',{sid:ration.data._id})
        setUsers(us.data)
    }

    useEffect(()=>{
        LoadUser()
    },[])

    return (
        <div>
            {users && users.length>0 ? users.map((u)=>{
                return <div class="card" style={{margin:"10px auto 10px",width: "50rem"}} onClick={()=>navigate('/shop/memberprofile/'+u.cardNo)}>
                <div class="card-body">
                    <h4 class="card-title">Family Head : {u.FamilyHead && u.FamilyHead.name}</h4>
                    <h6 class="card-subtitle mb-2 text-muted">Card.No : {u.cardNo}</h6>
                </div>
                </div>
            }) : <div style={{textAlign:"center",marginTop:"100px"}}>
                    <h3>
                        No Members are there
                    </h3>
            </div>}
        </div>
    )
}