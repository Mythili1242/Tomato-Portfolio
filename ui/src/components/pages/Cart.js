import React from "react";
import Card from "react-bootstrap/Card";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import { userContext } from "../../App";
import { useEffect } from "react";
import Confetti from "react-confetti";
import phone from "../images/phone.png";
import upi from "../images/upi.png";
import cod from "../images/cod.png";
import netb from "../images/netbank.png";
import gpay from "../images/gpay.png";
import Navbar1 from "./Navbar1";
import Footer from "./Footer";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useRef } from "react";
import { red } from "@mui/material/colors";
import Scooter from "./Scooter";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Media() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClosed = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [coupon, setCoupon] = useState(false);
  const [name, setname] = useState('');
  const [address, setAddress] = useState('');
  const [phn, setPhn] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [cartitems, setCartitems] = useContext(userContext); //not used in this component
  const initialValue = 0;
  const [couponApplied, setCouponApplied] = useState(false);
  const [instructions, setInstructions] = useState();
  const [payment, setpayment] = useState();
  const [cart, setCart] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessage1, setErrorMessage1] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const count = useRef();

  // const [net,setNet]=useState();
  let net;
  //===============

  const [data, setData] = useState();
  const [dummy, setDummy] = useState(0);
  if (localStorage.getItem("token")) {
    var email = JSON.parse(localStorage.getItem("token")).email;
  }

  useEffect(() => {
    fetch("http://localhost:8000/rest/getitems/" + email)
      .then((res) => res.json())
      .then((response) => {
        setData(response.items);
      })
      .catch((err) => console.log(err));
  }, [dummy]);

  //=============

  const handleApplyCoupon = () => {
    setCouponApplied(true);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const conf=()=>{
  //   console.log("first")
  //   return (<div><Confetti /></div>)
  // }
  useEffect(() => {
    if (couponApplied) {
      // const timer = setTimeout(() => {
      const timer = setTimeout(() => {
        setCouponApplied(false);
      }, 8000);

      // return () => clearTimeout(timer);
    }
  }, [couponApplied]);

  function removeItem(cart, val, name) {
    var i = cart.length;

    // console.log(cart[0].name)
    for (let j = 0; j < i; j++) {
      if (cart[j] && cart[j].hasOwnProperty(val) && cart[j].name === name) {
        var cart1 = cart.splice(j, 1);
        cart = cart.slice();
      }
    }
    // setCartitems(cart)
    setData(cart);
    const { email } = JSON.parse(localStorage.getItem("token"));
    fetch("http://localhost:8000/rest/cartitems", {
      method: "POST",
      body: JSON.stringify({ email: email, cartitems: data }),
      headers: {
        "content-type": "application/JSON",
      },
    });
  }

  function removeItem1(cart, val, name) {
    var i = cart.length;

    // console.log(cart[0].name)
    for (let j = 0; j < i; j++) {
      if (cart[j] && cart[j].hasOwnProperty(val) && cart[j].name === name) {
        var cart1 = cart.splice(j, 1);
        cart = cart.slice();
      }
    }
    setCartitems(cart);
  }

  function handleradio(e) {
    setpayment(e.target.value);
  }

  function handlePayment() {
    console.log(data);
    if (!data || data.length === 0) {
      alert("please add items into the cart");
      navigate("/");
    } else if (!name || !address || !phn || !payment) {
      alert("Please provide your details properly");
    } else {
      const { email } = JSON.parse(localStorage.getItem("token"));
      console.log(JSON.stringify({ email: email, cartitems: data }));
      fetch("http://localhost:8000/rest/orders", {
        method: "POST",
        body: JSON.stringify({ email: email, items: data }),
        headers: {
          "content-type": "application/JSON",
        },
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      alert("Payment successful");

      data.splice(0, data.length);
      setData(data);

      fetch("http://localhost:8000/rest/cartitems", {
        method: "POST",
        body: JSON.stringify({ email: email, cartitems: data }),
        headers: {
          "content-type": "application/JSON",
        },
      });
      navigate("/track");
    }
  }

  if (localStorage.getItem("token")) {
    var email = JSON.parse(localStorage.getItem("token")).email;
  }
  useEffect(() => {
    fetch("http://localhost:8000/rest/getitems/" + email)
      .then((res) => res.json())
      .then((response) => {
        setCart(response.items);
      })
      .catch((err) => console.log(err));
  }, []);

  const handlequantity = (val, name, symbol, count) => {
    console.log("hi");
    console.log(val, name, symbol, count);
    fetch("http://localhost:8000/rest/updateitems1", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        val: val,
        name: name,
        symbol: symbol,
        count: count,
      }),
      headers: {
        "content-type": "application/JSON",
      },
    })
      .then((res) => res.text())
      .then((res) => {
        setDummy(dummy + 1);
        console.log(res);
      });
  };

  useEffect(()=>{
valid()
  },[errorMessage,errorMessage1,errorMessage2])
  const handleSubmit = (event) => {
    event.preventDefault();

    if (name.trim() === '') {
      setErrorMessage(()=>'Please enter a value');
    }
    else if(name.length<=3){
      setErrorMessage(()=>'name should be minimun of 4 characters')
    }
    else{
      setErrorMessage(()=>'valid');

     
    }
   if(address.trim()===''){
      setErrorMessage1(()=>'Please enter your address');
    }
    else if(address.length<=5){
      setErrorMessage1(()=>'address should be minimun of 6 characters')
    }
     else {
      setErrorMessage1(()=>'valid');
  
    }
    if(phn.trim()===''){
      setErrorMessage2(()=>'Please enter your phone number');
    }
    else if(phn.length!==10){
      setErrorMessage2(()=>'number should be 10 characters')
    }
     else {
      setErrorMessage2(()=>'valid');
      
    }
    console.log(errorMessage1)
   valid();
  };

  const valid=()=>{
    if(errorMessage=='valid' && errorMessage1=='valid' && errorMessage2=='valid'){
      setSubmitted(!submitted);
      document.body.click();
    }
  }

  return (
    <>
      {couponApplied && <Confetti />}

      <div
        className="container"
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <div style={{ marginLeft: "-130px" }}>
          {/* style={{display:"flex", justifyContent:"left",alignContent:"center",flexWrap:"wrap",margin:"20px"}} */}

          <Card
            style={{
              width: "500px",
              maxHeight: "350px",
              flexBasis: "50%",
              overflowY: "scroll",
            }}
          >
            <Card.Header style={{ textAlign: "center", color: "red" }}>
              ITEM(S) ADDED
            </Card.Header>
            <Card.Body>
              <Card>
                {/* <Card.Header>Featured</Card.Header> */}
                <Card.Body>
                  {/* <Card.Title>{props.data.symbol}{props.data.name}</Card.Title> */}

                  {data &&
                    data.map((item) => {
                      count.current = item.count;
                      return (
                        <>
                          <Card.Title>
                            {item.symbol}
                            {item.name}
                            <span
                              onClick={() => {
                                removeItem(data, "name", item.name);
                              }}
                              style={{
                                marginLeft: "190px",
                                fontSize: "15px",
                                color: "red",
                                cursor: "pointer",
                              }}
                            >
                              Remove
                            </span>
                          </Card.Title>

                          <Card.Text>
                            cost:
                            <span style={{ marginLeft: "320px" }}>
                              ₹{item.val}
                            </span>
                          </Card.Text>
                          <Card.Text>
                            {/* Quantity:<span style={{marginLeft:"320px"}}>{item.count}</span> */}
                            Quantity:
                            <span style={{ marginLeft: "270px" }}>
                              <ButtonGroup aria-label="Basic example" size="sm">
                                <Button
                                  variant="danger"
                                  onClick={(e) => {
                                    if (count == 1) {
                                      e.preventDefault();
                                    } else {
                                      count.current -= 1;
                                      console.log(count.current);
                                      handlequantity(
                                        item.val,
                                        item.name,
                                        item.symbol,
                                        count.current
                                      );
                                    }
                                  }}
                                >
                                  -
                                </Button>
                                <Button variant="danger">
                                  {count.current}
                                  {/* {console.log(count.current)} */}
                                </Button>
                                <Button
                                  variant="danger"
                                  onClick={() => {
                                    count.current += 1;
                                    console.log(count.current);
                                    handlequantity(
                                      item.val,
                                      item.name,
                                      item.symbol,
                                      count.current
                                    );
                                  }}
                                >
                                  +
                                </Button>
                              </ButtonGroup>
                            </span>
                          </Card.Text>
                        </>
                      );
                    })}

                  {cartitems &&
                    cartitems.map((item) => {
                      return (
                        <>
                          <Card.Title>
                            {item.symbol}
                            {item.name}
                            <span
                              onClick={() => {
                                removeItem1(cartitems, "name", item.name);
                              }}
                              style={{
                                marginLeft: "190px",
                                fontSize: "15px",
                                color: "red",
                                cursor: "pointer",
                              }}
                            >
                              Remove
                            </span>
                          </Card.Title>

                          <Card.Text>
                            cost:
                            <span style={{ marginLeft: "360px" }}>
                              ₹{item.val}
                            </span>
                          </Card.Text>
                          <Card.Text>
                            Quantity:
                            <span style={{ marginLeft: "320px" }}>
                              {item.count}
                            </span>
                          </Card.Text>
                        </>
                      );
                    })}
                </Card.Body>
              </Card>

              <Card style={{ marginTop: "10px" }}>
                <Card.Body>
                  <Card.Text
                    style={{
                      borderBottom: "1px dashed grey",
                      paddingBottom: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    <i className="fa fa-plus-circle" aria-hidden="true"></i>Add
                    more items
                    <span style={{ paddingLeft: "200px" }}>
                      <i class="fa fa-arrow-right" aria-hidden="true"></i>
                    </span>
                  </Card.Text>
                  <Card.Text onClick={handleShow} style={{ cursor: "pointer" }}>
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    Add Cooking instructions
                    <span style={{ paddingLeft: "135px" }}>
                      <i className="fa fa-arrow-right" aria-hidden="true"></i>
                    </span>
                  </Card.Text>
                  <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title style={{ color: "red" }}>
                        Special cooking instructions{" "}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {/* <input type='text' placeholder='Start typing...' /> */}
                      <textarea
                        placeholder="Start typing..."
                        cols={60}
                        rows={4}
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                      ></textarea>

                      <p style={{ color: "red", marginTop: "20px" }}>
                        The restaurant will try their best to follow your
                        instructions.However,no cancellation or refund will be
                        possible if your request is not met
                      </p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={handleClose}
                        style={{ width: "470px" }}
                      >
                        Add
                      </Button>
                      {/* <Button variant="primary">Understood</Button> */}
                    </Modal.Footer>
                  </Modal>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
          <Card
            style={{
              width: "500px",
              maxHeight: "250px",
              marginLeft: "2px",
              flexBasis: "50%",
            }}
          >
            <Card.Header style={{ textAlign: "center", color: "red" }}>
              SAVINGS CORNER
            </Card.Header>
            <Card.Body>
              <Card>
                {/* <Card.Header>Featured</Card.Header> */}
                <Card.Body>
                  {/* <Card.Title>{props.data.symbol}{props.data.name}</Card.Title> */}
                  <Card.Text>Save ₹120 more on this order</Card.Text>

                  <Card.Text style={{ display: "flex" }}>
                    Code:TREAT
                    {!coupon ? (
                      <p
                        style={{
                          color: "red",
                          marginLeft: "300px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setCoupon(true);
                          alert("coupon applied");
                          handleApplyCoupon();
                        }}
                      >
                        Apply
                      </p>
                    ) : (
                      <p style={{ color: "green", marginLeft: "230px" }}>
                        Coupon applied
                      </p>
                    )}
                  </Card.Text>

                  <Card.Text
                    style={{
                      color: "red",
                      borderTop: "1px dashed grey",
                      marginTop: "-26px",
                      paddingTop: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate("/coupons");
                    }}
                  >
                    View all coupons
                  </Card.Text>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
          <Scooter />

          <Card
            style={{
              width: "500px",
              maxHeight: "420px",
              marginLeft: "2px",
              flexBasis: "50%",
              marginBottom: "20px",
            }}
          >
            <Card.Header style={{ textAlign: "center", color: "red" }}>
              BILL SUMMARY
            </Card.Header>
            <Card.Body>
              <Card>
                {cartitems.length > 0 && (
                  <Card.Body>
                    <Card.Text>
                      {/* <h6> Subtotal: <span style={{marginLeft:"320px"}}>₹{props.data.val}</span></h6> */}
                      <h6>
                        {" "}
                        Subtotal:{" "}
                        <span style={{ marginLeft: "320px" }}>
                          ₹
                          {cartitems.reduce(
                            (accumulator, current) =>
                              accumulator + current.val * current.count,
                            initialValue
                          )}
                        </span>
                      </h6>

                      <p>includes ₹2 feeding India donation</p>
                    </Card.Text>
                    <Card.Text style={{ display: "flex" }}>
                      GST and restaurant charges{" "}
                      <span style={{ marginLeft: "200px" }}>₹17.85</span>{" "}
                    </Card.Text>
                    <Card.Text>
                      Delivery Partener fee
                      <span style={{ marginLeft: "250px" }}>₹40</span>
                    </Card.Text>

                    <Card.Text
                      style={{
                        borderTop: "1px dashed grey",
                        marginTop: "-12px",
                        paddingTop: "10px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      {/* Grand Total <span style={{marginLeft:"280px",}}>₹{props.data.val +57.85}</span>  */}
                      Grand Total{" "}
                      <span style={{ marginLeft: "270px" }}>
                        ₹
                        {cartitems.reduce(
                          (accumulator, current) =>
                            accumulator + current.val * current.count,
                          initialValue
                        ) + 57.85}
                      </span>
                    </Card.Text>
                    {coupon && (
                      <Card.Text>
                        Coupon - (TREAT){" "}
                        <span style={{ marginLeft: "260px" }}>-₹120</span>
                      </Card.Text>
                    )}
                    {coupon ? (
                      <Card.Text style={{ fontWeight: "bold" }}>
                        Net Payable{" "}
                        <span style={{ marginLeft: "265px" }}>
                          ₹
                          {cartitems.reduce(
                            (accumulator, current) =>
                              accumulator + current.val * current.count,
                            initialValue
                          ) - 62.15}
                        </span>
                      </Card.Text>
                    ) : (
                      <Card.Text style={{ fontWeight: "bold" }}>
                        Net Payable{" "}
                        <span style={{ marginLeft: "265px" }}>
                          ₹
                          {cartitems.reduce(
                            (accumulator, current) =>
                              accumulator + current.val * current.count,
                            initialValue
                          ) + 57.85}
                        </span>
                      </Card.Text>
                    )}
                  </Card.Body>
                )}

                {data && (
                  <Card.Body>
                    <Card.Text>
                      {/* <h6> Subtotal: <span style={{marginLeft:"320px"}}>₹{props.data.val}</span></h6> */}
                      {/* <h6> Subtotal: <span style={{marginLeft:"320px"}}>₹{data.reduce((accumulator,current) => accumulator + current.val, initialValue)}</span></h6> */}
                      <h6>
                        {" "}
                        Subtotal:{" "}
                        <span style={{ marginLeft: "320px" }}>
                          ₹
                          {data.reduce((total, item) => {
                            return total + item.val * item.count;
                          }, initialValue)}
                        </span>
                      </h6>
                      <p>includes ₹2 feeding India donation</p>
                    </Card.Text>
                    <Card.Text style={{ display: "flex" }}>
                      GST and restaurant charges{" "}
                      <span style={{ marginLeft: "200px" }}>₹17.85</span>{" "}
                    </Card.Text>
                    <Card.Text>
                      Delivery Partener fee
                      <span style={{ marginLeft: "250px" }}>₹40</span>
                    </Card.Text>

                    <Card.Text
                      style={{
                        borderTop: "1px dashed grey",
                        marginTop: "-12px",
                        paddingTop: "10px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      {/* Grand Total <span style={{marginLeft:"280px",}}>₹{props.data.val +57.85}</span>  */}
                      Grand Total{" "}
                      <span style={{ marginLeft: "270px" }}>
                        ₹
                        {data.reduce(
                          (accumulator, current) =>
                            accumulator + current.val * current.count,
                          initialValue
                        ) + 57.85}
                      </span>
                    </Card.Text>
                    {coupon && (
                      <Card.Text>
                        Coupon - (TREAT){" "}
                        <span style={{ marginLeft: "260px" }}>-₹120</span>
                      </Card.Text>
                    )}
                    {coupon ? (
                      <Card.Text style={{ fontWeight: "bold" }}>
                        Net Payable{" "}
                        <span style={{ marginLeft: "265px" }}>
                          ₹
                          {data.reduce(
                            (accumulator, current) =>
                              accumulator + current.val * current.count,
                            initialValue
                          ) - 62.15}
                        </span>
                      </Card.Text>
                    ) : (
                      <Card.Text style={{ fontWeight: "bold" }}>
                        Net Payable{" "}
                        <span style={{ marginLeft: "265px" }}>
                          ₹
                          {
                            (net =
                              data.reduce(
                                (accumulator, current) =>
                                  accumulator + current.val * current.count,
                                initialValue
                              ) + 57.85)
                          }
                        </span>
                      </Card.Text>
                    )}
                    {/* {net=(data.reduce((accumulator,current) => accumulator + current.val*current.count, initialValue)+57.85)} */}
                  </Card.Body>
                )}
              </Card>
            </Card.Body>
          </Card>
        </div>

        <div style={{ marginLeft: "50px" }}>
          {/* style={{display:"flex", justifyContent:"center",alignContent:"center",marginBottom:"50px",}} */}
          <OverlayTrigger
            trigger="click"
            placement="right"
            rootClose
            overlay={
              <Popover id="popover-basic">
                <Popover.Header as="h3">Enter Address</Popover.Header>
                <Popover.Body>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                  >
                    <TextField
                      id="standard-basic"
                      label="Enter Name"
                      variant="standard"
                      value={name}
                      // error={name=== ''}
                      // helperText={name=== '' ? 'Please enter a value!' : null}
                      onChange={(e) => setname(e.target.value)}
                    />
                    {errorMessage && <p>{errorMessage}</p>}
                
                    <TextField
                      id="standard-basic"
                      label="Enter Address"
                      variant="standard"
                      value={address}
                   
                      onChange={(e) => setAddress(e.target.value)}
                    />
                     {errorMessage1 && <p>{errorMessage1}</p>}
                    <TextField
                      id="standard-basic"
                      label="Enter Phone number"
                      variant="standard"
                      type="Number"
                    //   inputProps={{ maxLength: 10 }}
                
                    //   onInput = {(e) =>{
                    //     e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                    // }}
                      onChange={(e) => setPhn(e.target.value)}
                    />
                     {errorMessage2 && <p>{errorMessage2}</p>}
                    <Button
                    type="submit"
                      // onClick={() => {
                     
                      //   setSubmitted(!submitted);
                      //   document.body.click();
                      // }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Popover.Body>
              </Popover>
            }
          >
            <h5 style={{ marginTop: "30px" }}>
              Your Details
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </h5>
          </OverlayTrigger>
          {submitted && (
            <Card style={{ width: "400px", marginTop: "30px" }}>
              <Card.Header>Details</Card.Header>
              <Card.Body>
                <Card.Text>Name:{name}</Card.Text>
                <Card.Text>Address:{address}</Card.Text>
                <Card.Text>Phone number:{phn}</Card.Text>
              </Card.Body>
            </Card>
          )}

          <Card
            style={{
              width: "400px",
              height: "220px",
              marginLeft: "2px",
              flexBasis: "50%",
              marginTop: "30px",
              marginBottom: "20px",
            }}
          >
            <Card.Header style={{ textAlign: "center", color: "red" }}>
              Pay Using
            </Card.Header>
            <Card.Body>
              <form>
                <input
                  type="radio"
                  name="pay"
                  id="phnpe"
                  value="phonePe"
                  onClick={handleradio}
                />
                <npsp> </npsp>
                <label for="phnpe">
                  <span>
                    <img
                      src={phone} alt="noimg"
                      style={{ width: "20px", marginRight: "20px" }}
                    />
                  </span>
                  Phone pe
                </label>
                <br></br>

                <input
                  type="radio"
                  name="pay"
                  id="googlepay"
                  value="googlepay"
                  onClick={handleradio}
                />
                <npsp> </npsp>
                <label for="googlepay">
                  <span>
                    <img
                    alt="noimg"
                      src={gpay}
                      style={{ width: "20px", marginRight: "20px" }}
                    />
                  </span>{" "}
                  Google pay
                </label>
                <br></br>

                <input type="radio" name="pay" id="upi" value="upi" onClick={handleradio} />
                <npsp> </npsp>
                <label for="upi">
                  <span>
                    <img
                    alt="noimg"
                      src={upi}
                      style={{ width: "30px", marginRight: "20px" }}
                    
                    />
                  </span>
                  UPI
                </label>
                <br></br>

                <input type="radio" name="pay" id="net" value="net" onClick={handleradio}/>
                <npsp> </npsp>
                <label for="net">
                  <span>
                    <img alt="noimg"
                      src={netb}
                      style={{ width: "20px", marginRight: "20px" }}
                     
                    />
                  </span>
                  Net Banking
                </label>
                <br></br>

                <input type="radio" name="pay" id="cod" value="cod" onClick={handleradio}/>
                <npsp> </npsp>
                <label for="cod">
                  <span>
                    <img alt="noimg"
                      src={cod}
                      style={{ width: "20px", marginRight: "20px" }}
                     
                    />
                  </span>
                  Cash on delivery
                </label>
              </form>
            </Card.Body>
          </Card>
          <button
            type="submit"
            style={{ marginLeft: "40px", color: "red" }}
            onClick={handleClickOpen}
          >
            Confirm details
          </button>
          {localStorage.getItem("token") ? (
            <button
              type="submit"
              style={{ marginLeft: "40px", color: "red" }}
              onClick={handlePayment}
            >
              Complete Payment
            </button>
          ) : (
            <button
              type="submit"
              style={{ marginLeft: "130px", color: "red" }}
              onClick={() => {
                alert("Please Login first to complete payment");
                navigate("/");
              }}
            >
              Complete Payment
            </button>
          )}
          {/* handlePayment */}
          <Dialog
            fullScreen
            open={open}
            onClose={handleClosed}
            TransitionComponent={Transition}
          >
            <AppBar
              sx={{
                position: "relative",
                backgroundColor: "aliceblue",
                color: "black",
              }}
            >
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClosed}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  Payment confirmation
                </Typography>
                <Button
                  autoFocus
                  color="inherit"
                  onClick={() => {
                    if (!name || !address || !phn) {
                      alert("Please provide your complete details ");
                    }
                    handleClosed();
                  }}
                >
                  Confirm details
                </Button>
              </Toolbar>
            </AppBar>

            <div className="container mt-5">
              <List>
                <ListItem button>
                  <ListItemText primary="Net amount" secondary={net} />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemText
                    primary="Details"
                    secondary={
                      <card>
                        {" "}
                        <Card.Body>
                          <Card.Text style={{ marginTop: "10px" }}>
                            Name:{name}
                          </Card.Text>
                          <Card.Text>Address:{address}</Card.Text>
                          <Card.Text>Phone number:{phn}</Card.Text>
                        </Card.Body>
                      </card>
                    }
                  />
                </ListItem>
              </List>
            </div>
          </Dialog>
        </div>
      </div>
    </>
  );
}

function Cart() {
  const navigate = useNavigate();

  const location = useLocation();
  const [cartitems, setCartitems] = useContext(userContext);

  //   if(cartitems.length==0 && localStorage.getItem("token")){
  //     alert("Please add items to cart to proceed")
  //     window.location.href="/"
  //     console.log("first")
  //   }
  //   if(cartitems.length==0 && !localStorage.getItem("token")){
  //     alert("You need to login first")
  //     window.location.href="/"
  //     console.log("first")
  //   }

  //   const val1=location.state.val;
  //   const name1=location.state.name
  //   const symbol1=location.state.symbol;
  //   const count1=location.state.count
  //   console.log(val1,name1);
  //   let a={val:val1,name:name1,symbol:symbol1,count:count1}
  // let b=[];
  // b.push(a);

  // console.log(b)

  return (
    <>
      <div>
        <Navbar1 show={false} />

        {/* <h3 style={{color:"red",marginTop:"30px"}}>"GET WHAT YOU EYE"</h3> */}
      </div>

      <div>
        <Media />
      </div>

      <Footer />
    </>
  );
}

export default Cart;
