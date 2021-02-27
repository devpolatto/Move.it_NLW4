import { createContext, ReactNode, useContext, useState } from 'react'

import challengesJson from '../../challenges.json';

interface ChallengesContext {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    activeChallenge: Challenge;
    resetChallenge: () => void;
    completChallenge: () => void;
}
interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}
interface challengesProviderProps{
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContext);

export function ChallengesProvider({ children }: challengesProviderProps){

    const [ level, setLevel ] = useState(1);
    const [ currentExperience, setcurrentExperience ] = useState(0);
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

    function completChallenge() {
        if(!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience =currentExperience + amount;

        if(finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setcurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }
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
            completChallenge,
            }}
        >

            { children }

        </ChallengesContext.Provider>
    );
}