import React from "react";
import "./Card.css"; // Import custom CSS

const Card = ({ icon, title, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-icon">{icon}</div>
      <h3 className="card-title">{title}</h3>
    </div>
  );
};

export default Card;
