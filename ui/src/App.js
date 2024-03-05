import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/pages/Home';
import Menu from './components/pages/Menu';
import Admin from './components/pages/Admin';
import Admin1 from './components/pages/Admin1';
import Cart from './components/pages/Cart';
import Cart1 from './components/pages/Cart1';
import Login from "./components/pages/Login";
import SignUp from './components/pages/SignUp';
import Track from './components/pages/Track';
import MyOrders from './components/pages/MyOrders';



import { useState } from 'react';


import { createContext, useEffect } from "react";
import createPersistedState from 'use-persisted-state';

export const userContext=createContext();
function App() {

  // const useCounterState = createPersistedState('cartitems');         
// const [cartitems,setCartitems]=useCounterState([]);
const [cartitems,setCartitems]=useState([]);
useEffect(()=>{
  async function refresh(){
    
await fetch("http://localhost:8000/rest/refresh",{
  method:"POST",
  credentials:"include",
  headers:{
    "content-type":"application/JSON"
  }
})
.then(res=>res.json())
.then(a=>{if(a.accesstoken){localStorage.setItem("token",JSON.stringify(a))}})

  }
  refresh()
})

  return (
    <>
   <div>
   <userContext.Provider value={[cartitems,setCartitems]} >
    <Router>
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/menu/:name' element={<Menu />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin1' element={<Admin1 />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/cart1' element={<Cart1 />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/track' element={<Track />} />
        <Route path='/MyOrders' element={<MyOrders />} />
      </Routes>
    </Router>
    </userContext.Provider>
   </div>
    </>
  );
}

export default App;


