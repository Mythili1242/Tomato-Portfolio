import React from 'react';
import './Scooter.css';
import scooter from "../images/scooter.png"
import delivery from "../images/delivery-guy.png"
function Scooter() {
  return (
    <div className="scooter-container">
      {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShqNrt-Pyd_gr4FGWdHQ1NJWdmE158KoS3Jw&usqp=CAU" alt="Scooter" className="scooter-image" /> */}
      <img src={delivery} alt="Scooter" className="scooter-image" />
      <div className="hurry-up">Hurry Up!</div>
    </div>
  );
}

export default Scooter;
