import React from "react";
import styled from "styled-components";
import { colors } from "../../colors";

const EventListViewerContainer = styled.div`
  width: 100%;
  height: 47vh;
  background: white;
  border-radius: 5%;
`;

const EventListViewerTop = styled.div`
  width: 100%;
  height: 5vh;
  background: blue;
  margin-top: 2vh;
`;

const Image = styled.img`
  height: 300px;
  width: 100%;
`;

function EventListViewer(props) {
  return (
    <EventListViewerContainer>
      <EventListViewerTop></EventListViewerTop>
      <Image src="https://scontent-lga3-1.xx.fbcdn.net/v/t31.0-8/14543935_1216220411782028_1462108663640264075_o.jpg?_nc_cat=105&ccb=2&_nc_sid=09cbfe&_nc_ohc=gsXczTYUzOwAX82kpcN&_nc_ht=scontent-lga3-1.xx&oh=d621496e3580f667053508c657d8e914&oe=601CF039" />
    </EventListViewerContainer>
  );
}

export default EventListViewer;
