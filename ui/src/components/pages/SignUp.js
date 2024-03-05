import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, FormHelperText, FormLabel } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import formik, { useFormik } from "formik";
import * as Yup from "yup";
import Navbar1 from "./Navbar1";

// import "./signup.css";

const redTheme = createTheme({ palette: { primary: red } })

const SignUp=()=>{

// const [fname,setFname]=useState();
// const [lname,setLname]=useState();
// const [email,setEmail]=useState();
// const [password,setPassword]=useState();
const [fnameError, setFnameError] = useState("")
const [lnameError, setLnameError] = useState("")
const [emailError, setEmailError] = useState("")
const [pwdError, setPwdError] = useState("")
const navigate=useNavigate()
const formik=useFormik({
  initialValues:{
    fname:"",
    lname:"",
    email:"",
    password:""
  },
  enableReinitialize: true,
        validationSchema: Yup.object({
        
          fname: Yup.string()
            .min(3, "Must be  3 characters or more")
            .max(20, "Must be 30 characters or less")
            .required("Required"),
            lname: Yup.string()
            .min(3, "Must be  3 characters or more")
            .max(20, "Must be 30 characters or less")
            .required("Required"),
            email: Yup.string()
           
            .required("Required"),
            password: Yup.string()
            .min(3, "Must be  3 characters or more")
            .max(30, "Must be 30 characters or less")
            .required("Required"),
        }),



onSubmit:(values)=>{
  
   setFnameError("");
   console.log(fnameError)
   console.log("first")
   setLnameError("");
   setEmailError("");
   setPwdError("");
    console.log(values)
    
    fetch("http://localhost:8000/rest/sign",{
        method:"POST",
        body:JSON.stringify({firstname:values.fname,lastname:values.lname,email:values.email,password:values.password}),
        headers:{
            "content-type":"application/JSON"
        }
    })
    
    .then(res=>res.text())
    .then(a=>{console.log(a);navigate("/login")})
    .catch(err=>console.log(err))
    
    
}

})

function checker(e){

if(e.target.value==0)
setFnameError("first name is required");
else if(e.target.value.length<3){
  setFnameError("first name should be 3 characters or more");
}
else{
      setFnameError("")
      
  }
}

function checker1(e){

  if(e.target.value==0)
  setLnameError("last name is required");
  else if(e.target.value.length<3){
    setLnameError("Last name should be 3 characters or more");
  }
  else{
        setLnameError("")
        
    }
  }

  function checker2(e){

    if(e.target.value==0)
    setEmailError("email is required");
    
    else{
          setEmailError("") 
      }
    }

    function checker3(e){

      if(e.target.value==0)
      setPwdError("Password is required");
      else if(e.target.value.length<3){
        setPwdError("Password should be 3 characters or more");
      }
      else{
            setPwdError("")
        }
      } 



return(
    <>
    <Navbar1 />
    <Box
      component="form"
     
      
      sx={{
        "& .MuiTextField-root": { m: 1, width: "65ch" },marginTop:"50px"
      }}
    //   noValidate
    //   autoComplete="off"
      style={{ textAlign: "center",color:"red" }}
      onSubmit={formik.handleSubmit}
    >
      <h1 style={{ textAlign: "center",color:"red" }}>Signup form</h1>

        <div>
          <FormControl>
            {/* <FormLabel style={{textAlign:"left"}}>Enter First name:</FormLabel> */}
            <TextField
              required
              id="filled-required1"
              label="Enter First name"
              //    defaultValue="Hello World"
              variant="filled"
              name="fname"
              
             value={formik.values.fname}
             onChange={formik.handleChange}
             onKeyUp={checker}
            />
          </FormControl>
          {fnameError.length > 0  ?
                 <p style={{ color: "Red" }}> {fnameError}</p>:null
                }


          {formik.touched.fname && formik.errors.fname ? (
            <div className="text-danger">{formik.errors.fname}</div>
          ) : null}
          
        </div>

        <div>
          <FormControl>
            {/* <FormLabel style={{textAlign:"left"}}>Enter Last name:</FormLabel> */}
            <TextField
              required
              id="filled-required2"
              label="Enter Last name"
              //    defaultValue="Hello World"
              variant="filled"
              name="lname"
              value={formik.values.lname}
              onChange={formik.handleChange}
              onKeyUp={checker1}
            />
          </FormControl>
          {lnameError.length > 0 &&
                 <p style={{ color: "Red" }}> {lnameError}</p>
                }
          {formik.touched.lname && formik.errors.lname ? (
            <div className="text-danger">{formik.errors.lname}</div>
          ) : null}
        </div>

        <div>
          <FormControl>
            {/* <FormLabel style={{textAlign:"left"}}>Enter Email:</FormLabel> */}
            <TextField
              required
              id="filled-required3"
              label="Enter Email"
              //    defaultValue="Hello World"
              variant="filled"
              name="email"
             type="email"
             value={formik.values.email}
             onChange={formik.handleChange}
             onKeyUp={checker2}
            />
          </FormControl>
          {emailError.length > 0 &&
                 <p style={{ color: "Red" }}> {emailError}</p>
                }

          {formik.touched.email && formik.errors.email ? (
            <div className="text-danger">{formik.errors.email}</div>
          ) : null}
        </div>


        <div>
          <FormControl>
            {/* <FormLabel style={{textAlign:"left"}}>Enter password</FormLabel> */}
            <TextField
            required
              id="filled-password-input"
              label="Enter password"
              type="password"
              // autoComplete="current-password"
              variant="filled"
              name="password"
              value={formik.values.password}
             onChange={formik.handleChange}
             onKeyUp={checker3}
            />
          </FormControl>
          {pwdError.length > 0 &&
                 <p style={{ color: "Red" }}> {pwdError}</p>
                }

          {formik.touched.password && formik.errors.password ? (
            <div className="text-danger">{formik.errors.password}</div>
          ) : null}
        </div>
        <div>
        <FormControl>
        <ThemeProvider theme={redTheme}>
        <Button variant="outlined" color="primary" type="submit" style={{marginTop:"20px"}}>
        Submit
      </Button>
      
      </ThemeProvider>
        </FormControl>
        
        </div>
      {/* </form> */}
    </Box>
   
    </>
)
}


export default SignUp;