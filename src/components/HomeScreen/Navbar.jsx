import React from "react";
import styled from "styled-components";
import { colors } from "../../colors";
import firebase from "firebase/app";
import "firebase/firestore";
import Cookies from "js-cookie";

const NavbarContainer = styled.div`
  width: 100%;
  height: 7.5vh;
  background: ${colors.accentColor};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
`;

const NavbarElement = styled.h4`
  color: ${colors.primaryColor};
  margin: 0 10px;
`;

function Navbar(props) {
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("signed out");
        props.history.push("/");
        Cookies.remove("uid");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <NavbarContainer>
      <NavbarElement>Search</NavbarElement>
      <NavbarElement>Sailor</NavbarElement>
      <NavbarElement onClick={() => signOut()}>Settings</NavbarElement>
    </NavbarContainer>
  );
}

export default Navbar;
