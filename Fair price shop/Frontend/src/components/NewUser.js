import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom"
import axios, { all } from "axios"
import { useContext, useState } from "react";


export default function NewUser(){
    const navigate=useNavigate()
    const [cardno,setcardno]=useState([])

    const submitHandler = async(values, setSubmitting) => {
        var members=values.fmem.split(/\r?\n/)
        members=members.filter((m)=>m.length)
        uniqueCard()
        var newuser={
            cardNo: cardno[0],
            FamilyHead: {
              name: values.hname,
              dob: values.hdob,
              identityMember: {
                role: values.irole,
                name: values.iname
              }
            },
            members:members,
            address: {
              place: values.aplace,
              district: values.adist,
              pincode: values.apin
            },
            mobile: '+91'+values.mob ,
            cardType: values.ctype
          }
        await axios.post('http://localhost:8090/newuser',newuser).then((data)=>{
            if(data===1){
                alert('New User created')
                navigate('/adminhome')
            }
            else{
                alert('There are no shops in your area')
                navigate('/adminhome')
            }
        })
        
    }
    const validator=async(values)=>{
        
    }
    const uniqueCard=async()=>{
        var allusers=await axios.get('http://localhost:8090/getusers')
        allusers=allusers.data.map((a)=>a.cardNo)
        var cno=generateCardNo()
        while(allusers.indexOf(cno)>=0){
            cno=generateCardNo()
        }
        setcardno([cno])
    }
    
    const generateCardNo=()=> {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
      
        for (let i = 0; i < 10; i++) {
          const randomIndex = Math.floor(Math.random() * charset.length);
          code += charset[randomIndex];
        }
      
        const cardNo = code
          .split('')
          .sort(() => Math.random() - 0.5)
          .join('');
        
        console.log(cardNo)
        return cardNo;
    }

    return (<div style={{width:"100%",height:"739px",backgroundImage:"url('background.jpg')",paddingTop:"70px"}}>
        <div style={{width:"25rem",height:"auto",padding:"10px",margin:"auto auto",backgroundColor:"white",borderRadius:"10px"}}>
            <Formik initialValues={{ 
                hname: "",
                hdob:"",
                irole:"",
                iname :"",
                aplace:"",
                adist:"",
                apin:"",
                ctype:"",
                mob:"",
                fmem:""
            }} onSubmit={submitHandler} validate={validator}>
            {({ isSubmitting }) =>(
            <Form>
                <div>
                    <h3 style={{textAlign:"center",fontFamily:"Roboto Slab"}}>New User</h3>
                </div>

                <div style={{margin:"10px"}}>
                    <Field class="form-control" type="text" name="hname" placeholder="Family Head Name" required/>
                    <ErrorMessage className="form-text text-muted" name="hname" component="div"/>
                </div>

                <div style={{width:"95%",margin:"auto auto"}}>
                    <Field class="form-control" type="date" name="hdob" placeholder="Enter Date of Birth" required/>
                    <ErrorMessage className="form-text text-muted" name="hdob" component="div"/>
                </div>
 
                <div style={{margin:"10px"}}>
                    <Field class="form-control" type="text" name="mob" placeholder="Mobile Number (10-digits)" required/>
                    <ErrorMessage className="form-text text-muted" name="mob" component="div"/>
                </div>

                <div>
                    <label htmlFor="selectedOption" style={{margin:"12px"}}>
                        Card Type
                    </label>
                    <Field as="select" id="selectedOption" name="ctype" style={{width:"270px",borderRadius:"8px"}}>
                            <option key="Poor" value="Poor" label="Poor"  />
                            <option key="AAY" value="AAY" label="AAY"  />
                            <option key="Sugar" value="Sugar" label="Sugar"  />
                    </Field>
                </div>

                <div>
                    <label htmlFor="selectedOption" style={{margin:"12px"}}>
                        Identification Member
                    </label>
                    <Field as="select" id="selectedOption" name="irole" style={{width:"180px",borderRadius:"8px"}}>
                            <option key="Father" value="Father" label="Father"  />
                            <option key="Spouse" value="Spouse" label="Spouse"  />
                    </Field>
                </div>

                <div style={{margin:"10px"}}>
                    <Field class="form-control" type="text" name="iname" placeholder="Father/Spouse Name" required/>
                    <ErrorMessage className="form-text text-muted" name="iname" component="div"/>
                </div>

                <div style={{margin:"10px"}}>
                    <Field class="form-control" type="text" name="aplace" placeholder="Address with Door NO" required/>
                    <ErrorMessage className="form-text text-muted" name="aplace" component="div"/>
                </div>

                <div style={{margin:"10px"}}>
                    <Field class="form-control" type="text" name="adist" placeholder="District Name"required/>
                    <ErrorMessage className="form-text text-muted" name="adist" component="div"/>
                </div>

                <div style={{margin:"10px"}}>
                    <Field class="form-control" type="number" name="apin" placeholder="Pincode" required/>
                    <ErrorMessage className="form-text text-muted" name="apin" component="div"/>
                </div>

                <div style={{margin:"10px"}} >
                    <Field component="textarea" class="form-control" type="text" name="fmem" placeholder="Family Members names (1 member/line)"/>
                </div>

                <div style={{margin:"15px auto",width:"23rem"}}>
                    <button className="btn btn-success" style={{width:"100%",margin:"auto auto"}} type="submit" disabled={isSubmitting}>
                        Register
                    </button>
                </div>
                
            </Form>
            )}
            </Formik>
        </div>
      
    </div>)
}