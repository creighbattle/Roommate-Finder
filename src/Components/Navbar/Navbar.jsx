import React from "react";
import "./Navbar.css";

function Navbar(props) {
  return (
    <div className="nav-container">
      <div className="nav-element">
        <p>Icon</p>
      </div>
      <div className="nav-element">
        <p>Logo</p>
      </div>
      <div className="nav-element">
        <p>Sign In</p>
      </div>
    </div>
  );
}

export default Navbar;
