import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar1 from './Navbar1';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Badge from 'react-bootstrap/Badge';
import Carousel from 'react-bootstrap/Carousel';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import  {userContext}  from "../../App";
import Footer from './Footer';
import createPersistedState from 'use-persisted-state';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

function Menu() {

  const [cartitems,setCartitems]=useContext(userContext)
  const [cart,setCart]=useState([])
    const [items,setItems]=useState();
    const [maincourse,setMaincourse]=useState();
    const [desserts,setDesserts]=useState();
    const [beverages,setBeverages]=useState();
const [lddata,setLddata]=useState();
const [dummy, setDummy] = useState(0);
// var filtered;

  //   const useLikesState = createPersistedState('likes');
  //   const useDislikesState = createPersistedState('dislikes'); 
  //  let [likes, setLikes] = useLikesState([]); 
  //   let [dislikes, setDislikes] = useDislikesState([]);
  // let [likes, setLikes] = useState([]); 
  // let [dislikes, setDislikes] = useState([]);
    const [count,setCount]=useState(1);
    const [sty,setSty]=useState(false);
    const navigate=useNavigate(); 

    const [fav,setFav]=useState(true);
    // const location=useLocation();
    // const rest=location.state.item;
    // console.log(rest);

    const params=useParams();
    const {name}=params;
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };


    useEffect(()=>{
        fetch("http://localhost:8000/rest/items")
        .then(res=>res.json())
        .then(data=>{setItems(data)})

        fetch("http://localhost:8000/rest/maincourse")
        .then(res=>res.json())
        .then(data1=>{setMaincourse(data1)})

        fetch("http://localhost:8000/rest/desserts")
        .then(res=>res.json())
        .then(data1=>{setDesserts(data1)})
        

         fetch("http://localhost:8000/rest/beverages")
         .then(res=>res.json())
         .then(data2=>{setBeverages(data2)})


         if(localStorage.getItem("token")){
          let {email}=JSON.parse(localStorage.getItem("token")) 
        
          
        
         fetch("http://localhost:8000/rest/getlikes",{
          method:"POST",
          body:JSON.stringify({email:email}),
          headers:{
            "content-type":"application/json"
          }
         })
         .then(res=>res.json())
         .then(data=>{setLddata(data)})
         }

          // generateRandomNumber();

          },[dummy])

          

//[items,maincourse,desserts,beverages,lddata]
          // console.log(performance.navigation.TYPE_RELOAD)
          // console.log(Date.now())
          // let result,p;

    //       if (window.performance.getEntriesByType("navigation")){
    //         p=window.performance.getEntriesByType("navigation")[0].type;
    //  console.log(p)
    //         if (p=='navigate'){result=0;console.log(result)}
    //         if (p=='reload'){result=1;console.log(result)}
    //         if (p=='back_forward'){result=2;console.log(result)}
    //         if (p=='prerender'){result=3;console.log(result)} 
    //      }

        //   const handleLikeClick = (cardId) => {  
        //    console.log(cardId)
        //     const updatedLikes = [...likes];
        //     const cardIndex = updatedLikes.findIndex((item) => item.cardId === cardId);
            
        //     if (cardIndex !== -1  ) { 
        //       updatedLikes[cardIndex].count += 1;

        //     } else {
        //       updatedLikes.push({ cardId, count: 1});
            
        //       console.log(updatedLikes)
        //     }

        // console.log(updatedLikes)
        //     likes=likes.slice();
        //     setLikes(updatedLikes);
        //     console.log(likes);
        // }
        //   const handleDislikeClick = (cardId) => {
            
        //     const updatedDislikes = [...dislikes];
        //     const cardIndex = updatedDislikes.findIndex((item) => item.cardId === cardId);
        
        //     if (cardIndex !== -1) {
        //       updatedDislikes[cardIndex].count += 1;
        //     } else {   
        //       updatedDislikes.push({ cardId, count: 1 });
        //       console.log(updatedDislikes)
        //     }
        // console.log(updatedDislikes)
        //     dislikes=dislikes.slice();
        //     setDislikes(updatedDislikes);
        //     console.log(dislikes);
        //   };


        //  function generateRandomNumber(){
        //     const number = Math.floor(Math.random() * 100); // Generate a random number between 0 and 100
        //     setRandomNumber(number);
            
        //   }

        if(localStorage.getItem("token")){
          var email=JSON.parse(localStorage.getItem("token")).email
        }
        useEffect(()=>{
       
        fetch("http://localhost:8000/rest/getitems/"+email)
        .then(res=>res.json())
        .then(response=>{setCart(response.items)})
         .catch(err=>console.log(err))
        
        },[])


          function handleAddItem(val,name,symbol,count){
           
            if(localStorage.getItem("token")){
              var {email}=JSON.parse(localStorage.getItem("token")) 
           
            }
            if(!localStorage.getItem("token")){
            cartitems.push({val,name,symbol,count})
            setCartitems(cartitems)
            }

            //================
            console.log(cart)
        const filteredcart=cart&& cart.filter(item=> {
          return (item.name==name)})
        console.log(filteredcart)
          if(filteredcart&&filteredcart.length!=0){
            console.log("filter")
            fetch("http://localhost:8000/rest/updateitems",{
              method:"POST",
              body:JSON.stringify({email:email,val:val,name:name,symbol:symbol,count:count}),
              headers:{
                "content-type":"application/JSON"
                }
            })
            .then(res=>console.log(res))

          }
          else{
            console.log(val,name,symbol,count)
            console.log(cart)
            cart.push({val,name,symbol,count})
            setCart(cart)
          console.log(cart) 
       //  console.log(JSON.stringify({email:email,cartitems:cart}))
       if(localStorage.getItem("token")){
        fetch("http://localhost:8000/rest/cartitems",{
          method:"POST",
          body:JSON.stringify({email:email,cartitems:cart}),
          headers:{
            "content-type":"application/JSON"
            }
        })
       }
          }

           
            
            // navigate("/cart",{state:{val:val,name:name,symbol:symbol,count:count}})
 navigate("/cart")
                       }


// if(window.location.reload==true){
//   setFav(!fav)
// }



