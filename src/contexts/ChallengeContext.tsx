import { createContext, ReactNode, useContext, useState } from 'react'

import challengesJson from '../../challenges.json';

interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContext {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    activeChallenge: Challenge;
    resetChallenge: () => void;
}

interface challengesProviderProps{
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContext);

export function ChallengesProvider({ children }: challengesProviderProps){

    const [ level, setLevel ] = useState(1);
    const [ currentExperience, setcurrentExperience ] = useState(10);
    const [ challengesCompleted, setChallengesCompleted ] = useState(0)
    const [ activeChallenge, setActiveChallenge ] = useState(null);

    // Calculo de atualização de experiancia do usuario
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp(){
        setLevel(level + 1);
    };

    function startNewChallenge(){
        const ramdomChallengIndex = Math.floor(Math.random() * challengesJson.length);
        const challenge = challengesJson[ramdomChallengIndex];
        // console.log(challenge);
        setActiveChallenge(challenge)
    };

    function resetChallenge(){
        setActiveChallenge(null);
    };

    return(
        <ChallengesContext.Provider value={{
            level, 
            currentExperience,
            experienceToNextLevel,
            challengesCompleted,
            levelUp,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            }}
        >

            { children }

        </ChallengesContext.Provider>
    );
}