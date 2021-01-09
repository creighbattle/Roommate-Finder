import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Title from "./Title";
import { colors } from "../../colors";
import EventListViewer from "./EventListViewer";

import Carousel from "react-native-snap-carousel";

import "./index.css";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: ${colors.primaryColor};
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5vh 8vw 0 8vw;
`;

function HomeScreen(props) {
  return (
    <Container>
      <Navbar />
      <InnerContainer>
        <Title />
      </InnerContainer>
    </Container>
  );
}

export default HomeScreen;
