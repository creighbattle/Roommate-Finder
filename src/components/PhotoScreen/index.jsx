import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import FormData from "form-data";
import { colors } from "../../colors";
import Modal from "react-modal";
import { useSwipeable } from "react-swipeable";
import { PlusCircleFilled } from "@ant-design/icons";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import firebase from "firebase/app";
import "firebase/firestore";

const Container = styled.div`
  display: "flex";
  width: 100%;
  height: 100vh;
  background: ${colors.primaryColor};
  justify-content: "center";
  align-items: "center";
`;

const Image = styled(motion.img)`
  display: "flex";
  height: 15%;
  width: 31%;
  object-fit: cover;
  margin: 1vw;
`;

const NavbarContainer = styled.div`
  width: 100%;
  height: 7.5vh;
  background: ${colors.accentColor};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NavbarElement = styled.h4`
  color: ${colors.primaryColor};
  margin: 0 10px;
`;

const Input = styled.input`
  display: none;
`;

const list = {
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 10,
      duration: 3,
    },
  },
  hidden: {
    opacity: 0,
    x: 100,
    y: 500,
    // transition: {
    //   when: "afterChildren",
    //   delay: 3,
    // },
  },
};

function PhotoScreen(props) {
  // const [baseImage, setBaseImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [photo, setPhoto] = useState("");
  const [index, setIndex] = useState(0);
  const [firebasePhotos, setFirebasePhotos] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (photos[index]) {
      setPhoto(photos[index].src);
    }

    const eventID = Cookies.get("eventID");
    console.log(`Event: ${eventID}`);
  }, [index]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (photos[index + 1]) {
        setIndex(index + 1);
        console.log("swiped");
      }
    },
    onSwipedRight: () => {
      if (index !== 0) {
        setIndex(index - 1);
        console.log("swiped");
      }
    },
    onSwipedDown: () => setIsOpen(false),
  });
  const myRef = React.useRef();
  const refPassthrough = (el) => {
    // call useSwipeable ref prop with el
    handlers.ref(el);

    // set myRef el so you can access it yourself
    myRef.current = el;
  };

  const choosePhotos = () => {
    document.getElementById("files").click();
  };

  // const photos = [
  //   {
  //     src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
  //   },
  //   {
  //     src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
  //   },
  //   {
  //     src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
  //   },
  //   {
  //     src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
  //   },
  //   {
  //     src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
  //   },
  //   {
  //     src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
  //   },
  //   {
  //     src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
  //   },
  //   {
  //     src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
  //   },
  //   {
  //     src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
  //   },
  //   {
  //     src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
  //   },
  //   {
  //     src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
  //   },
  //   {
  //     src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
  //   },
  //   {
  //     src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
  //   },
  //   {
  //     src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
  //   },
  //   {
  //     src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
  //   },
  //   {
  //     src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
  //   },
  //   {
  //     src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
  //   },
  //   {
  //     src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
  //   },
  //   {
  //     src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
  //   },
  //   {
  //     src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
  //   },
  //   {
  //     src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
  //   },
  // ];

  const uploadImage = async (e) => {
    //console.log(e.target.files.length);
    const eventID = Cookies.get("eventID");
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
          //console.log(resolve.data.data.url);
          // setFirebasePhotos((oldArray) => [
          //   ...oldArray,
          //   {
          //     photo: resolve.data.data.url,
          //     likes: 0,
          //     comments: [],
          //   },
          // ]);
          const db = firebase.firestore().collection("events").doc(eventID);
          db.update({
            photos: firebase.firestore.FieldValue.arrayUnion({
              photoUrl: resolve.data.data.url,
              likes: 0,
              comments: [],
            }),
          })
            .then(() => {
              console.log("success");
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          //console.log(e.response.data);
          alert("error");
        });
    }
  };

  const openPhoto = (photo, index) => {
    setPhoto(photo);
    setIsOpen(true);
    setIndex(index);
    console.log(index);
  };

  const postPhoto = () => {
    for (let i = 0; i < firebasePhotos.length; i++) {
      console.log(firebasePhotos[i]);
    }
  };

  const grabPhotos = () => {
    const eventID = Cookies.get("eventID");
    const db = firebase.firestore().collection("events").doc(eventID);

    db.get().then((doc) => {
      let photos = doc.data().photos;
      //console.log(photos.data().photos);
      for (let i = 0; i < photos.length; i++) {
        console.log(photos[i].photoUrl);
        setPhotos((oldArray) => [
          ...oldArray,
          {
            src: photos[i].photoUrl,
          },
        ]);
      }
    });
  };

  return (
    <Container>
      <NavbarContainer>
        <NavbarElement onClick={() => postPhoto()}>Save</NavbarElement>
        <NavbarElement onClick={() => grabPhotos()}>Logo</NavbarElement>
        <NavbarElement>Settings</NavbarElement>
      </NavbarContainer>

      <Modal
        isOpen={isOpen}
        ariaHideApp={false}
        style={{
          content: {
            display: "flex",
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            padding: "0px",
            margin: "0px",
            // transform: "translate(-50%, -50%)",

            border: "none",
            background: "black",
            overflow: "auto",
            borderRadius: "0px",
            outline: "none",

            // padding: "20px",
          },
          overlay: {
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
        }}
      >
        <img
          {...handlers}
          ref={refPassthrough}
          src={photo}
          style={{
            width: "100%",
            height: "auto",
            //alignSelf: "center",
            padding: "0px",
            objectFit: "contain",
          }}
        />
      </Modal>

      {photos.map((person, index) => (
        <Image
          // initial={{ scale: 0 }}
          // animate={{ rotate: 360, scale: 1 }}
          // transition={{
          //   type: "spring",
          //   stiffness: 280,
          //   damping: 20,
          // }}
          // variants={list}
          initial="hidden"
          animate="visible"
          variants={list}
          src={person.src}
          onClick={() => openPhoto(person.src, index)}
          key={index}
        />
      ))}

      {/* <input
        multiple={true}
        type="file"
        id="files"
        name="files"
        onChange={(e) => uploadImage(e)}
      />
      <br /> */}

      <PlusCircleFilled
        style={{
          color: colors.accentColor,
          position: "fixed",
          fontSize: "50px",
          bottom: "5vh",
          right: "10vw",
        }}
        onClick={() => choosePhotos()}
      ></PlusCircleFilled>

      <Input
        multiple={true}
        type="file"
        id="files"
        name="files"
        onChange={(e) => uploadImage(e)}
      />
    </Container>
  );
}

export default PhotoScreen;
