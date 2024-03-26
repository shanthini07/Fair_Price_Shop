import { ErrorMessage, Field, Form, Formik } from "formik";
import {  useNavigate } from "react-router-dom"
import axios from "axios"

export default function AdminLogin(){
    const navigate=useNavigate()

    const submitHandler = async(values, setSubmitting) => {
        var admin=await axios.post('http://localhost:8090/adminlogin',values)
        if(admin.data.password===values.password){
            navigate('/admin/adminhome')
        }
        else{
            alert("Invalid password")
        }

    }
    const validator=async(values)=>{
        const errors={}

        var admins=await axios.get('http://localhost:8090/getadmins')
        
        var admin=admins.data.filter((a)=>a.id===values.adminid)
        if(admin.length<1) errors.adminid="Admin does not exist"

        if(!values.adminid) errors.adminid="Please enter admin id"
        if(!values.password) errors.password="Please enter admin password"

        return errors
    }


    return (<div style={{width:"100%",height:"739px",backgroundImage:"url('background.jpg')",paddingTop:"250px"}}>
        <div style={{width:"25rem",height:"auto",padding:"10px",margin:"auto auto",backgroundColor:"white",borderRadius:"10px"}}>
            <Formik initialValues={{ adminid: "",password:"" }} onSubmit={submitHandler} validate={validator}>
            {({ isSubmitting }) =>(
            <Form>
                <div>
                    <h3 style={{textAlign:"center",fontFamily:"Roboto Slab"}}>Admin Login</h3>
                </div>

                <div style={{margin:"10px"}}>
                    <Field class="form-control" type="text" name="adminid" placeholder="Enter Admin ID"/>
                    <ErrorMessage className="form-text text-muted" name="adminid" component="div"/>
                </div>

                <div style={{margin:"10px"}}>
                    <Field class="form-control" type="password" name="password" placeholder="Enter Admin Password"/>
                    <ErrorMessage className="form-text text-muted" name="password" component="div"/>
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