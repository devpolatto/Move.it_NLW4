import { Container, ChallengeNotActive } from './styles'

export function ChallengeBox(){
    return(
        <Container>
            <ChallengeNotActive isActive={false}>
                <strong>Finalize um ciclo para receber um desafio</strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level Up"/>
                    Avance de nivel completando os desafios
                </p>
            </ChallengeNotActive>
        </Container>
    )
}