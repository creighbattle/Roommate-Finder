import React, { useContext } from "react";
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

import ImageUploader from "react-images-upload";

function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={20} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin={30} />
      <SubmitButton type="submit">Sign In</SubmitButton>
      <Marginer direction="vertical" margin={20} />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
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
