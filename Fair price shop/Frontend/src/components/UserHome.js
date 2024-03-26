import {  useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import AAY from '../json/AAY.json';
import poor from '../json/poor.json';
import sugar from '../json/sugar.json';

export default function UserHome(){
    const [user,setUser]=useState({})
    const [shop,setShop]=useState({})
    const [products,setproducts]=useState([])
    const LoadUser = async()=>{
        const u=JSON.parse(localStorage.getItem('user'))
        var us=await axios.post('http://localhost:8090/userlogin',{cardno:u.cardNo})
        setUser(us.data)
        setproducts(us.data.cardType==='AAY'?AAY:us.data.cardType==='poor'?poor:sugar)
        setproducts(AAY)
        var ration=await axios.post('http://localhost:8090/getshop',{sid:u.rationShopId})
        setShop(ration.data)
    }

    useEffect(()=>{
        LoadUser()
    },[])

    const addToKart=async(item)=>{
        await axios.post('http://localhost:8090/addtokart',
        {
            id:user._id,
            kartitem:{
                item:item,
                quantity:document.getElementById(item).value
            }
        }).then(()=>{
            window.location.reload()
        })
    }

    return (<div>
        {products.map((i)=>{
            return (<div className="card" style={{height:"auto",width: "20rem",margin:"20px",float:"left"}}>
                <div style={{height:'55%'}}>
                    <img className="card-img-top" style={{width:"100%",height:"200px"}} src={i.name+".jpg"} alt="Card image cap"/>
                </div>
                <div style={{padding:"10px"}} >
                <h5 className="card-title" style={{marginBottom:"20px"}}>{i.name}</h5>
                <p>
                    Quantity : <select id={i.name} style={{width:"100px",marginLeft:"10px"}}>
                        {i.quantity.map((q)=>{
                            return <option value={q} >{q}kg</option>
                        })}
                    </select>
                </p>
                <p >Price : ₹{i.price} Per kg</p>
                <button className="btn btn-primary" style={{width:"99%",margin:"auto auto"}} onClick={()=>{
                        addToKart(i.name)  }} >
                            Add to cart
                        </button>
            </div>
            </div>)
        })}
    </div>)
}