import React from 'react';
import styled from 'styled-components'

type TypeLabelProps = {
    label: string;
  };
  
  const Label = styled.div`
    font-size: 2em;
`;

const TypeLabel = ({label}: TypeLabelProps) => <Label>{label}</Label>

export default TypeLabel