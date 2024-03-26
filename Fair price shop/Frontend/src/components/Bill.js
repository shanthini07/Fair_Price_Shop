import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Bill(){
    var total=0

    const [user,setUser]=useState({})
    const [shop,setShop]=useState({})
    const navigate=useNavigate()
    const date =new Date().toString()

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
    return (
        <div style={{marginTop:"120px"}}>

        <div class="card" style={{width:"70rem",margin:"auto auto",boxShadow:"1px 1px 10px gray"}}>
  <div class="card-body">
    <div class="container mb-5 mt-3">
      <div class="container">

        <div class="col-md-12">
          <div class="text-center">
            <i class="fab fa-mdb fa-4x ms-0" style={{color:"#5d9fc5"}}></i>
          </div>
        </div>


        <div class="row">
          <div class="col-xl-8">
            <ul class="list-unstyled">
                <li class="text-muted">Card No : <span>{user.cardNo}</span></li>
                <li class="text-muted">Family Head : <span>{user.FamilyHead && user.FamilyHead.name}</span></li>
                <li class="text-muted">{user.address && user.address.place}</li>
                <li class="text-muted">{user.address && user.address.district} , {user.address && user.address.pincode}</li>
            </ul>
          </div>

          {/* <div class="col-xl-4">
            <ul class="list-unstyled">
              <li class="text-muted"><i class="fas fa-circle" ></i> <span
                  class="fw-bold">Issued Date: </span>{date.slice(4,15)}</li>
            </ul>
          </div> */}
        </div>

        <div class="row my-2 mx-1 justify-content-center">
        {user.bill && user.bill.length>0 ? (
          <table class="table table-striped table-borderless">
            <thead style={{backgroundColor:"#84B0CA"}} class="text-white">
              <tr>
               
                <th scope="col">Product Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                
              </tr>
            </thead>
            <tbody>
                {shop.items && user.bill.map((i)=>{
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
          </table>)  : (<h2 style={{textAlign:"center",margin:"20px"}}>You have not purchased anything</h2>)}
        </div>
        <div class="row">
          <div>
            <p style={{float:"right",margin:"auto"}}>
                <span class="text-black me-3" > Total Amount</span>
                <span style={{fontSize: "25px",float:"right",margin:"auto"}}>₹{total}</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
    )
}