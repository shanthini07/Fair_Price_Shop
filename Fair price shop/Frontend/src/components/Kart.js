import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"

export const Kart=()=>{
    const [user,setUser]=useState({})
    const [shop,setShop]=useState({})
    const navigate=useNavigate()

    const LoadUser = async()=>{
        const u=JSON.parse(localStorage.getItem('user'))
        console.log(u)
        var us=await axios.post('http://localhost:8090/userlogin',{cardno:u.cardNo})
        setUser(us.data)
        var ration=await axios.post('http://localhost:8090/getshop',{sid:u.rationShopId})
        setShop(ration.data)
    }

    useEffect(()=>{
        LoadUser()
    },[])

    const purchase=async()=>{
        await axios.post('http://localhost:8090/placeorder',{id:user._id}).then(()=>{
            navigate('/bill')
        })
    }

    const KartDisplay=()=>{
        var total=0;
        return <div>
        <table className="table">
            <thead>
                <tr>
                    <th style={{width:"50%"}}>Item Name</th>
                    <th style={{width:"35%"}}>Quantity</th>
                    <th style={{width:"15%"}}>Price</th>
                </tr>
            </thead>
            <tbody>
        {shop.items && user.kart.map((i)=>{
            const itemPrice = shop.items.find(item => item.item === i.item).price;
            const itemTotal = i.quantity * itemPrice;
            total += itemTotal;
            return <tr>
                <td>{i.item}</td>
                <td>{i.quantity}</td>
                <td><b>₹ </b>{itemTotal}</td>
            </tr>
        })}
      </tbody>
      </table>
      <div style={{textAlign:"right",margin:"25px"}}><p><b>Total : </b>₹{total}</p></div>
      </div>
    }

    return (
        <div style={{width:"100%",height:"739px",paddingTop:"100px"}}>
            <h1 style={{textAlign:"center",fontFamily:"Roboto Slab",color:"#115913"}}>
                Cart
            </h1>
            {user.kart && user.kart.length>0 ? <div class="card" style={{width: "40rem",margin:"2rem auto",padding:"10px",boxShadow:"1px 1px 10px gray"}}>
                {KartDisplay()}
                <div className="card-body">
                    {user.bill && user.bill.length===0 ?
                    <button className="btn btn-success" style={{width:"99%",margin:"auto"}} onClick={()=>{
                        purchase() }}>
                            Buy Now
                    </button> : <button className="btn btn-danger" style={{width:"99%",margin:"auto"}}>
                            You Have not recieved the ordered items. You can not order now
                    </button>}
                </div> 
            </div> : <div class="card" style={{width: "40rem",margin:"2rem auto",padding:"10px",boxShadow:"1px 1px 10px gray"}}>
                    <h3 style={{textAlign:"center",margin:"20px"}}>No Items in Cart</h3>
                    <button className="btn btn-success" style={{width:"99%",margin:"10px auto"}} onClick={()=>{
                        navigate('/userhome') }}>
                            Add Products
                    </button>
                </div>}
    </div>
    )
}