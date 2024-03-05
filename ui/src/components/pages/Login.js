import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, FormLabel } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { json, useNavigate } from "react-router-dom";
import Navbar1 from "./Navbar1";
// import "./signup.css"



const redTheme = createTheme({ palette: { primary: red } })

const Login=()=>{

  const [email,setEmail]=useState();
const [password,setPassword]=useState();
const navigate=useNavigate()

const handleSubmit=async(e)=>{
  e.preventDefault();
await fetch("http://localhost:8000/rest/login",{
method:"POST",
body:JSON.stringify({email:email,password:password}),
headers:{
"content-type":"application/JSON"
}
  })
  .then(res=>res.json())
  .then(a=>{console.log(a);if(!a.msg){localStorage.setItem("token",JSON.stringify(a));navigate("/")}else{
    alert(a.msg)
  }})
console.log(localStorage.getItem("token"))

}

    return(
        <>
        <Navbar1 />
         <Box
      component="form"
      onSubmit={handleSubmit}
      
      sx={{
        "& .MuiTextField-root": { m: 1, width: "65ch" },marginTop:"50px"
      }}
    //   noValidate
    //   autoComplete="off"
      style={{ textAlign: "center",color:"red" }}
      
    >
      <h1 style={{ textAlign: "center",color:"red" }}>Login form</h1>


        <div>
          <FormControl>
            {/* <FormLabel style={{textAlign:"left"}}>Enter Email:</FormLabel> */}
            <TextField
              required
              id="filled-required"
              label="Enter Email"
              //    defaultValue="Hello World"
              variant="filled"
             type="email"
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
            />
          </FormControl>
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
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </FormControl>
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


export default Login;