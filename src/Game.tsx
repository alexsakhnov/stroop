import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import ColorLabel from './ColorLabel';
import TypeLabel from './TypeLabel';
import Timer from './Timer';
import ColorButton from './ColorButton';
import { Colors, Color } from './Color';
import styled from 'styled-components';
import confetti from 'canvas-confetti';

const RetryButton = styled.button`
    margin: 0 auto 20px;
    padding: 1em;
    width: 50%;
`

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
    min-height: 100vh;
    padding: 40px 20px;
    box-sizing: border-box;
`;

const ButtonRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin: 50px 20px;
`;

type GameProps = {
    duration: number;
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

const Game = ({duration}: GameProps) => {
    const loadBestScore = (): number => {
        const value = localStorage.getItem('bestScore');
        return parseInt(value || '0');
    };
    const saveBestScore = (value: number) => localStorage.setItem('bestScore', value.toString());

    const timeLeft = (value: number) => Math.floor((value - (new Date).getTime()) / 1000);
    const [bestScore, setBestScore] = useState(loadBestScore());
    const [gameOn, setGameOn] = useState(true);
    const [endTime, setEndTime] = useState((new Date).getTime() + duration * 1000);
    const [secondsLeft, setSecondsLeft] = useState(timeLeft(endTime));
    const [serie, setSerie] = useState(0);
    const [score, setScore] = useState(0);
    const [maxSerie, setMaxSerie] = useState(0);
    const [question, setQuestion] = useState(generateQuestion());

    useEffect(() => {
        if (gameOn) {
            setSecondsLeft(timeLeft(endTime));
            const interval = setInterval(() => {
            let secondsLeft = timeLeft(endTime);
            setSecondsLeft(secondsLeft);
            if (secondsLeft <= 0) {
                setGameOn(false);
            }
        }, 500);

        return () => clearInterval(interval);
        } else {
            if (score >= bestScore) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                  });
                saveBestScore(score);
                setBestScore(score);
            }
        }
        
    }, [gameOn]);

    if (!gameOn) {
        return <StyledGame>
            <div>
        <RetryButton onClick={() => {
            setEndTime((new Date).getTime() + duration * 1000);
            setSerie(0);
            setMaxSerie(0);
            setScore(0);
            setGameOn(true);
        }}>Ещё раз</RetryButton>
        <div>Game Over</div>
        <div>Твой результат {score}</div>
        <div>Максимальная серия {maxSerie}</div>
        <div>Лучший результат {bestScore}</div>
        </div>
        </StyledGame>
    }

  return (
    <StyledGame>
        <StyledScore>Score: {score}</StyledScore>
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
            {Colors.map((color: Color, index) => <ColorButton key={index} color={color.value} 
            onClick={() => {
                console.log('click', color, question.answer);
                if (question.answer === color.value) {
                    setSerie(serie + 1)
                    setScore(score + (serie + 1) * 60);
                    setMaxSerie(Math.max(maxSerie, serie + 1));
                } else {
                    setSerie(0);
                    window.navigator.vibrate(200);
                }
                
                setQuestion(generateQuestion());
            }}/>)}
        </ButtonRow>
    </StyledGame>
  );
}

export default Game;
