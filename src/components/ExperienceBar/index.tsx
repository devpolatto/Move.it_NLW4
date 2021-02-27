import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengeContext'

import { Header } from './styles'

export default function ExperienceBar() {

    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);

    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;

    return(
        <Header>
            <span>0 px</span>

            <div>
                <div style={{ width: `${percentToNextLevel}%` }}/>
                <span className="current-experience" style={{ left: `${percentToNextLevel}%` }}>
                { currentExperience } xp
            </span>
            </div>

            <span>{ experienceToNextLevel } px</span>
        </Header>
    );
}