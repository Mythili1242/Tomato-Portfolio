import React, { useEffect } from 'react'
import { useState } from 'react'
import Navbar1 from './Navbar1';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
import delivering from '../images/delivering.jpg';
import delivered from '../images/delivered.jpg'


function MyOrders() {

const [orders,setOrders]=useState();
let a,b,c;
const {email}=JSON.parse(localStorage.getItem("token")) ;

    useEffect(()=>{
        fetch("http://localhost:8000/rest/getOrders",
        {
                method:'POST',
                body:JSON.stringify({email:email}),
                headers:{
                    'Content-Type':"application/JSON"
                }
        })
        .then(res=>res.json())
        .then(resp=>{setOrders(resp)})
    },[])

    const generateColor = (index) => {
        const hue = (index * 57) % 360; // Generate hue based on the index
        const saturation = 50; // Set a fixed saturation value
        const lightness = 80; // Set a fixed lightness value
    
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      };

  return (
    <>
        <Navbar1 />
<h4 className='prev'>Previous orders:</h4>
        {orders&&orders.length===0&&<p className='noitems'>No items ordered till now..order <a href='/'>now</a></p>}
        <div className="row mt-2 d-flex justify-content-around align-items-center " >
       
        {orders&&orders.map((order,k)=>{
           a=moment(Date.now()).format('LTS')
           b=moment(order.timestamp).format('LTS')
            c=(moment.utc(moment(a, "HH:mm:ss").diff(moment(b, "HH:mm:ss"))).format('mm'))
            console.log(c)
            return(   
                <>
{/* className={`card ${k % 2 === 0 ? 'even' : 'odd'}`} */}
 <Card key={k} style={{ width: '25rem', border:"none",marginBottom:"40px",backgroundColor: generateColor(k)}}>
 <Card.Header>Ordered on : {moment(order.timestamp).format('MMMM Do YYYY') }, {moment(order.timestamp).format('LTS') }</Card.Header>

  {/* {moment(order.timestamp).fromNow()}   */}

      <Card.Body>
        
        {order.items.map((item,k)=>{
            return (
                <>
               
                <Card.Title>Item:{item.symbol}{item.name}</Card.Title>
                <Card.Text>
                cost: ₹{item.val} {c>0?<img src={delivered} alt='no img' width={100} height={100} style={{float:"right",borderRadius:"50px"}} />:<img src={delivering} alt='no img' width={100} height={100} style={{float:"right",borderRadius:"50px"}} />} 
              </Card.Text>
              <Card.Text>Quantity:{item.count}</Card.Text>
              <Card.Text>Order status:{c>0?<span>Delivered</span>:<span>on the way</span>}</Card.Text>
              

             
              </>
            )
           
        })}
        
        
      </Card.Body>
    </Card> 
</>
            )
        })}
</div>

    </>
  )
}

export default MyOrders