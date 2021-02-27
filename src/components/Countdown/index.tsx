import { ChallengesContext } from '../../contexts/ChallengeContext'

import { useState, useEffect, useContext } from 'react';
import { Container, Stopwatch } from './styles'

let countdownTimeout: NodeJS.Timeout;

export function Countdown(){

    const { startNewChallenge } =useContext(ChallengesContext)

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);

    const [ hasFinished, setHasFinished ] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCount() {
        setIsActive(true)
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.1*60);
    }

    useEffect(() => {
        if(isActive && time > 0){
            countdownTimeout = setTimeout(() => { setTime(time - 1);}, 1000)
        } else if( isActive && time === 0 ){
            setHasFinished(true)
            setIsActive(false)
            setTime(0.1*60)
            startNewChallenge();
        }
    }, [isActive, time])

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
                    </button>) :  <button type="button" className="startCountdownActive" onClick={startCount}>
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

