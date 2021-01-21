import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Title from "./Title";
import { colors } from "../../colors";
import { PlusCircleFilled } from "@ant-design/icons";
import EventObject from "./Event";
import Modal from "react-modal";
import { Input, SubmitButton } from "../accountBox/common";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import Cookies from "js-cookie";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: ${colors.primaryColor};
  margin-top: 10vh;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5vh 8vw 0 4vw;
  /* background-color: pink; */
`;

const EventContainer = styled.div`
  width: 100%;
  height: 50vh;
  background-color: pink;
  overflow: scroll;
  overflow-y: hidden;
  margin-top: 20px;
`;

const EventInnerContainer = styled.div`
  width: 10000px;
  height: 100%;
  background-color: black;
  display: flex;
  flex-direction: row;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 50vh;
  background-color: white;
`;

const choosePhotos = () => {
  document.getElementById("files").click();
};

const uploadImage = async (e) => {
  console.log(e.target.files.length);
  for (let i = 0; i < e.target.files.length; i++) {
    let bodyData = new FormData();
    bodyData.append("image", e.target.files[i]);
    axios({
      method: "POST",
      url:
        "https://api.imgbb.com/1/upload?expiration=600&key=58fb0dd81671ee6994abc3a7f203d317",
      data: bodyData,
    })
      .then((resolve) => {
        console.log(resolve.data);
      })
      .catch((e) => {
        console.log(e.response.data);
        alert("error");
      });
  }
};

// const customStyles = {
//   content: {
//     display: "flex",
//     position: "fixed",
//     top: "0",
//     left: "0",
//     right: "0",
//     bottom: "0",
//     padding: "0px",
//     // transform: "translate(-50%, -50%)",

//     border: "none",
//     background: "black",
//     overflow: "auto",
//     borderRadius: "4px",
//     outline: "none",
//     opacity: "10%",
//     // padding: "20px",
//   },
// };

const EventModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.accentColor};
  width: 100%;
  height: 100%;
  border-radius: 5%;
`;

const EventNameContainer = styled.div`
  width: 90%;
  margin: 10px;
  border-radius: 10%;
`;

const InputPhoto = styled.input`
  display: none;
`;

let userUID = "";
let alreadyRan = false;

