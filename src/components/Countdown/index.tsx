import { Container, Stopwatch } from './styles'

export function Countdown(){
    return(
        <Container>
            <Stopwatch>
                <span>2</span>
                <span>5</span>
            </Stopwatch>
            <span>:</span>
            <Stopwatch>
                <span>0</span>
                <span>0</span>
            </Stopwatch>
        </Container>
    );
}