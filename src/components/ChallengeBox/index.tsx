import { Container, ChallengeNotActive, ChallengetActive } from './styles'

export function ChallengeBox(){

    const hasActivechallenge = true;

    return(
        <Container>
            { hasActivechallenge ? (
                <ChallengetActive>
                    <header>Ganhe 400 xp</header>

                    <main>
                        <img src="icons/body.svg" alt=""/>
                        <strong>Novo desafio</strong>
                        <p>Levante e faça uma caminhada de 3 minutos.</p>
                    </main>

                    <footer>
                        <button type="button" className="succeededButton">Completei</button>
                        <button type="button" className="failedButton">Falhei</button>
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