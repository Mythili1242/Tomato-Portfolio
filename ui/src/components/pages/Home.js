import React from 'react';
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from 'react';
import { useEffect } from 'react';
import Cards from './Cards';
import Navbar1 from './Navbar1';
import Footer from './Footer';
import Form from "react-bootstrap/Form";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

function Home() {

    const [food,setFood]=useState();
    const [dumm,setDumm]=useState(0);
    const [searchText, setSearchText] = useState('');
    
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages,setTotalPages]=useState();
  const [startIndex,setStartIndex]=useState();
  const [endIndex,setEndIndex]=useState();
  const [currentCards,setCurrentCards]=useState();
    useEffect(()=>{
        fetch("http://localhost:8000/rest")
        .then(res=>res.json())
        .then(data=>setFood(data))
     //   setDumm(prev=>prev+1)
    },[])

   
        
    const handleInputChange = (e) => {
      setSearchText(e.target.value);
    };

    // const handleKeyDown = (event) => {
    //   console.log("second")
    //   console.log(event.target.value)
    //   if (event.key === 'Backspace') {
    //     setSearchText(event.target.value.slice(0, -1));
    //   }
    // };

    const filteredData =food&& food.filter((item) =>
    item.rname.toLowerCase().includes(searchText.toLowerCase())
  );

  // useEffect(()=>{
  //   setTotalPages(Math.ceil(food&&food.length / 6))
  //   setStartIndex((currentPage - 1) * 6)
  //   setEndIndex(startIndex + 6)
  //   setCurrentCards(filteredData&&filteredData.slice(startIndex, endIndex))
  // },[filteredData])

  // function handlePrevPage() {
  //   setCurrentPage(currentPage - 1);
  // }

  // function handleNextPage() {
  //   setCurrentPage(currentPage + 1);
  // }


  return (
    <>

     
<Navbar1 />
<Form
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop:40
  }}
>
  <Form.Group className=" mx-2 col-lg-5" controlId="formBasicEmail">
    <Form.Control type="text" placeholder="Search for Restaurants" onChange={handleInputChange}
        // onKeyDown={handleKeyDown}
         />
  </Form.Group>
</Form>

      <section className="items mt-5 container">
    <h2 style={{marginBottom:40}}>Restaurants in Hyderabad open now</h2>
    <div className="row mt-2 d-flex justify-content-around align-items-center ">

    {/* <div className="card-container"> */}
   
        {/* {currentCards&&currentCards.map((card,k) => { */}
        {filteredData&&filteredData.map((card,k) => {
       
          return  <Cards key={k} food={card}  />
})}
      </div>
     

    </section>
    <div  className="container mb-5" style={{display:"flex",justifyContent:"right",marginRight:"8.5%"}}>
        
        {/* <ButtonGroup >
      <Button variant="danger" onClick={handlePrevPage} disabled={currentPage === 1} style={{backgroundColor:"aliceblue",color:"red"}}>Previous</Button>
      <Button variant="danger" >{currentPage}</Button>
      <Button variant="danger" onClick={handleNextPage} disabled={currentPage === totalPages} style={{backgroundColor:"aliceblue",color:"red"}}>Next</Button>
    </ButtonGroup> */}
        </div>
    <Footer />
    </>
  )
}



export default Home