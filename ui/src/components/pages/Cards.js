import React from 'react'
import Card from 'react-bootstrap/Card'
import { useNavigate } from 'react-router-dom'
import "../style.css";
import { emphasize } from '@mui/material';

function Cards({food,id}) {
  // console.log(food);
  const navigate=useNavigate();

  function showCard(name){
    // navigate("/menu",{state:{item:item}})
    navigate("/menu/"+name)
  }
  
  const a=[food]; 
  // console.log(a)
  return (
   <>
  
    {a && a.map((item,k)=>{
    return(
      <>
     
            <Card key={k} style={{ width: '22rem', border:"none",marginBottom:"40px",backgroundColor:"#F0F8FF" }} onClick={()=>showCard(item.rname)} data-bs-toggle="tooltip" title="click to view menu" >
      <Card.Img variant="top" src={item.imgdata} className='cardimg' />
      <Card.Body>
        {/* <Card.Title>Card Title</Card.Title> */}
        {/* <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text> */}
        {/* <Button variant="primary">Go somewhere</Button> */}

        <div className="uppertext">
            <p className="restaurant">{item.rname}</p>
            <p className="rating">{item.rating}✩</p>
        </div>
        <div className="middletext">
            <p className="cuisine">{item.address}</p>
            <p className="cost">{item.price}</p>
        </div>

        <div className="line"></div>

        <div className='lowertext'>
          <img src={item.arrimg} className='arrimg' alt=''/>
          <p>{item.somedata}</p>
          <img src={item.delimg} className='delimg' alt=''/>
        </div>
      </Card.Body>
    </Card>

         
      </>
    )
      })}
   </>
  )
}

export default Cards