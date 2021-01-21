import React from "react";
import styled from "styled-components";
import Cookies from "js-cookie";

const EventObject = styled.div`
  height: 100%;
  width: 90vw;
  background-color: white;
  border-radius: 10%;
  margin-left: 4vw;
`;

const Title = styled.h4`
  margin: 20px;
  color: gray;
  font-weight: 500;
`;

const DescriptionContainer = styled.div`
  width: 70%;
  height: 20%;
  margin-left: 20px;
`;

const Description = styled.h3`
  font-size: 22px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 48%;
  background-color: pink;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Footer = styled.div`
  width: 100%;
  height: 70px;
`;

function Event({ EventName, CoverPhoto, EventDescription, EventID, History }) {
  const goToPhotos = (event) => {
    Cookies.set("eventID", event);
    console.log(`In event ${event}`);
    History.push("/photos");
  };
  return (
    <EventObject onClick={() => goToPhotos(EventID)}>
      <Title>{EventName}</Title>
      <DescriptionContainer>
        <Description>{EventDescription}</Description>
      </DescriptionContainer>
      <ImageContainer>
        <Image src={CoverPhoto} />
      </ImageContainer>
      <Footer></Footer>
    </EventObject>
  );
}

export default Event;
