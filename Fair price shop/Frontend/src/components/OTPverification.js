import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useContext } from "react";
import { OTP } from "../context/OTPverify"

export default function OTPVerification(){
    const navigate=useNavigate()
    const [otp,setotp]=useContext(OTP)

    const submitHandler = async(values, setSubmitting) => {
        if(otp[0]===values.otp){
            localStorage.setItem('user',JSON.stringify(otp[1]));
            navigate('/userprofile')
        }
        else{
            alert("invalid otp")
        }
    }

    return (<div style={{width:"100%",height:"739px",backgroundImage:"url('background.jpg')",paddingTop:"250px"}}>
        <div style={{width:"25rem",height:"auto",padding:"10px",margin:"auto auto",backgroundColor:"white",borderRadius:"10px"}}>
        <Formik initialValues={{otp:""}} onSubmit={submitHandler} >
        {({ isSubmitting }) =>(
            <Form>
                <div>
                    <h3 style={{textAlign:"center",fontFamily:"Roboto Slab"}}>Verify OTP</h3>
                </div>
                <div class="form-group" style={{margin:"10px"}}>
                    <Field class="form-control" type="text" name="otp" placeholder="Enter OTP"/>
                    <ErrorMessage class="form-text text-muted" name="text" component="div" />
                </div>
                <div style={{margin:"15px auto",width:"23rem"}}>
                    <button type="submit" style={{width:"100%",margin:"auto auto"}} class="btn btn-success form-group" disabled={isSubmitting} >
                        Verify OTP
                    </button> 
                </div>
             
            </Form>
        )}
        </Formik>
        </div>
        <div style={{textAlign:"center",color:"white",marginTop:"10px"}}>
            <p>OTP is sent to your registered mobile number</p>
            <p><b>DO NOT Share with anyone</b></p>
        </div>
        
    </div>)
}