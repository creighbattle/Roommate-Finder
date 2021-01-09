import React from "react";
import styled from "styled-components";
import { colors } from "../../colors";

const TitleDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TitleElementName = styled.h2`
  color: ${colors.defaultTextColor};
  font-weight: 500;
`;

const TitleElementSearch = styled.h2`
  color: ${colors.defaultTextColor};
  font-weight: 500;
`;

function Title(props) {
  return (
    <TitleDiv>
      <TitleElementName>Events</TitleElementName>
      <TitleElementSearch>Search</TitleElementSearch>
    </TitleDiv>
  );
}

export default Title;
