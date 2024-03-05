import React from 'react'
import Navbar1 from './Navbar1';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';
function Cart1() {
    const navigate=useNavigate()
  return (
    <>
 
 {localStorage.getItem("token")?<Cart />:
 <>
    <Navbar1 />

    <marquee style={{color:"red",fontSize:"30px",paddingTop:"180px"}} direction="right">Please Login to view your cart</marquee>
   <div style={{marginTop:"440px"}}><Footer /></div> 
   </>
  }
    </>
  )
}

export default Cart1