function HomeScreen({ history }) {
  const [isOpen, setIsOpen] = useState(false);
  const [eventPhoto, setEventPhoto] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [firebaseEvents, setFirebaseEvents] = useState([]);
  const [ranOnce, setRanOnce] = useState(false);
  const [displayEvents, setDisplayEvents] = useState(null);
  const [allFirebaseEvents, setAllFirebaseEvents] = useState([]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    //console.log(Cookies.get("uid"));

    if (!isMounted) {
      console.log("nope");
      setIsMounted(true);
    } else {
      console.log("yup");
      test();
    }

    if (Cookies.get("uid") !== undefined) {
      userUID = Cookies.get("uid");
      console.log("hi");

      // if (true === true) {
      //   alreadyRan = true;
      //   const db = firebase.firestore();
      //   db.collection("users")
      //     .doc(userUID)
      //     .onSnapshot((doc) => {
      //       //console.log(doc.data().events);
      //       if (doc.data().events) {
      //         setDisplayEvents(doc.data().events);
      //         console.log("yes");
      //       } else {
      //         setDisplayEvents(null);
      //         console.log("no");
      //       }
      //     });
      // }
      // if (displayEvents !== null) {
      //   updateRanFunction();
      // }
    } else {
      history.push("/");
    }
  }, [isMounted]);

  const test = () => {
    const db = firebase.firestore();
    db.collection("users")
      .doc(userUID)
      .get()
      .then((doc) => {
        if (doc.data().events) {
          console.log("running");
          setDisplayEvents(doc.data().events);
          console.log(doc.data().events);
          showEvents(doc.data().events);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const showEvents = (events) => {
    const db = firebase.firestore().collection("events");

    for (let i = 0; i < events.length; i++) {
      console.log(events[i]);
      db.doc(events[i])
        .get()
        .then((doc) => {
          console.log(doc.data());
          setAllFirebaseEvents((oldArray) => [
            ...oldArray,
            {
              EventName: doc.data().EventName,
              CoverPhoto: doc.data().CoverPhoto,
              EventDescription: doc.data().EventDescription,
              EventID: events[i],
            },
          ]);
        });
    }
  };

  const updateRanFunction = (events) => {
    const db = firebase.firestore();
    for (let i = 0; i < events.length; i++) {
      db.collection("events")
        .doc(events[i])
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log(doc.data().EventName);
            setAllFirebaseEvents((oldArray) => [
              ...oldArray,
              {
                EventName: doc.data().EventName,
                CoverPhoto: doc.data().CoverPhoto,
                EventDescription: doc.data().EventDescription,
                EventID: displayEvents[i],
              },
            ]);
          } else {
            console.log("no doc");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
    console.log("running");
  };

  const uploadFirestore = (image) => {
    const num = uuidv4();

    const db = firebase.firestore();

    db.collection("events")
      .doc(num)
      .set({
        EventName: eventName,
        EventDescription: eventDescription,
        CoverPhoto: image,
        People: "Creigh Battle",
        photos: [],
      })
      .then(() => {
        console.log("success");
        setPhotoURL("");
      })
      .catch((e) => {
        console.log(e);
      });

    addToUserEvents(num);
  };

  const addToUserEvents = (uuid) => {
    const db = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);

    db.update({
      events: firebase.firestore.FieldValue.arrayUnion(uuid),
    });
  };

  const uploadImage1 = async (e) => {
    setEventPhoto(e.target.files[0]);
  };

  const submit = () => {
    setIsOpen(false);
    let bodyData = new FormData();
    bodyData.append("image", eventPhoto);

    axios({
      method: "POST",
      url:
        "https://api.imgbb.com/1/upload?expiration=6000&key=58fb0dd81671ee6994abc3a7f203d317",
      data: bodyData,
    })
      .then((resolve) => {
        setPhotoURL(resolve.data.data.url);
        uploadFirestore(resolve.data.data.url);
      })
      .catch((e) => {
        console.log(e.response.data);
        alert("error");
      });
  };

  return (
    <Container>
      <Navbar history={history} />
      <InnerContainer>
        <Title />
      </InnerContainer>
      <EventContainer>
        <EventInnerContainer>
          {/* <EventObject /> */}
          {allFirebaseEvents.map((data, index) => (
            <EventObject
              key={index}
              EventName={data.EventName}
              CoverPhoto={data.CoverPhoto}
              EventDescription={data.EventDescription}
              EventID={data.EventID}
              History={history}
            />
          ))}
        </EventInnerContainer>
      </EventContainer>
      <PlusCircleFilled
        style={{
          color: colors.accentColor,
          position: "fixed",
          fontSize: "50px",
          bottom: "5vh",
          right: "10vw",
        }}
        onClick={() => setIsOpen(true)}
      ></PlusCircleFilled>

      <Modal
        isOpen={isOpen}
        ariaHideApp={false}
        style={{
          content: {
            backgroundColor: "yellow",
            height: "50%",
            margin: "auto",
            padding: 0,
            display: "flex",
            justifyContent: "center",
            borderRadius: "5%",
            border: "none",
          },
        }}
      >
        <EventModalContainer>
          <EventNameContainer>
            <Input
              placeholder="Event Name"
              onChange={(text) => setEventName(text.target.value)}
            />
          </EventNameContainer>
          <EventNameContainer>
            <Input
              placeholder="Event Description"
              onChange={(text) => setEventDescription(text.target.value)}
            />
          </EventNameContainer>
          <PlusCircleFilled
            style={{
              color: colors.primaryColor,
            }}
            onClick={() => choosePhotos()}
          ></PlusCircleFilled>
          <SubmitButton onClick={() => submit()}>Submit</SubmitButton>
        </EventModalContainer>

        <InputPhoto
          multiple={false}
          type="file"
          id="files"
          name="files"
          onChange={(e) => uploadImage1(e)}
        />
      </Modal>
    </Container>
  );
}

export default HomeScreen;
