import React, { useEffect, useState } from 'react';
import axios from "axios"
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import { useNavigate, useParams } from 'react-router';

export const UpdateShop=()=> {
    const [shop,setShop]=useState({})
    const navigate=useNavigate()
    let {sid}=useParams()

    const LoadUser = async()=>{
        var ration=await axios.post('http://localhost:8090/shoplogin',{shopid:sid})
        setShop(ration.data)
    }

    useEffect(()=>{
        LoadUser()
    },[])

    const updateproduct=async(item)=>{
        await axios.put('http://localhost:8090/updatequantity',{sid:shop._id,item:item}).then(()=>{
            window.location.reload()
        })
    }
    return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4" style={{marginTop:"2px"}}>
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                
                <p ><b>Ration Shop Info</b></p>
                <p >Ration Shop ID : {shop.shopid}</p>
                {shop && shop.address && <p> Address : { shop.address.place}, {shop.address.district}, {shop.address.pincode}</p>}
                <hr/>
                <div style={{textAlign:"left"}}>
                    {shop.keeper && <p >Keeper Name : {shop.keeper.name}</p>}
                    {shop.keeper &&  <p >Keeper Mobile : {shop.keeper.mobile}</p>}
                </div>
                <hr/>
                <p>Members: {shop.members && shop.members.length}</p>
                <button className="btn btn-success" onClick={()=>navigate('/admin/shopmembers/'+shop.shopid)}>
                  View Members
                </button>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

           <MDBCol lg="8" >
            <MDBCard className="mb-4">
              <MDBCardBody>

                {shop.items && shop.items.map((i)=>{
                    return <MDBRow style={{margin:"20px",width:"100%"}}>
                    <MDBCol sm='9'>                    
                        <MDBCardText className="text-muted" style={{ fontSize: '.77rem' ,width:'100%'}}>
                            {i.item} - Available : ({i.quantity}/200)
                        </MDBCardText>
                        <MDBProgress className="rounded" style={{width:"90%"}}>
                            <MDBProgressBar style={{ backgroundColor: 'green' }} width={i.quantity/2} valuemin={0} valuemax={100}  />
                        </MDBProgress>
                    </MDBCol>
                    {i.quantity<50 && <MDBCol sm='3' style={{marginTop:"15px"}}>
                        <button className='btn btn-success' onClick={()=>updateproduct(i.item)}>Refill</button>
                    </MDBCol>}
                </MDBRow>
                })}
    
                       
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          </MDBRow>
          </MDBContainer>
    </section>
  );
}