const handleStarterLikes = (cardId) => {  

  
 
  fetch("http://localhost:8000/rest/starterlikes",{
    method:"POST",
    body:JSON.stringify({itemid:cardId,isLike:true}),
    headers:{
      "Content-type":"application/json"
    }
  })
  .then(res=>res.text())
  .then(response=>console.log(response))


if(localStorage.getItem("token")){
  let {email}=JSON.parse(localStorage.getItem("token")) 


fetch("http://localhost:8000/rest/likes",{
  method:"PATCH",
    body:JSON.stringify({email:email,item:[{itemid:cardId,liked:true}]}),
    headers:{
      "Content-type":"application/json"
    }
})
.then(res=>res.text())
.then(resp=>{console.log(resp);setDummy(dummy+1)})
}


// fetch("http://localhost:8000/rest/items")
//         .then(res=>res.json())
//         .then(data=>{setItems(data)})



}

const handleStarterUnlikes=(cardId)=>{
  fetch("http://localhost:8000/rest/starterlikes",{
    method:"POST",
    body:JSON.stringify({itemid:cardId,isLike:"unlike"}),
    headers:{
      "Content-type":"application/json"
    }
  })
  .then(res=>res.text())
  .then(response=>console.log(response))

  if(localStorage.getItem("token")){
    let {email}=JSON.parse(localStorage.getItem("token")) 
  
  fetch("http://localhost:8000/rest/removelikes",{
    method:"POST",
      body:JSON.stringify({email:email,item:[{itemid:cardId,liked:true}]}),
      headers:{
        "Content-type":"application/json"
      }
  })
  .then(res=>res.text())
  .then(resp=>{console.log(resp);setDummy(dummy+1)})
}}

const handleStarterUndislikes=(cardId)=>{
  fetch("http://localhost:8000/rest/starterlikes",{
    method:"POST",
    body:JSON.stringify({itemid:cardId,isLike:"undislike"}),
    headers:{
      "Content-type":"application/json"
    }
  })
  .then(res=>res.text())
  .then(response=>console.log(response))

  if(localStorage.getItem("token")){
    let {email}=JSON.parse(localStorage.getItem("token")) 
 
  fetch("http://localhost:8000/rest/removelikes",{
    method:"POST",
      body:JSON.stringify({email:email,item:[{itemid:cardId,disliked:true}]}),
      headers:{
        "Content-type":"application/json"
      }
  })
  .then(res=>res.text())
  .then(resp=>{console.log(resp);setDummy(dummy+1)})
}}



const handleStarterDislikes = (cardId) => {  
  
    fetch("http://localhost:8000/rest/starterlikes",{
      method:"POST",
      body:JSON.stringify({itemid:cardId,isLike:false}),
      headers:{
        "Content-type":"application/json"
      }
    })
    .then(res=>res.text())
    .then(response=>console.log(response))

    if(localStorage.getItem("token")){
      let {email}=JSON.parse(localStorage.getItem("token")) 
    
    
    fetch("http://localhost:8000/rest/likes",{
      method:"PATCH",
        body:JSON.stringify({email:email,item:[{itemid:cardId,disliked:true}]}),
        headers:{
          "Content-type":"application/json"
        }
    })
    .then(res=>res.text())
.then(resp=>{console.log(resp);setDummy(dummy+1)})
    }

  }

  const handleMaincourseLikes = (cardId) => {  
   
      fetch("http://localhost:8000/rest/maincourselikes",{
        method:"POST",
        body:JSON.stringify({itemid:cardId,isLike:true}),
        headers:{
          "Content-type":"application/json"
        }
      })
      .then(res=>res.text())
      .then(response=>console.log(response))

      if(localStorage.getItem("token")){
        let {email}=JSON.parse(localStorage.getItem("token")) 
   
      
      fetch("http://localhost:8000/rest/likes",{
        method:"PATCH",
          body:JSON.stringify({email:email,item:[{itemid:cardId,liked:true}]}),
          headers:{
            "Content-type":"application/json"
          }
      })
      .then(res=>res.text())
      .then(resp=>{console.log(resp);setDummy(dummy+1)})
      }
    }
    const handleMaincourseDislikes = (cardId) => {  
      
        fetch("http://localhost:8000/rest/maincourselikes",{
          method:"POST",
          body:JSON.stringify({itemid:cardId,isLike:false}),
          headers:{
            "Content-type":"application/json"
          }
        })
        .then(res=>res.text())
        .then(response=>console.log(response))

        if(localStorage.getItem("token")){
          let {email}=JSON.parse(localStorage.getItem("token")) 
         
        
        fetch("http://localhost:8000/rest/likes",{
          method:"PATCH",
            body:JSON.stringify({email:email,item:[{itemid:cardId,disliked:true}]}),
            headers:{
              "Content-type":"application/json"
            }
        })
        .then(res=>res.text())
    .then(resp=>{console.log(resp);setDummy(dummy+1)})
        }
      }


const handleMaincourseUnlikes=(cardId)=>{
  fetch("http://localhost:8000/rest/maincourselikes",{
    method:"POST",
    body:JSON.stringify({itemid:cardId,isLike:"unlike"}),
    headers:{
      "Content-type":"application/json"
    }
  })
  .then(res=>res.text())
  .then(response=>console.log(response))

  if(localStorage.getItem("token")){
    let {email}=JSON.parse(localStorage.getItem("token")) 
   
  fetch("http://localhost:8000/rest/removelikes",{
    method:"POST",
      body:JSON.stringify({email:email,item:[{itemid:cardId,liked:true}]}),
      headers:{
        "Content-type":"application/json"
      }
  })
  .then(res=>res.text())
  .then(resp=>{console.log(resp);setDummy(dummy+1)})
}}

