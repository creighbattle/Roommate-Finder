import "./App.css";
import styled from "styled-components";
import AccountBox from "./components/accountBox";
import HomeScreen from "./components/HomeScreen";

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <AppContainer>
      {/* <AccountBox /> */}
      <HomeScreen />
    </AppContainer>
  );
}

export default App;
