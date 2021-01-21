import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoginForm from "./loginForm";
import SignupForm from "./signupForm";
import { motion, useSpring } from "framer-motion";
import { AccountContext } from "./accountContext";
import firebase from "firebase/app";
import "firebase/auth";
import Cookies from "js-cookie";

const BoxContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: black;
  overflow: hidden;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 32vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const BackDrop = styled(motion.div)`
  position: absolute;
  top: -38vh;
  left: -55vw;
  background-color: rgb(49, 206, 155);
  width: 170vw;
  height: 70vh;
  border-radius: 50%;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10vh;
  margin-left: 30px;
`;

const HeaderText = styled.h2`
  font-size: 35px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
`;

const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 13px;
  z-index: 10;
  margin-top: 10px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10vh 1.8em;
`;

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1500px",
    borderRadius: "20%",
  },
  collapsed: {
    width: "170vw",
    height: "70vh",
    borderRadius: "50%",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};

function AccountBox({ history }) {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   asyncCall();
  // }, []);

  // const isUserSignIn = async () => {
  //   //if (firebase.auth().currentUser) {
  //   // history.push("/home");
  //   // }

  //   const user = await firebase.auth().currentUser;
  //   console.log(user);
  //   if (user) {
  //     console.log("hello");
  //   }
  // };

  // firebase.auth().onAuthStateChanged((userFirebase) => {
  //   if (userFirebase) {
  //     history.push("/home");
  //   } else {
  //     console.log("no user signed in");
  //   }
  // });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userFirebase) => {
      if (userFirebase) {
        console.log(userFirebase.uid);
        Cookies.set("uid", userFirebase.uid);
        history.push("/home");
      } else {
        console.log("no user signed in");
      }
    });
  }, []);

  const playExpandingAnimation = () => {
    setExpanded(true);
    console.log(history);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1900);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };

  const contextValue = { switchToSignup, switchToSignin };

  return (
    <AccountContext.Provider value={contextValue}>
      <BoxContainer>
        <TopContainer>
          <BackDrop
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={backdropVariants}
            transition={expandingTransition}
          />
          {active === "signin" && (
            <HeaderContainer>
              <HeaderText>Welcome</HeaderText>
              <HeaderText>Back</HeaderText>
              <SmallText>Please sign-in to continue!</SmallText>
            </HeaderContainer>
          )}
          {active === "signup" && (
            <HeaderContainer>
              <HeaderText>Create</HeaderText>
              <HeaderText>Account</HeaderText>
              <SmallText>Please sign-up to continue!</SmallText>
            </HeaderContainer>
          )}
        </TopContainer>
        <InnerContainer>
          {active === "signin" && <LoginForm history={history} />}
          {active === "signup" && <SignupForm />}
        </InnerContainer>
      </BoxContainer>
    </AccountContext.Provider>
  );
}

export default AccountBox;
