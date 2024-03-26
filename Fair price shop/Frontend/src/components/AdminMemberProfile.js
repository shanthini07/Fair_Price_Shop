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

export default function AdminMemberProfile(){
    const [user,setUser]=useState({})
    const [shop,setShop]=useState({})
    const navigate=useNavigate()
    let {uid}=useParams()

    const LoadUser = async()=>{
        var us=await axios.post('http://localhost:8090/userlogin',{cardno:uid})
        setUser(us.data)
        var ration=await axios.post('http://localhost:8090/getshop',{sid:us.data.rationShopId})
        setShop(ration.data)
    }
    useEffect(()=>{
        LoadUser()
    },[])
    
    const ProvideItems=async()=>{
        await axios.post('http://localhost:8090/provideitems',{uid:user._id}).then(()=>{
            window.location.reload()
        })
    }

    var total=0;

    return <div><section style={{ backgroundColor: '#eee' }}>
    <MDBContainer className="py-5">
      <MDBRow>
        
        <MDBCol lg="15">
          <MDBCard className="lg-15">
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
