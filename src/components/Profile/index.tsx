import { Container } from './styles'

export function Profile(){
    return(
        <Container>
            <img src="https://avatars.githubusercontent.com/u/51465694?s=460&u=ac81de69d4d73a4e4b85a8f69741b26d8fe0ddcc&v=4" alt=""/>
            <div>
                <strong>Angelo Polatto</strong>
                <p>
                    <img src="icons/level.svg" alt=""/>
                    Level 1
                </p>
            </div>
        </Container>
    );
}