const handleMaincourseUndislikes=(cardId)=>{
  fetch("http://localhost:8000/rest/maincourselikes",{
    method:"POST",
    body:JSON.stringify({itemid:cardId,isLike:"undislike"}),
    headers:{
      "Content-type":"application/json"
    }
  })
  .then(res=>res.text())
  .then(response=>console.log(response))

  if(localStorage.getItem("token")){
    let {email}=JSON.parse(localStorage.getItem("token")) 
    
  fetch("http://localhost:8000/rest/removelikes",{
    method:"POST",
      body:JSON.stringify({email:email,item:[{itemid:cardId,disliked:true}]}),
      headers:{
        "Content-type":"application/json"
      }
  })
  .then(res=>res.text())
  .then(resp=>{console.log(resp);setDummy(dummy+1)})
}}



      const handleDessertLikes = (cardId) => {  
       
          fetch("http://localhost:8000/rest/dessertlikes",{
            method:"POST",
            body:JSON.stringify({itemid:cardId,isLike:true}),
            headers:{
              "Content-type":"application/json"
            }
          })
          .then(res=>res.text())
          .then(response=>console.log(response))

          if(localStorage.getItem("token")){
            let {email}=JSON.parse(localStorage.getItem("token")) 
           
          
          fetch("http://localhost:8000/rest/likes",{
            method:"PATCH",
              body:JSON.stringify({email:email,item:[{itemid:cardId,liked:true}]}),
              headers:{
                "Content-type":"application/json"
              }
          })
          .then(res=>res.text())
          .then(resp=>{console.log(resp);setDummy(dummy+1)})
          }
        }
        const handleDessertDislikes = (cardId) => {  
          
            fetch("http://localhost:8000/rest/dessertlikes",{
              method:"POST",
              body:JSON.stringify({itemid:cardId,isLike:false}),
              headers:{
                "Content-type":"application/json"
              }
            })
            .then(res=>res.text())
            .then(response=>console.log(response))

            if(localStorage.getItem("token")){
              let {email}=JSON.parse(localStorage.getItem("token")) 
              
            
            fetch("http://localhost:8000/rest/likes",{
              method:"PATCH",
                body:JSON.stringify({email:email,item:[{itemid:cardId,disliked:true}]}),
                headers:{
                  "Content-type":"application/json"
                }
            })
            .then(res=>res.text())
        .then(resp=>{console.log(resp);setDummy(dummy+1)})
            }
          }

const handleDessertUnlikes=(cardId)=>{
  fetch("http://localhost:8000/rest/dessertlikes",{
    method:"POST",
    body:JSON.stringify({itemid:cardId,isLike:"unlike"}),
    headers:{
      "Content-type":"application/json"
    }
  })
  .then(res=>res.text())
  .then(response=>console.log(response))

  if(localStorage.getItem("token")){
    let {email}=JSON.parse(localStorage.getItem("token")) 
 
  fetch("http://localhost:8000/rest/removelikes",{
    method:"POST",
      body:JSON.stringify({email:email,item:[{itemid:cardId,liked:true}]}),
      headers:{
        "Content-type":"application/json"
      }
  })
  .then(res=>res.text())
  .then(resp=>{console.log(resp);setDummy(dummy+1)})
}}

const handleDessertUndislikes=(cardId)=>{
  fetch("http://localhost:8000/rest/dessertlikes",{
    method:"POST",
    body:JSON.stringify({itemid:cardId,isLike:"undislike"}),
    headers:{
      "Content-type":"application/json"
    }
  })
  .then(res=>res.text())
  .then(response=>console.log(response))

  if(localStorage.getItem("token")){
    let {email}=JSON.parse(localStorage.getItem("token")) 

  fetch("http://localhost:8000/rest/removelikes",{
    method:"POST",
      body:JSON.stringify({email:email,item:[{itemid:cardId,disliked:true}]}),
      headers:{
        "Content-type":"application/json"
      }
  })
  .then(res=>res.text())
  .then(resp=>{console.log(resp);setDummy(dummy+1)})
}}


          const handleBeveragesLikes = (cardId) => {  
           
              fetch("http://localhost:8000/rest/beverageslikes",{
                method:"POST",
                body:JSON.stringify({itemid:cardId,isLike:true}),
                headers:{
                  "Content-type":"application/json"
                }
              })
              .then(res=>res.text())
              .then(response=>console.log(response))

              if(localStorage.getItem("token")){
                let {email}=JSON.parse(localStorage.getItem("token")) 
              
              
              fetch("http://localhost:8000/rest/likes",{
                method:"PATCH",
                  body:JSON.stringify({email:email,item:[{itemid:cardId,liked:true}]}),
                  headers:{
                    "Content-type":"application/json"
                  }
              })
              .then(res=>res.text())
              .then(resp=>{console.log(resp);setDummy(dummy+1)})
              }
            }
            const handleBeveragesDislikes = (cardId) => {  
              
                fetch("http://localhost:8000/rest/beverageslikes",{
                  method:"POST",
                  body:JSON.stringify({itemid:cardId,isLike:false}),
                  headers:{
                    "Content-type":"application/json"
                  }
                })
                .then(res=>res.text())
                .then(response=>console.log(response))

                if(localStorage.getItem("token")){
                  let {email}=JSON.parse(localStorage.getItem("token")) 
                  console.log(email)
                
                fetch("http://localhost:8000/rest/likes",{
                  method:"PATCH",
                    body:JSON.stringify({email:email,item:[{itemid:cardId,disliked:true}]}),
                    headers:{
                      "Content-type":"application/json"
                    }
                })
                .then(res=>res.text())
            .then(resp=>{console.log(resp);setDummy(dummy+1)})
                }
              }

const handleBeveragesUnlikes=(cardId)=>{
  fetch("http://localhost:8000/rest/beverageslikes",{
    method:"POST",
    body:JSON.stringify({itemid:cardId,isLike:"unlike"}),
    headers:{
      "Content-type":"application/json"
    }
  })
  .then(res=>res.text())
  .then(response=>console.log(response))

  if(localStorage.getItem("token")){
    let {email}=JSON.parse(localStorage.getItem("token")) 

  fetch("http://localhost:8000/rest/removelikes",{
    method:"POST",
      body:JSON.stringify({email:email,item:[{itemid:cardId,liked:true}]}),
      headers:{
        "Content-type":"application/json"
      }
  })
  .then(res=>res.text())
  .then(resp=>{console.log(resp);setDummy(dummy+1)})
}}

