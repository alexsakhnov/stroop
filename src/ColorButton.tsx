import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    width: 30%;
    height: 100px;
    border: none;
    margin-bottom: 3%;
`;

type ColorButtonProps = {
    color: string;
    onClick: () => void;
};
  
const ColorButton = ({color, onClick}: ColorButtonProps) => <Button className='ColorButton' style={{backgroundColor: color}} onClick={() => onClick()}></Button>

export default ColorButton