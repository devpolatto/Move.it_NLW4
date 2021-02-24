import { Header } from './styles'

export default function ExperienceBar() {
    return(
        <Header>
            <span>0 px</span>

            <div>
                <div style={{ width: '50%' }}/>
            </div>

            <span className="current-experience" style={{ left: '50%' }}>
                300 xp
            </span>

            <span>600 px</span>
        </Header>
    );
}