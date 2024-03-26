import { ErrorMessage, Field, Form, Formik } from "formik";
import {  useNavigate } from "react-router-dom"
import axios from "axios"
import { useContext } from "react";
import { OTP } from "../context/OTPverify";

export default function UserLogin(){
    const [otp,setotp]=useContext(OTP)
    const navigate=useNavigate()
    const generateOTP=()=>{
        const random = Math.random()
        return Math.floor(100000 + random * (999999 - 100000))
    }

    const submitHandler = async(values, setSubmitting) => {
        var otpass=String(generateOTP())

        var user=await axios.post('http://localhost:8090/userlogin',values)
        
        await axios.post('http://localhost:8090/sms',{
            to:user.data.mobile,
            otp:otpass
        }).then(()=>{
            setotp([otpass,user.data])
            console.log('OTP sent')
            navigate('/otpverification')
        }).catch(()=>{
            console.log('Cannot send OTP')
        })
    }
    const validator=async(values)=>{
        const errors={}

        var users=await axios.get('http://localhost:8090/getusers')
        
        var user=users.data.filter((u)=>u.cardNo===values.cardno)
        if(user.length<1) errors.cardno="This card number does not exist"

        if(!values.cardno) errors.cardno="Please enter your card number"

        return errors
    }


    return (<div style={{width:"100%",height:"739px",backgroundImage:"url('background.jpg')",paddingTop:"250px"}}>
        <div style={{width:"25rem",height:"auto",padding:"10px",margin:"auto auto",backgroundColor:"white",borderRadius:"10px"}}>
            <Formik initialValues={{ cardno: "" }} onSubmit={submitHandler} validate={validator}>
            {({ isSubmitting }) =>(
            <Form>
                <div>
                    <h3 style={{textAlign:"center",fontFamily:"Roboto Slab"}}>Login</h3>
                </div>
                <div style={{margin:"10px"}}>
                    <Field class="form-control" type="text" name="cardno" placeholder="Enter Ration Card Number"/>
                    <ErrorMessage className="form-text text-muted" name="cardno" component="div"/>
                </div>
                <div style={{margin:"15px auto",width:"23rem"}}>
                    <button className="btn btn-success" style={{width:"100%",margin:"auto auto"}} type="submit" disabled={isSubmitting}>
                        Login
                    </button>
                </div>
                
            </Form>
            )}
            </Formik>
        </div>
      
    </div>)
}