import React from 'react';
import styled from 'styled-components'

type ColorLabelProps = {
    color: string;
    label: string;
};

const Label = styled.div`
    font-size: 2.8em;
`;
  
const ColorLabel = ({color, label}: ColorLabelProps) => <Label style={{color: color}}>{label}</Label>

export default ColorLabel