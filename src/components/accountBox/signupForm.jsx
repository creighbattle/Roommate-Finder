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

function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Full Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={20} />
      <Marginer direction="vertical" margin={30} />
      <SubmitButton type="submit">Sign Up</SubmitButton>
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
