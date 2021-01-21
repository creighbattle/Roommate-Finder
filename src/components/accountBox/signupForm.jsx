import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import firebase from "firebase/app";
import "firebase/firestore";

function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const signUp = () => {
    console.log(`${fullName} ${email} ${password} ${verifyPassword}`);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // addUser(user);
        addUser(user);
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  const addUser = (user) => {
    const userRef = firebase.firestore().collection("users").doc(user.user.uid);
    userRef.set({
      name: fullName,
      events: [],
    });
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input
          type="text"
          placeholder="Full Name"
          onChange={(text) => setFullName(text.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          onChange={(text) => setEmail(text.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(text) => setPassword(text.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          onChange={(text) => setVerifyPassword(text.target.value)}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={20} />
      <Marginer direction="vertical" margin={30} />
      <SubmitButton type="submit" onClick={signUp}>
        Sign Up
      </SubmitButton>
      <Marginer direction="vertical" margin={20} />
      <MutedLink href="#">
        Already have an account?{" "}
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}

export default SignupForm;
