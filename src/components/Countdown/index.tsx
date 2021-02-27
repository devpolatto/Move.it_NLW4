import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengeContext'
import { CountdownContext } from '../../contexts/CountdownContext';

import { Container, Stopwatch } from './styles'

export function Countdown(){

    const { minutes, seconds,hasFinished, isActive, startCountdown, resetCountdown } = useContext(CountdownContext);

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    return(
        <>
            <Container>
                <Stopwatch>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </Stopwatch>
                <span>:</span>
                <Stopwatch>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </Stopwatch>
            </Container>

            { hasFinished ? (
                <button disabled className="startCountdownEnd">Ciclo encerrado</button>
            ) : (
                <>
                    { isActive ? (<button type="button" className="startCountdownEnd" onClick={resetCountdown}>
                        Abandonar ciclo
                    </button>) :  <button type="button" className="startCountdownActive" onClick={startCountdown}>
                        Iniciar ciclo
                    </button> }
                </>
            )}

            {/* { isActive ? (<button type="button" className="startCountdownEnd" onClick={resetCountdown}>
                Abandonar ciclo
            </button>) :  <button type="button" className="startCountdownActive" onClick={startCount}>
                Iniciar ciclo
            </button> } */}
        </>
    );
}

