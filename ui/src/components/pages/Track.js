import React, { useEffect, useRef, useState } from 'react';
import Navbar1 from './Navbar1';
import Footer from './Footer';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import LinearProgress from '@mui/material/LinearProgress';
  import movingMarkerIcon from '../images/food.png'; // Path to your moving marker image

  const Track = () => {
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const [distance, setDistance] = useState(0);
    const [travelTime, setTravelTime] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [show,setShow]=useState(true);

    useEffect(() => {
      const map = L.map('map').setView([17.4326, 78.4546], 17);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      mapRef.current = map;

      const marker = L.marker([17.4326, 78.4546], {
        icon: L.icon({ iconUrl: movingMarkerIcon, iconSize: [32, 32] })
      }).addTo(map);

      markerRef.current = marker;

      const destination = [17.4368, 78.3944];
      const duration = 60000; // Duration in milliseconds-time required to reach the destination  1min=60000ms


        // Calculate and update the distance between starting point and ending point
        const currentDistance = calculateDistance(marker.getLatLng(), destination);
        setDistance(currentDistance);

      
        // const now = Date.now();
        const start = Date.now();


    
      const end = start + duration;

      const moveMarker = () => {
        const now = Date.now();
        const progress = (now - start) / duration;

        if (now >= end) {
          marker.setLatLng(destination);
          clearInterval(moveInterval);
          alert('Destination reached');
          setShow(false);
        } else {
          const lat = interpolate(marker.getLatLng().lat, destination[0], progress);
          const lng = interpolate(marker.getLatLng().lng, destination[1], progress);
          marker.setLatLng([lat, lng]);

          // Calculate and update the travel time
          const elapsedTime = now - start;
          setTravelTime(elapsedTime/1000/60);
          // Calculate and update the time remaining to reach the destination
          const remainingTime = end - now;
          setTimeRemaining(remainingTime/1000/60);
        
           
          
        }
      };

      const interpolate = (start, end, progress) => {
        return start + (end - start) * progress;
      };

      const moveInterval = setInterval(moveMarker, 1000 / 2); // Move the marker 2 times per second

      return () => {
        clearInterval(moveInterval);
        
        map.remove();
      };
    }, []);

    const calculateDistance = (pointA, pointB) => {
      const lat1 = pointA.lat;
      const lon1 = pointA.lng;
      const lat2 = pointB[0];
      const lon2 = pointB[1];

      const R = 6371; // Radius of the Earth in km
      const dLat = deg2rad(lat2 - lat1);
      const dLon = deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      return distance;
    };

    const deg2rad = (deg) => {
      return deg * (Math.PI / 180);
    };

    return (
      <div>
        <Navbar1 />
        
        <div  id="map" style={{ height: '400px',marginLeft:"20px",marginRight:"20px",marginTop:"20px"  }}></div>
        {/* <div>
          Distance: {distance.toFixed(2)} km<br />
          distance travelled: {travelTime.toFixed(2)} minutes<br />
          Time Remaining: {timeRemaining.toFixed(2)} minutes
        
        </div> */}
       {/* {show?<h4 className='duration'>Your order will be delivered in {timeRemaining.toFixed(2)} minutes </h4>:<marquee direction="right"><h4 className='duration'>Order delivered.Click <a href='/'>here</a> to go to home page</h4></marquee>} */}
    
       {show?
       <div class="card" style={{marginLeft:"20px",marginRight:"20px" }}>
        <div class="card-body">
    <h5 class="card-title">ARRIVING IN  </h5>
    <p class="card-text">{timeRemaining.toFixed(2)} minutes</p>
    <LinearProgress color="secondary" />  
  
    <p>Your order is on the way<i class="fa fa-hand-peace-o" aria-hidden="true" style={{color:"red"}}></i></p>
    <p>Track your Tomato valet on the map above</p>
  </div>
</div>
      :<marquee direction="right"><h4 className='duration'>Order delivered.Click <a href='/'>here</a> to go to home page</h4></marquee>}
      </div>
    );
  };

  export default Track;
 

