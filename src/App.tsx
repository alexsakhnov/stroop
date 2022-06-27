import React from 'react';
import ColorLabel from './ColorLabel';
import TypeLabel from './TypeLabel';
import Timer from './Timer';
import Game from './Game';
import styled from 'styled-components';

const StyledApp = styled.div`
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
        <Game endTime={(new Date).getTime() + 45000}/>
    </StyledApp>
  );
}

export default App;
