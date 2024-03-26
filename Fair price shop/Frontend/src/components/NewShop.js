import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useContext } from "react";


export default function NewShop(){
    const navigate=useNavigate()
    const submitHandler = async(values, setSubmitting) => {
        
        var newshop={
            shopid: generateShopId(),
            keeper: {
              name: values.kname,
              mobile: '+91'+values.kmob
            },
            address: {
              place: values.aplace,
              district: values.adist,
              pincode: values.apin
            },
            password: values.password
        }
        await axios.post('http://localhost:8090/newshop',newshop).then((data)=>{
            alert('New Shop created')
            navigate('/adminhome')
        })
        
    }
    const validator=async(values)=>{
        
    }
    
    const generateShopId=()=> {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
      
        for (let i = 0; i < 9; i++) {
          const randomIndex = Math.floor(Math.random() * charset.length);
          code += charset[randomIndex];
        }
      
        const shopid = code
          .split('')
          .sort(() => Math.random() - 0.5)
          .join('');
        
        console.log(shopid)
        return shopid;
      }

    return (<div style={{width:"100%",height:"739px",backgroundImage:"url('background.jpg')",paddingTop:"150px"}}>
        <div style={{width:"25rem",height:"auto",padding:"10px",margin:"auto auto",backgroundColor:"white",borderRadius:"10px"}}>
            <Formik initialValues={{ 
                kname:"",
                kmon:"",
                aplace:"",
                adist:"",
                apin:"",
                password:"",
                mob:""
            }} onSubmit={submitHandler} validate={validator}>
            {({ isSubmitting }) =>(
            <Form>
                <div>
                    <h3 style={{textAlign:"center",fontFamily:"Roboto Slab"}}>New Shop</h3>
                </div>

                <div style={{margin:"10px"}}>
                    <Field class="form-control" type="text" name="aplace" placeholder="Address of Ration Shop" required/>
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

                <div style={{margin:"10px"}}>
                    <Field class="form-control" type="text" name="kname" placeholder="Shop Keeper Name" required/>
                    <ErrorMessage className="form-text text-muted" name="kname" component="div"/>
                </div>
 
                <div style={{margin:"10px"}}>
                    <Field class="form-control" type="text" name="kmob" placeholder="Mobile Number (10-digits)" required/>
                    <ErrorMessage className="form-text text-muted" name="kmob" component="div"/>
                </div>

                <div style={{width:"95%",margin:"auto auto"}}>
                    <Field class="form-control" type="password" name="password" placeholder="Create Shop password" required/>
                    <ErrorMessage className="form-text text-muted" name="password" component="div"/>
                </div>


                <div style={{margin:"15px auto",width:"23rem"}}>
                    <button className="btn btn-success" style={{width:"100%",margin:"auto auto"}} type="submit" disabled={isSubmitting}>
                        Create Shop
                    </button>
                </div>
                
            </Form>
            )}
            </Formik>
        </div>
      
    </div>)
}