const handleBeveragesUndislikes=(cardId)=>{
  fetch("http://localhost:8000/rest/beverageslikes",{
    method:"POST",
    body:JSON.stringify({itemid:cardId,isLike:"undislike"}),
    headers:{
      "Content-type":"application/json"
    }
  })
  .then(res=>res.text())
  .then(response=>console.log(response))

  if(localStorage.getItem("token")){
    let {email}=JSON.parse(localStorage.getItem("token")) 
  
  fetch("http://localhost:8000/rest/removelikes",{
    method:"POST",
      body:JSON.stringify({email:email,item:[{itemid:cardId,disliked:true}]}),
      headers:{
        "Content-type":"application/json"
      }
  })
  .then(res=>res.text())
  .then(resp=>{console.log(resp);setDummy(dummy+1)})
}}



  return (
  <>
  
  <Navbar1 name={name}/>
<Carousel style={{marginTop:"10px"}}>
<Carousel.Item>
        <img
          className="d-block w-100"
          // src="https://cdn.pixabay.com/photo/2016/02/05/15/34/pasta-1181189_960_720.jpg"
          src="https://wallpaperaccess.com/full/271681.jpg"
          alt="Second slide" style={{height:"650px",width:"100%"}}
        />

        <Carousel.Caption>
          <h3 style={{fontWeight:"bolder"}}>Explore your favourite food</h3>
          <p style={{fontWeight:"bold"}}>The best in town</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100  "
          src="https://cdn.pixabay.com/photo/2021/07/19/16/04/pizza-6478478_960_720.jpg"
          alt="First slide" style={{height:"650px",width:"100%"}}
        />
        <Carousel.Caption>
          <h3 style={{color:"white"}}>Grab 50% off and free delivery</h3>
          <p>Welcoming you with your favourite delicacies</p>
        </Carousel.Caption>
      </Carousel.Item>
    
      <Carousel.Item>
        <img
          className="d-block w-100"
          // src="https://vaya.in/recipes/wp-content/uploads/2018/03/Zafrani-Chicken-Biriyani.jpg"
          src="https://img.freepik.com/premium-photo/chicken-biriyani-using-jeera-rice-arranged-earthenware-with-raitha-grey-background_527904-8.jpg"
          alt="Third slide" style={{height:"650px",width:"100%"}}
        />

        <Carousel.Caption>
          <h3>Biriyani treats to brighten your day</h3>
          <p>
           Hurry up
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

    <marquee direction="right" style={{marginTop:"20px",fontSize:"20px",fontWeight:"bold",marginBottom:"20px"}}> ✨💫Life is too short to eat tasteless food..Pick your favourites now !!!!!!!!💫✨</marquee>


      <Container  >
         
       <Accordion expanded={expanded === 'panel1'}  onChange={handleChange('panel1')} style={{backgroundColor:"#d9f3fa"}}  >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '66%', flexShrink: 0 }}>
          <Stack direction="row" spacing={2}>
            <Avatar
        alt="Remy Sharp"
        src="https://cdn.pixabay.com/photo/2015/02/27/07/50/grill-651784_640.jpg"
        sx={{ width: 24, height: 24 }}
      />
      <Avatar alt="Remy Sharp" src="https://cdn.pixabay.com/photo/2015/02/27/07/50/grill-651784_640.jpg" />
      <Avatar
        alt="Remy Sharp"
        src="https://cdn.pixabay.com/photo/2015/02/27/07/50/grill-651784_640.jpg"
        sx={{ width: 56, height: 56 }}
      />
       <h3 style={{color:"red",marginLeft:"30px",marginTop:"10px"}}><img src={require('../gif/starters.gif')} width="120"  height="40" border="0" /></h3><p style={{fontWeight:"bold",paddingTop:"30px"}}>The taste from space</p></Stack>
          </Typography>
          {/* <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography> */}
        </AccordionSummary>
        <AccordionDetails >
          <Typography>
          
<Container>

