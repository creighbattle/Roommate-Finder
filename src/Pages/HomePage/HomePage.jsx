import React from "react";
import "./HomePage.css";
import Navbar from "../../Components/Navbar/Navbar";

function HomePage(props) {
  const signUp = () => {
    alert("hi");
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="welcome-text-div">
          <h3 className="welcome-text">Looking for a roomate?</h3>
        </div>
        <div className="buttons-div">
          <button className="button">Learn more</button>
          <button className="button" onClick={() => signUp()}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
