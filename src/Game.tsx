import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import ColorLabel from './ColorLabel';
import TypeLabel from './TypeLabel';
import Timer from './Timer';
import ColorButton from './ColorButton';
import { Colors, Color } from './Color';
import styled from 'styled-components';

const StyledScore = styled.div`
    background: #000;
    align-self: center;
    padding: 0.2em 0.8em;
    border-radius: 0.5em;
`;

const StyledGame = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: min(100vh, 500px);
`;

const ButtonRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;

type GameProps = {
    endTime: number;
};

enum QUESTION_TYPE {
    VALUE = 'цвет',
    LABEL = 'значение',
}

type Question = {
    colorType: QUESTION_TYPE;
    value: string;
    label: string;
    answer: string;
};

function generateQuestion(): Question {
    const max = Colors.length;
    const color = Math.floor(Math.random() *max);
    const label = Math.floor(Math.random() *max);
    const colorType = Math.random() > 0.5 ? QUESTION_TYPE.LABEL : QUESTION_TYPE.VALUE;
    return {
        colorType: colorType,
        value: Colors[color].value,
        label: Colors[label].label,
        answer: colorType === QUESTION_TYPE.VALUE ? Colors[color].value : Colors[label].value
    }
}

const Game = ({endTime}: GameProps) => {

    const timeLeft = (value: number) => Math.floor((value - (new Date).getTime()) / 1000);
    const [secondsLeft, setSecondsLeft] = useState(timeLeft(endTime));
    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState(0);
    const [question, setQuestion] = useState(generateQuestion());

    useEffect(() => {
        const interval = setInterval(() => setSecondsLeft(timeLeft(endTime)), 500);

        return () => clearInterval(interval);
    }, [endTime]);

    if (secondsLeft < 0) {
        return <>
        <div>Game Over</div>
        <div>Твой результат {maxScore}</div>
        </>
    }

  return (
    <StyledGame>
        <StyledScore>Score: {score} / {maxScore}</StyledScore>
        <Timer secondsLeft={secondsLeft}/>

        <div>
        {question 
            ? <>
                <TypeLabel label={question.colorType}/>
                <ColorLabel color={question.value} label={question.label}/>
                </> 
            : null}
        </div>
         <ButtonRow>
            {Colors.map((color: Color) => <ColorButton color={color.value} 
            onClick={() => {
                console.log('click', color, question.answer);
                if (question.answer === color.value) {
                    setScore(score + 1);
                    setMaxScore(Math.max(maxScore, score + 1));
                } else {
                    setScore(0);
                    window.navigator.vibrate(200);
                }
                
                setQuestion(generateQuestion());
            }}/>)}
        </ButtonRow>
    </StyledGame>
  );
}

export default Game;
