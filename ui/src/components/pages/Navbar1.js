import React from 'react'
import Container from 'react-bootstrap/Container';
import { useState,useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
// import { red } from '@mui/material/colors';

function Navbar1(props) {

  const navigate=useNavigate();
  const [auth,setAuth]=useState(false);
  const tok2=localStorage.getItem("token")
let show1=true;
if(props.show==false){
  show1=props.show
}


  useEffect(()=>{
 
    if(tok2){
      var parsed=JSON.parse(tok2);
      let tok1=parsed.accessToken
    async function fetchprotected(){
      const result=await(await fetch("http://localhost:8000/rest/protected",{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          authorization:`Bearer ${tok1}`,
        }
      })).json();
      // console.log(result);
    if(result.data==="authorized"){
    setAuth(!auth);
    console.log(auth)
    }
    
    }
    fetchprotected();
    }
     },[])
//================
     const [data,setData]=useState();
     const [count,setCount]=useState();
     if(localStorage.getItem("token")){
       var email=JSON.parse(localStorage.getItem("token")).email
     }
     
     
     useEffect(()=>{
     
     fetch("http://localhost:8000/rest/getitems/"+email)
     .then(res=>res.json())
     .then(response=>{if(response.msg=="no items"){console.log("no items")} else{setData(response.items);setCount(response.items.length)} })
      .catch(err=>console.log(err))
     
     },[])
   
//================
  const handlelogout=async()=>{
    console.log("sec")
    const result=await(await fetch("http://localhost:8000/rest/logout",{
      method:"POST",
      credentials:"include"
    })).json()
    
    console.log("first")
    localStorage.setItem("token","");
    
    console.log("logged out")
    
     }

  return (
    <>
    



<Navbar collapseOnSelect expand="lg" bg="light" variant="danger" sticky='top'>
      <Container>
        <Navbar.Brand href="#home">
        <img
              alt=""
              src={require("../images/tomato2.png")}
              width="120px"
              height="45px"
              
          style={{backgroundColor:"red"}}
             onClick={()=>navigate("/")}
            />  

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        {localStorage.getItem("token")&&<Navbar.Text style={{color:"red",textAlign:"center",fontSize:"1.7vw",fontWeight:"bold",margin:"auto",marginLeft:"29%"}}>Welcome {((JSON.parse(localStorage.getItem("token"))).email)} </Navbar.Text>}
        {/* {props.name&&<Navbar.Text style={{color:"red",textAlign:"center",fontSize:"1.7vw",fontWeight:"bold",margin:"auto",marginLeft:"25%"}}>Welcome To {props.name}</Navbar.Text>} */}
          <Nav className="ms-auto">
        { auth&& <NavDropdown title="Admin" id="basic-nav-dropdown"  >
              <NavDropdown.Item href="/admin" style={{color:"red",fontWeight:"bold"}} data-bs-toggle="tooltip" title="click here to add restaurants">Restaurants</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/admin1" style={{color:"red",fontWeight:"bold"}} data-bs-toggle="tooltip" title="click here to add Menu items">
               Menu
              </NavDropdown.Item>
            </NavDropdown>}

            <Nav.Link href="/cart1">
            
           {count&&show1==true? <Badge badgeContent={count} color="error">
              <i className="fa fa-shopping-cart" aria-hidden="true" style={{color:"red",fontSize:"25px",marginLeft:"2%",marginTop:"2px"}}></i>
              </Badge>:show1==true?<i className="fa fa-shopping-cart" aria-hidden="true" style={{color:"red",fontSize:"25px",marginLeft:"2%",marginTop:"2px"}}></i>:null} 
           
           
           
              </Nav.Link>
            {/* {auth&&<Nav.Link href="/admin">admin</Nav.Link>} */}
           {!localStorage.getItem("token")&&<Nav.Link href="/login" style={{color:"red",fontWeight:"bold",marginLeft:"2%",fontSize:"20px"}}>Login</Nav.Link>}
            {!localStorage.getItem("token")&&<Nav.Link href="/signup" style={{color:"red",fontWeight:"bold",marginLeft:"2%",fontSize:"20px"}}>signup</Nav.Link>}
            {/* {localStorage.getItem("token")&&<Nav.Link href="/" onClick={handlelogout} style={{color:"red",fontWeight:"bold",marginLeft:"2%",fontSize:"20px"}}>Logout</Nav.Link>} */}
            
          
            {localStorage.getItem("token")&&  <NavDropdown title="MyAccount" id="basic-nav-dropdown">
            <NavDropdown.Item style={{color:"red",fontWeight:"bold"}}>Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/MyOrders" style={{color:"red",fontWeight:"bold"}}>Orders</NavDropdown.Item>
            <NavDropdown.Divider />
           <NavDropdown.Item href="/" onClick={handlelogout} style={{color:"red",fontWeight:"bold"}}>Logout</NavDropdown.Item>

          </NavDropdown>}
          
          </Nav>
          <Nav>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </>
  )
}

export default Navbar1;