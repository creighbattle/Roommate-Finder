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
import "firebase/auth";

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { switchToSignup } = useContext(AccountContext);

  const signIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <BoxContainer>
      <FormContainer>
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
      </FormContainer>
      <Marginer direction="vertical" margin={20} />
      <MutedLink>Forget your password?</MutedLink>
      <Marginer direction="vertical" margin={30} />
      <SubmitButton type="submit" onClick={() => signIn()}>
        Sign In
      </SubmitButton>
      <Marginer direction="vertical" margin={20} />
      <MutedLink>
        Don't have an account?{" "}
        <BoldLink onClick={switchToSignup}>Signup</BoldLink>
      </MutedLink>
      {/* <ImageUploader
        withIcon={true}
        buttonText="Choose images"
        onChange={(picture) => console.log(picture)}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      /> */}
    </BoxContainer>
  );
}

export default LoginForm;
