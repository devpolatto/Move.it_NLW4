import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react'

import Cookies from 'js-cookie';

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
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContext);

export function ChallengesProvider({ children, ...rest }: challengesProviderProps){

    const [ level, setLevel ] = useState(rest.level ?? 1);
    const [ currentExperience, setcurrentExperience ] = useState(rest.currentExperience ?? 0);
    const [ challengesCompleted, setChallengesCompleted ] = useState(rest.challengesCompleted ?? 0)

    const [ activeChallenge, setActiveChallenge ] = useState(null);

    // Calculo de atualização de experiancia do usuario
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    // Pedindo permissão para mandar notificações
    useEffect(()=>{
        Notification.requestPermission()
    }, [])

    // alvando informações no Cookies
    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengeCompleted', String(challengesCompleted));
    },[level, currentExperience, challengesCompleted])

    function levelUp(){
        setLevel(level + 1);
    };

    function startNewChallenge(){
        const ramdomChallengIndex = Math.floor(Math.random() * challengesJson.length);
        const challenge = challengesJson[ramdomChallengIndex];
        setActiveChallenge(challenge)

        // Notificando o usario
        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo Desafio!!',{
                body: `Valendo ${challenge.amount}xp!`,
            })
        }
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