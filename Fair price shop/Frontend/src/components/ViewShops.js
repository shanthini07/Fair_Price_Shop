import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"

export const ViewShops=()=>{
    const [shops, setShops]=useState([])
    const navigate=useNavigate()

    const LoadData=async()=>{
        var ration=await axios.get("http://localhost:8090/viewshops")
        setShops(ration.data)
    }

    useEffect(()=>{
        LoadData()
    },[])

    return (
        <div>
            {shops && shops.map((shop)=>{return <div class="card" style={{margin:"10px auto 10px",width: "50rem"}} onClick={()=>{navigate('/admin/updateshop/'+shop.shopid)}}>
                <div class="card-body">
                    <h4 class="card-title">{shop.shopid}</h4>
                    <h6 class="card-subtitle mb-2 text-muted">{shop.address && shop.address.district }</h6>
                    <p class="card-text">{shop.address && shop.address.place }, {shop.address && shop.address.district }, {shop.address && shop.address.pincode }</p>
                </div>
            </div>
            })}
        </div>
    )
}