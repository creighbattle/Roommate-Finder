import React from "react";
import styled from "styled-components";
import { colors } from "../../colors";

const NavbarContainer = styled.div`
  width: 100%;
  height: 7.5vh;
  background: ${colors.primaryColor};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NavbarElement = styled.h4`
  color: ${colors.accentColor};
  margin: 0 10px;
`;

function Navbar(props) {
  return (
    <NavbarContainer>
      <NavbarElement>Search</NavbarElement>
      <NavbarElement>Sailor</NavbarElement>
      <NavbarElement>Settings</NavbarElement>
    </NavbarContainer>
  );
}

export default Navbar;
