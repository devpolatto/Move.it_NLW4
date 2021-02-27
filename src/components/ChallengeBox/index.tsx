import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengeContext';

import { Container, ChallengeNotActive, ChallengetActive } from './styles';

export function ChallengeBox(){

    const { activeChallenge, resetChallenge } = useContext(ChallengesContext)

    // const hasActivechallenge = true;

    return(
        <Container>
            { activeChallenge ? (
                <ChallengetActive>
                    <header>Ganhe { activeChallenge.amount } xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
                        <strong>Novo desafio</strong>
                        <p>{ activeChallenge.description }</p>
                    </main>

                    <footer>
                        <button type="button" className="succeededButton">Completei</button>
                        <button type="button" className="failedButton" onClick={resetChallenge}>Falhei</button>
                    </footer>
                </ChallengetActive>
            ) : (
                <ChallengeNotActive isActive={false}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up"/>
                        Avance de nivel completando os desafios
                    </p>
                </ChallengeNotActive>
            )}
        </Container>
    )
}