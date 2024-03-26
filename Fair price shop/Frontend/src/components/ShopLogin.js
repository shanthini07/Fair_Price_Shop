import { ErrorMessage, Field, Form, Formik } from "formik";
import {  useNavigate } from "react-router-dom"
import axios from "axios"


export default function ShopLogin(){
    const navigate=useNavigate()

    const submitHandler = async(values, setSubmitting) => {
        var shop=await axios.post('http://localhost:8090/shoplogin',values)
        if(shop.data.password===values.password){
            localStorage.setItem('shop',JSON.stringify(shop.data));
            navigate('/shop/shopprofile')
        }
        else{
            alert("Invalid password")
        }

    }
    const validator=async(values)=>{
        const errors={}

        var shops=await axios.get('http://localhost:8090/getshops')
        
        var shop=shops.data.filter((a)=>a.shopid===values.shopid)
        if(shop.length<1) errors.shopid="shop does not exist"

        if(!values.shopid) errors.shopid="Please enter shop id"
        if(!values.password) errors.password="Please enter shop password"

        return errors
    }


    return (<div style={{width:"100%",height:"739px",backgroundImage:"url('background.jpg')",paddingTop:"250px"}}>
        <div style={{width:"25rem",height:"auto",padding:"10px",margin:"auto auto",backgroundColor:"white",borderRadius:"10px"}}>
            <Formik initialValues={{ shopid: "",password:"" }} onSubmit={submitHandler} validate={validator}>
            {({ isSubmitting }) =>(
            <Form>
                <div>
                    <h3 style={{textAlign:"center",fontFamily:"Roboto Slab"}}>Ration Shop Login</h3>
                </div>

                <div style={{margin:"10px"}}>
                    <Field class="form-control" type="text" name="shopid" placeholder="Enter Shop ID"/>
                    <ErrorMessage className="form-text text-muted" name="shopid" component="div"/>
                </div>

                <div style={{margin:"10px"}}>
                    <Field class="form-control" type="password" name="password" placeholder="Enter Shop Password"/>
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