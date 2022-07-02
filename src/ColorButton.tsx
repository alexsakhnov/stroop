import React, { DOMElement, useState } from 'react';
import styled, {keyframes} from 'styled-components';

const Button = styled.button`
    width: 30%;
    height: 100px;
    border-radius: 30px;
    border: none;
    margin-bottom: 3%;
    position: relative;
    overflow: hidden;
    transition: background 400ms;
`;

const rippleAnimation = keyframes`
to {
    transform: scale(4);
    opacity: 0;
  }
`

const Riplle = styled.span`
    position: absolute; /* The absolute position we mentioned earlier */
    border-radius: 50%;
    transform: scale(0);
    animation: ${rippleAnimation} 600ms ease;
    background-color: rgba(255, 255, 255, 0.7);
`;

type ColorButtonProps = {
    color: string;
    onClick: () => void;
};
  
const ColorButton = ({color, onClick}: ColorButtonProps) => {
    const [ripples, setRipples] = useState<any>([]);
    function clickHandler(event: React.MouseEvent<HTMLButtonElement>): void {
        const button = event.currentTarget;

        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        const ripple = button.querySelector('span');
        if (ripple) {
            ripple.style.height = `${diameter}px`;
            ripple.style.width =  `${diameter}px`;
            ripple.style.left =  `${event.clientX - button.offsetLeft - radius}px`;
            ripple.style.top =  `${event.clientY - button.offsetTop - radius}px`;
            ripple.style.animationName = 'none';
            requestAnimationFrame(() => {setTimeout(() => {ripple.style.animationName = ''}, 0)})
        }
        onClick();
    }
    return <Button className='ColorButton' style={{backgroundColor: color}} onClick={clickHandler}>
        <Riplle style={{animationName: 'none'}}/>
    </Button>
}


export default ColorButton