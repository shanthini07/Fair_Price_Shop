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

export default function UserProfile(){
    const [user,setUser]=useState({})
    const [shop,setShop]=useState({})

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
    
    return <div><section style={{ backgroundColor: '#eee' }}>
    <MDBContainer className="py-5">
      <MDBRow>
        <MDBCol lg="4" style={{marginTop:"2px"}}>
          <MDBCard className="mb-4">
          <MDBCardBody className="text-center">
                <MDBCardImage
                  src="store.png "
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p ><b>Ration Shop Info</b></p>
                <p >Ration Shop ID : {shop.shopid}</p>
                {shop && shop.address && <p> Address : { shop.address.place}, {shop.address.district}, {shop.address.pincode}</p>}
                <hr/>
                <div style={{textAlign:"left"}}>
                    {shop.keeper && <p >Keeper Name : {shop.keeper.name}</p>}
                    {shop.keeper &&  <p >Keeper Mobile : {shop.keeper.mobile}</p>}
                </div>
              </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol lg="8">
          <MDBCard className="mb-4">
            <MDBCardBody>
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Family Head</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                {user.FamilyHead && <MDBCardText className="text-muted">{user.FamilyHead.name}</MDBCardText>}
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Phone number</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{user.mobile}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Ration Card No.</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{user.cardNo}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Spouse/Father Name : </MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                {user.FamilyHead && <MDBCardText className="text-muted">{user.FamilyHead.identityMember.name} ( {user.FamilyHead.identityMember.role} )</MDBCardText>}
                </MDBCol>
              </MDBRow>
              <hr />
              
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Family Head D.O.B</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                {user.FamilyHead && <MDBCardText className="text-muted">{user.FamilyHead.dob}</MDBCardText>}
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Address</MDBCardText>
                </MDBCol>
                {user.address &&  <MDBCol sm="9">
                  <MDBCardText className="text-muted">{user.address.place}</MDBCardText>
                  <MDBCardText className="text-muted">{user.address.district}</MDBCardText>
                  <MDBCardText className="text-muted">{user.address.pincode}</MDBCardText>
                </MDBCol>}
              </MDBRow>
              {user.familyMembers && user.familyMembers.length>0 && <hr/>}
              {user.familyMembers && user.familyMembers.length>0 && <MDBRow>
                  <MDBCol sm="3">
                      <MDBCardText>Family members</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                      {user.familyMembers.map((fm)=><MDBCardText className="text-muted"><p>{fm}</p></MDBCardText>)}
                  </MDBCol>
              </MDBRow>}
              
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </section></div>
}
