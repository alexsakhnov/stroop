import React from 'react';
import styled from 'styled-components'

type TimerProps = {
    secondsLeft: number;
};

const Label = styled.div`
    font-size: 2em;
`;
  
const Timer = ({secondsLeft}: TimerProps) => {
    return <Label>{secondsLeft}</Label>
}

export default Timer