{/* style={{display:'flex',flexDirection:"row",marginTop:"20px",flexWrap:"wrap"}} */}
<div className="row mt-5 d-flex justify-content-around align-items-center " >
   {items && items.map((item,k)=>{
 const filtered=lddata&&lddata.filter(lditem=>{
  return (lditem.itemid==item._id)
})

    return(
      <>
     <div  >
    
            <Card key={k} style={{ width: '22rem', border:"none",marginBottom:"40px",flexBasis:"33.33%",backgroundColor:"aliceblue" }}>
            {/* marginRight:"80px", */}
      <Card.Img variant="top" src={item.imgsrc} className='cardimg' />
      <Card.Body>
        <div className="uppertext">
            <p className="restaurant">{item.symbol}{item.name}</p>
            <p className="cost">₹{item.cost}</p>
            
        </div>
        <div className="middletext">
           
            {/* <p className="rating1">{item.rating}</p> */}
            <p className="rating1">
            <Box
      sx={{
        width: 20,
        
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={item.rating}
        size="small"
       
        
       
      />
      </Box>
            </p>
        
     
      

         
            {/* <p ><i className="fa fa-thumbs-up" aria-hidden="true" style={{fontSize:"20px",color:"red",marginLeft:"120px",cursor:"pointer"}} onClick={(e) =>{handleLikeClick(item._id)}} ><Badge  bg="light" text="dark">{likes.find((item1) => item1.cardId === item._id)?.count || 0}</Badge></i></p> */}
        {filtered&&filtered.length!=0&&filtered.find(item=>item.liked==true)?<p ><i className="fa fa-thumbs-up" aria-hidden="true" style={{fontSize:"20px",color:"red",marginLeft:"120px"}} onClick={(e) =>{handleStarterUnlikes(item._id)}} data-bs-toggle="tooltip" title="already liked" > <Badge  bg="light" text="dark">{item.like}</Badge></i></p>
:
     localStorage.getItem("token")?<p ><i className="fa fa-thumbs-up" aria-hidden="true" style={{fontSize:"20px",marginLeft:"120px",cursor:"pointer"}} onClick={(e) =>{handleStarterLikes(item._id)}} data-bs-toggle="tooltip" title="not liked"><Badge  bg="light" text="dark">{item.like}</Badge></i></p>:
     <p ><i className="fa fa-thumbs-up" aria-hidden="true" style={{fontSize:"20px",marginLeft:"120px",cursor:"pointer",color:"red"}}  ><Badge  bg="light" text="dark">{item.like}</Badge></i></p>
    
    }       
    
          
            {/* <i className="fa fa-thumbs-down" aria-hidden="true" style={{fontSize:"20px",color:"red",cursor:"pointer"}}  onClick={() => handleDislikeClick(item._id)}><Badge  bg="light" text="dark">{dislikes.find((item1) => item1.cardId === item._id)?.count || 0}</Badge></i> */}
            {filtered&&filtered.length!=0&&filtered.find(item=>item.disliked==true)? <i className="fa fa-thumbs-down" aria-hidden="true" style={{fontSize:"20px",color:"red"}} onClick={(e) =>{handleStarterUndislikes(item._id)}}   data-bs-toggle="tooltip" title="already disliked" ><Badge  bg="light" text="dark" >{item.dislike}</Badge></i>
:
localStorage.getItem("token")?<i className="fa fa-thumbs-down" aria-hidden="true" style={{fontSize:"20px",cursor:"pointer"}}  onClick={() => handleStarterDislikes(item._id)} data-bs-toggle="tooltip" title="not disliked"><Badge  bg="light" text="dark">{item.dislike}</Badge></i>
:<i className="fa fa-thumbs-down" aria-hidden="true" style={{fontSize:"20px",cursor:"pointer",color:"red"}}   data-bs-toggle="tooltip" title="not disliked"><Badge  bg="light" text="dark">{item.dislike}</Badge></i>
            }
           
            <OverlayTrigger trigger="click" placement="right" rootClose overlay={
                  <Popover id="popover-basic">
                  <Popover.Header as="h3" style={{fontSize:"20px",color:"red"}}>{item.name}</Popover.Header>
                  <Popover.Body>
                    {/* And here's some <strong>amazing</strong> content. It's very engaging.
                    right? */}
                    <Card style={{marginBottom:"10px"}}>
      <Card.Header style={{fontSize:"20px"}}>Extra</Card.Header>
      <Card.Body>
        <Card.Title>Select upto one option</Card.Title>
        <Card.Text >
        🌱 Onion & Lemon <input type='checkbox' />
        </Card.Text>
       
      </Card.Body>
    </Card>
    <ButtonGroup aria-label="Basic example">
      <Button variant="danger" onClick={(e)=>{if(count==1){e.preventDefault()} else{setCount(count=>count-1)}}}>-</Button>
      <Button variant="danger" >{count}</Button>
      <Button variant="danger" onClick={()=>setCount(count=>count+1)}>+</Button>
    </ButtonGroup>

    <Button variant="danger" style={{marginLeft:"1px"}} onClick={()=>handleAddItem(count * item.cost,item.name,item.symbol,count)}>Add item ₹{count * item.cost}</Button>
                  </Popover.Body>
                </Popover>
            }>
    <Button variant="danger" className='btn-sm' onClick={()=>setSty(!sty)} style={{border:"none",marginTop:"0px",marginBottom:"30px"}}> add to cart</Button>
  </OverlayTrigger>

        </div>

        <div className="line"></div>

        <div className='lowertext'>
         
          <h6 style={{fontSize:"small"}}>{item.desc}</h6>
          {/* <img src={item.delimg} className='delimg' alt=''/> */}
        </div>
      </Card.Body>
    </Card>

    </div>  
      </>
    )
      })}
      </div>
      </Container>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'}  onChange={handleChange('panel2')} style={{backgroundColor:"#d9f3fa"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '66%', flexShrink: 0 }}> 
          <Stack direction="row" spacing={2}>
            <Avatar
        alt="Remy Sharp"
        src="https://cdn.pixabay.com/photo/2022/11/18/05/40/biriyani-7599454_960_720.jpg"
        sx={{ width: 24, height: 24 }}
      />
      <Avatar alt="Remy Sharp" src="https://cdn.pixabay.com/photo/2022/11/18/05/40/biriyani-7599454_960_720.jpg" />
      <Avatar
        alt="Remy Sharp"
        src="https://cdn.pixabay.com/photo/2022/11/18/05/40/biriyani-7599454_960_720.jpg"
        sx={{ width: 56, height: 56 }}
      />
          <h3 style={{color:"red",marginLeft:"30px",marginTop:"10px"}}><img src={require('../gif/main.gif')} width="120"  height="40" border="0" /></h3><p style={{fontWeight:"bold",paddingTop:"30px"}}>Food that makes you say wow</p></Stack></Typography>
          {/* <Typography sx={{ color: 'text.secondary' }}>
            You are currently not an owner
          </Typography> */}
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <Container>

<div className="row mt-5 d-flex justify-content-around align-items-center " >
   {maincourse && maincourse.map((item,k)=>{
    const filtered=lddata&&lddata.filter(lditem=>{
      return (lditem.itemid==item._id)
    })
    return(
      <>
     <div  >
     {/* ,marginRight:"80px" */}
            <Card style={{ width: '22rem', border:"none",marginBottom:"40px",flexBasis:"33.33%",backgroundColor:"aliceblue" }} key={k} >
      <Card.Img variant="top" src={item.imgsrc} className='cardimg' />
      <Card.Body>
        <div className="uppertext">
            <p className="restaurant">{item.symbol}{item.name}</p>
            <p className="cost">₹{item.cost}</p>
            
        </div>
        <div className="middletext">
           
            <p className="rating1">
            <Box
      sx={{
        width: 20,
      
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={item.rating}
       
        size="small"
        
       
      />
      </Box>
            </p>
           {/* {fav=="false"?<p className='fav'><i class="fa fa-heart-o" aria-hidden="true" style={{fontSize:"22px"}} onClick={()=>{setFav(!fav)}}></i></p>:<p className='fav'><i class="fa fa-heart" aria-hidden="true" style={{fontSize:"22px"}}></i></p>} */}
           {/* <p><i class="fa fa-thumbs-up" aria-hidden="true" style={{fontSize:"20px",color:"red",marginLeft:"120px",cursor:"pointer"}} onClick={() => handleMaincourseLikes(item._id)}><Badge  bg="light" text="dark">{item.like}</Badge></i></p> */}
            {/* {likes.find((item1) => item1.cardId === item._id)?.count || 0} Likes */}
          
            {/* <i class="fa fa-thumbs-down" aria-hidden="true" style={{fontSize:"20px",color:"red",cursor:"pointer"}}  onClick={() => handleMaincourseDislikes(item._id)}><Badge  bg="light" text="dark">{item.dislike}</Badge></i>
        */}

            {filtered&&filtered.length!=0&&filtered.find(item=>item.liked==true)?<p ><i className="fa fa-thumbs-up" aria-hidden="true" style={{fontSize:"20px",color:"red",marginLeft:"120px"}} onClick={(e) =>{handleMaincourseUnlikes(item._id)}} data-bs-toggle="tooltip" title="already liked" > <Badge  bg="light" text="dark">{item.like}</Badge></i></p>
:
localStorage.getItem("token")?   <p ><i className="fa fa-thumbs-up" aria-hidden="true" style={{fontSize:"20px",marginLeft:"120px",cursor:"pointer"}} onClick={(e) =>{handleMaincourseLikes(item._id)}} ><Badge  bg="light" text="dark">{item.like}</Badge></i></p>
:<p ><i className="fa fa-thumbs-up" aria-hidden="true" style={{fontSize:"20px",marginLeft:"120px",cursor:"pointer",color:"red"}}  ><Badge  bg="light" text="dark">{item.like}</Badge></i></p>
    }
          
            {filtered&&filtered.length!=0&&filtered.find(item=>item.disliked==true)? <i className="fa fa-thumbs-down" aria-hidden="true" style={{fontSize:"20px",color:"red"}} onClick={(e) =>{handleMaincourseUndislikes(item._id)}} data-bs-toggle="tooltip" title="already disliked" ><Badge  bg="light" text="dark" >{item.dislike}</Badge></i>
:localStorage.getItem("token")?<i className="fa fa-thumbs-down" aria-hidden="true" style={{fontSize:"20px",cursor:"pointer"}}  onClick={() => handleMaincourseDislikes(item._id)}><Badge  bg="light" text="dark">{item.dislike}</Badge></i>
:<i className="fa fa-thumbs-down" aria-hidden="true" style={{fontSize:"20px",cursor:"pointer",color:"red"}}  ><Badge  bg="light" text="dark">{item.dislike}</Badge></i>


            }
      


            <OverlayTrigger trigger="click" placement="right" rootClose overlay={
                  <Popover id="popover-basic">
                  <Popover.Header as="h3" style={{fontSize:"20px",color:"red"}}>{item.name}</Popover.Header>
                  <Popover.Body>
                    {/* And here's some <strong>amazing</strong> content. It's very engaging.
                    right? */}
                    <Card style={{marginBottom:"10px"}}>
      <Card.Header style={{fontSize:"20px"}}>Extra</Card.Header>
      <Card.Body>
        <Card.Title>Select upto one option</Card.Title>
        <Card.Text >
        🌱 Onion & Lemon <input type='checkbox' />
        </Card.Text>
       
      </Card.Body>
    </Card>
    <ButtonGroup aria-label="Basic example">
      <Button variant="danger" onClick={(e)=>{if(count==1){e.preventDefault()} else{setCount(count=>count-1)}}}>-</Button>
      <Button variant="danger" >{count}</Button>
      <Button variant="danger" onClick={()=>setCount(count=>count+1)}>+</Button>
    </ButtonGroup>

    <Button variant="danger" style={{marginLeft:"1px"}} onClick={()=>handleAddItem(count * item.cost,item.name,item.symbol,count)}>Add item ₹{count * item.cost}</Button>
                  </Popover.Body>
                </Popover>
            }>
    <Button variant="danger" className='btn-sm' onClick={()=>setSty(!sty)} style={{border:"none",marginTop:"0px",marginBottom:"30px"}}> add to cart</Button>
  </OverlayTrigger>
        </div>

        <div className="line"></div>

        <div className='lowertext'>
         
          <h6 style={{fontSize:"small"}}>{item.desc}</h6>
          {/* <img src={item.delimg} className='delimg' alt=''/> */}
        </div>
      </Card.Body>
    </Card>

    </div>  
      </>
    )
      })}
      </div>
      </Container>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'}  onChange={handleChange('panel3')} style={{backgroundColor:"#d9f3fa"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '66%', flexShrink: 0 }}> 
          <Stack direction="row" spacing={2}>
            <Avatar
        alt="Remy Sharp"
        src="https://cdn.pixabay.com/photo/2016/06/12/15/03/cupcakes-1452178_640.jpg"
        sx={{ width: 24, height: 24 }}
      />
      <Avatar alt="Remy Sharp" src="https://cdn.pixabay.com/photo/2016/06/12/15/03/cupcakes-1452178_640.jpg" />
      <Avatar
        alt="Remy Sharp"
        src="https://cdn.pixabay.com/photo/2016/06/12/15/03/cupcakes-1452178_640.jpg"
        sx={{ width: 56, height: 56 }}
      />
          <h3 style={{color:"red",marginLeft:"30px",marginTop:"10px"}}><img src={require('../gif/desserts.gif')} width="120"  height="40" border="0" /></h3><p style={{fontWeight:"bold",paddingTop:"30px"}}>Flavors for royalty</p></Stack></Typography>
          {/* <Typography sx={{ color: 'text.secondary' }}>
            You are currently not an owner
          </Typography> */}
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <Container>

<div className="row mt-5 d-flex justify-content-around align-items-center " >
   {desserts && desserts.map((item,k)=>{
     const filtered=lddata&&lddata.filter(lditem=>{
      return (lditem.itemid==item._id)
    })
    return(
      <>
     <div  >
     
            <Card style={{ width: '22rem', border:"none",marginBottom:"40px",flexBasis:"33.33%",backgroundColor:"aliceblue" }} key={k}>
      <Card.Img variant="top" src={item.imgsrc} className='cardimg' />
      <Card.Body>
        <div className="uppertext">
            <p className="restaurant">{item.symbol}{item.name}</p>
            <p className="cost">₹{item.cost}</p>
            
        </div>
        <div className="middletext">
           
            <p className="rating1">
            <Box
      sx={{
        width: 20,
        
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={item.rating}
        size="small"
       
        
       
      />
      </Box>
            </p>
            {/* {fav=="false"?<p className='fav'><i class="fa fa-heart-o" aria-hidden="true" style={{fontSize:"22px"}} onClick={()=>{setFav(!fav)}}></i></p>:<p className='fav'><i class="fa fa-heart" aria-hidden="true" style={{fontSize:"22px"}}></i></p>} */}
            {/* <p><i class="fa fa-thumbs-up" aria-hidden="true" style={{fontSize:"20px",color:"red",marginLeft:"120px",cursor:"pointer"}} onClick={() => handleDessertLikes(item._id)}><Badge  bg="light" text="dark">{item.like}</Badge></i></p> */}
            {/* {likes.find((item1) => item1.cardId === item._id)?.count || 0} Likes */}
          
            {/* <i class="fa fa-thumbs-down" aria-hidden="true" style={{fontSize:"20px",color:"red",cursor:"pointer"}}  onClick={() => handleDessertDislikes(item._id)}><Badge  bg="light" text="dark">{item.dislike}</Badge></i> */}
         
            {filtered&&filtered.length!=0&&filtered.find(item=>item.liked==true)?<p ><i className="fa fa-thumbs-up" aria-hidden="true" style={{fontSize:"20px",color:"red",marginLeft:"120px"}} onClick={(e) =>{handleDessertUnlikes(item._id)}} data-bs-toggle="tooltip" title="already liked" > <Badge  bg="light" text="dark">{item.like}</Badge></i></p>
:
localStorage.getItem("token")?<p ><i className="fa fa-thumbs-up" aria-hidden="true" style={{fontSize:"20px",marginLeft:"120px",cursor:"pointer"}} onClick={(e) =>{handleDessertLikes(item._id)}} ><Badge  bg="light" text="dark">{item.like}</Badge></i></p>    
:localStorage.getItem("token")?<p ><i className="fa fa-thumbs-up" aria-hidden="true" style={{fontSize:"20px",marginLeft:"120px",cursor:"pointer",color:"red"}}  ><Badge  bg="light" text="dark">{item.like}</Badge></i></p>  
:<p ><i className="fa fa-thumbs-up" aria-hidden="true" style={{fontSize:"20px",marginLeft:"120px",cursor:"pointer",color:"red"}}  ><Badge  bg="light" text="dark">{item.like}</Badge></i></p>  
}
          
            {filtered&&filtered.length!=0&&filtered.find(item=>item.disliked==true)? <i className="fa fa-thumbs-down" aria-hidden="true" style={{fontSize:"20px",color:"red"}} onClick={(e) =>{handleDessertUndislikes(item._id)}} data-bs-toggle="tooltip" title="already disliked" ><Badge  bg="light" text="dark" >{item.dislike}</Badge></i>
:localStorage.getItem("token")?<i className="fa fa-thumbs-down" aria-hidden="true" style={{fontSize:"20px",cursor:"pointer"}}  onClick={() => handleDessertDislikes(item._id)}><Badge  bg="light" text="dark">{item.dislike}</Badge></i>
:<i className="fa fa-thumbs-down" aria-hidden="true" style={{fontSize:"20px",cursor:"pointer",color:"red"}}  ><Badge  bg="light" text="dark">{item.dislike}</Badge></i>


            }
         
            <OverlayTrigger trigger="click" placement="right" rootClose overlay={
                  <Popover id="popover-basic">
                  <Popover.Header as="h3" style={{fontSize:"20px",color:"red"}}>{item.name}</Popover.Header>
                  <Popover.Body>
                    {/* And here's some <strong>amazing</strong> content. It's very engaging.
                    right? */}
                    <Card style={{marginBottom:"10px"}}>
      <Card.Header style={{fontSize:"20px"}}>Extra</Card.Header>
      <Card.Body>
        <Card.Title>Select upto one option</Card.Title>
        <Card.Text >
        🌱 Onion & Lemon <input type='checkbox' />
        </Card.Text>
       
      </Card.Body>
    </Card>
    <ButtonGroup aria-label="Basic example">
      <Button variant="danger" onClick={(e)=>{if(count==1){e.preventDefault()} else{setCount(count=>count-1)}}}>-</Button>
      <Button variant="danger" >{count}</Button>
      <Button variant="danger" onClick={()=>setCount(count=>count+1)}>+</Button>
    </ButtonGroup>

    <Button variant="danger" style={{marginLeft:"1px"}} onClick={()=>handleAddItem(count * item.cost,item.name,item.symbol,count)}>Add item ₹{count * item.cost}</Button>
                  </Popover.Body>
                </Popover>
            }>
    <Button variant="danger" className='btn-sm' onClick={()=>setSty(!sty)} style={{border:"none",marginTop:"0px",marginBottom:"30px"}}> add to cart</Button>
  </OverlayTrigger>
            
        </div>

        <div className="line"></div>

        <div className='lowertext'>
         
          <h6 style={{fontSize:"small"}}>{item.desc}</h6>
          {/* <img src={item.delimg} className='delimg' alt=''/> */}
        </div>
      </Card.Body>
    </Card>

    </div>  
      </>
    )
      })}
      </div>
      </Container>
          </Typography>
        </AccordionDetails>
      </Accordion>
       <Accordion expanded={expanded === 'panel4'}  onChange={handleChange('panel4')} style={{backgroundColor:"#d9f3fa"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '66%', flexShrink: 0 }}>
          <Stack direction="row" spacing={2}>
            <Avatar
        alt="Remy Sharp"
        src="https://cdn.pixabay.com/photo/2016/11/22/18/58/alcohol-1850038_640.jpg"
        sx={{ width: 24, height: 24 }}
      />
      <Avatar alt="Remy Sharp" src="https://cdn.pixabay.com/photo/2016/11/22/18/58/alcohol-1850038_640.jpg" />
      <Avatar
        alt="Remy Sharp"
        src="https://cdn.pixabay.com/photo/2016/11/22/18/58/alcohol-1850038_640.jpg"
        sx={{ width: 56, height: 56 }}
      />
  
             <h3 style={{color:"red",marginLeft:"30px",marginTop:"10px"}}><img src={require('../gif/beverages.gif')} width="120"  height="40" border="0" /></h3><p style={{fontWeight:"bold",paddingTop:"30px"}}>Taste joy after every sip</p></Stack></Typography>
          {/* <Typography sx={{ color: 'text.secondary' }}>
            You are currently not an owner
          </Typography> */}
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <Container>

<div className="row mt-5 d-flex justify-content-around align-items-center " >
   {beverages && beverages.map((item,k)=>{
     const filtered=lddata&&lddata.filter(lditem=>{
      return (lditem.itemid==item._id)
    })
    return(
      <>
     <div  >
     
            <Card style={{ width: '22rem', border:"none",marginBottom:"40px",flexBasis:"33.33%",backgroundColor:"aliceblue" }} key={k} >
      <Card.Img variant="top" src={item.imgsrc} className='cardimg' />
      <Card.Body>
        <div className="uppertext">
            <p className="restaurant">{item.symbol}{item.name}</p>
            <p className="cost">₹{item.cost}</p>
            
        </div>
        <div className="middletext">
           
            <p className="rating1">
            <Box
      sx={{
        width: 20,
        
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={item.rating}
        size="small"
       
        
       
      />
      </Box>
            </p>
                      {/* <p><i class="fa fa-thumbs-up" aria-hidden="true" style={{fontSize:"20px",color:"red",marginLeft:"120px",cursor:"pointer"}} onClick={() => handleBeveragesLikes(item._id)}><Badge  bg="light" text="dark">{item.like}</Badge></i></p>
           
            <i class="fa fa-thumbs-down" aria-hidden="true" style={{fontSize:"20px",color:"red",cursor:"pointer"}}  onClick={() => handleBeveragesDislikes(item._id)}><Badge  bg="light" text="dark">{item.dislike}</Badge></i>
       */}
            {filtered&&filtered.length!=0&&filtered.find(item=>item.liked==true)?<p ><i className="fa fa-thumbs-up" aria-hidden="true" style={{fontSize:"20px",color:"red",marginLeft:"120px"}} onClick={(e) =>{handleBeveragesUnlikes(item._id)}} data-bs-toggle="tooltip" title="already liked" > <Badge  bg="light" text="dark">{item.like}</Badge></i></p>
:
localStorage.getItem("token")?  <p ><i className="fa fa-thumbs-up" aria-hidden="true" style={{fontSize:"20px",marginLeft:"120px",cursor:"pointer"}} onClick={(e) =>{handleBeveragesLikes(item._id)}} ><Badge  bg="light" text="dark">{item.like}</Badge></i></p>
:<p ><i className="fa fa-thumbs-up" aria-hidden="true" style={{fontSize:"20px",marginLeft:"120px",cursor:"pointer",color:"red"}} ><Badge  bg="light" text="dark">{item.like}</Badge></i></p>   
}
          
            {filtered&&filtered.length!=0&&filtered.find(item=>item.disliked==true)? <i className="fa fa-thumbs-down" aria-hidden="true" style={{fontSize:"20px",color:"red"}} onClick={(e) =>{handleBeveragesUndislikes(item._id)}} data-bs-toggle="tooltip" title="already disliked" ><Badge  bg="light" text="dark" >{item.dislike}</Badge></i>
:localStorage.getItem("token")? <i className="fa fa-thumbs-down" aria-hidden="true" style={{fontSize:"20px",cursor:"pointer"}}  onClick={() => handleBeveragesDislikes(item._id)}><Badge  bg="light" text="dark">{item.dislike}</Badge></i>
:<i className="fa fa-thumbs-down" aria-hidden="true" style={{fontSize:"20px",cursor:"pointer",color:"red"}}  ><Badge  bg="light" text="dark">{item.dislike}</Badge></i>


            }


            <OverlayTrigger trigger="click" placement="right" rootClose overlay={
                  <Popover id="popover-basic">
                  <Popover.Header as="h3" style={{fontSize:"20px",color:"red"}}>{item.name}</Popover.Header>
                  <Popover.Body>
                    {/* And here's some <strong>amazing</strong> content. It's very engaging.
                    right? */}
                    <Card style={{marginBottom:"10px"}}>
      <Card.Header style={{fontSize:"20px"}}>Extra</Card.Header>
      <Card.Body>
        <Card.Title>Select upto one option</Card.Title>
        <Card.Text >
        🌱 Onion & Lemon <input type='checkbox' />
        </Card.Text>
       
      </Card.Body>
    </Card>
    <ButtonGroup aria-label="Basic example">
      <Button variant="danger" onClick={(e)=>{if(count==1){e.preventDefault()} else{setCount(count=>count-1)}}}>-</Button>
      <Button variant="danger" >{count}</Button>
      <Button variant="danger" onClick={()=>setCount(count=>count+1)}>+</Button>
    </ButtonGroup>

    <Button variant="danger" style={{marginLeft:"1px"}} onClick={()=>handleAddItem(count * item.cost,item.name,item.symbol,count)}>Add item ₹{count * item.cost}</Button>
                  </Popover.Body>
                </Popover>
            }>
    <Button variant="danger" className='btn-sm' onClick={()=>setSty(!sty)} style={{border:"none",marginTop:"0px",marginBottom:"30px"}}> add to cart</Button>
  </OverlayTrigger>
            
        </div>

        <div className="line"></div>

        <div className='lowertext'>
         
          <h6 style={{fontSize:"small"}}>{item.desc}</h6>
          {/* <img src={item.delimg} className='delimg' alt=''/> */}
        </div>
      </Card.Body>
    </Card>

    </div>  
      </>
    )
      })}
      </div>
      </Container>
          </Typography>
        </AccordionDetails>
      </Accordion>
     
    </Container>
    <div style={{marginTop:"10px"}}> 
<Footer />
</div> 

  </>

  )
}

export default Menu