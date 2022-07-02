import React from 'react';
import ColorLabel from './ColorLabel';
import TypeLabel from './TypeLabel';
import Timer from './Timer';
import Game from './Game';
import styled, {createGlobalStyle} from 'styled-components';

const FontStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
`;

const StyledApp = styled.div`
  font-family: 'Montserrat', sans-serif;

  max-width: 500px;
  text-align: center;
  margin: auto;

  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

function App() {
  return (
    <StyledApp className="App">
        <FontStyles/>
        <Game duration={45}/>
    </StyledApp>
  );
}

export default App;
