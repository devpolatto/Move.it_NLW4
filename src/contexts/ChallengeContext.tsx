import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react'

import Cookies from 'js-cookie';

import challengesJson from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

import light from '../styles/themes/light';
import dark from '../styles/themes/dark';

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
    closeLevelUpModal: () => void;
    toggleTheme: () => void;
    theme: Theme;
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

interface Theme {
    title: string;
    colors: {
        primary: string;
        secundary: string;
        background: string;
        text: string;
        switchIcon: {
            offColor: string;
            onColor: string;
        };
    };
}

export const ChallengesContext = createContext({} as ChallengesContext);

export function ChallengesProvider({ children, ...rest }: challengesProviderProps){

    const [ level, setLevel ] = useState(rest.level ?? 1);
    const [ currentExperience, setcurrentExperience ] = useState(rest.currentExperience ?? 0);
    const [ challengesCompleted, setChallengesCompleted ] = useState(rest.challengesCompleted ?? 0)

    const [ activeChallenge, setActiveChallenge ] = useState(null);
    const [ isLevelModalOpen, setIsLevelModalOpen ] = useState(false)

    const [theme, setTheme] = useState(light);
    const [ themeTitle, setThemeTitle ] = useState(Cookies.get('theme'))

    // Calculo de atualização de experiancia do usuario
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    // Pedindo permissão para mandar notificações
    useEffect(()=>{
        Notification.requestPermission()
    }, [])

    // salvando informações no Cookies
    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengeCompleted', String(challengesCompleted));
    },[level, currentExperience, challengesCompleted])

    function levelUp(){
        setLevel(level + 1);
        setIsLevelModalOpen(true);
    };

    function closeLevelUpModal(){
        setIsLevelModalOpen(false)
    }

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

    // alterando o tema da aplicação
    function toggleTheme() {
        setTheme(theme.title === 'light' ? dark : light);
        Cookies.set('theme', theme.title)
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
            closeLevelUpModal,
            toggleTheme,
            theme,
            }}
        >

            { children }

            { isLevelModalOpen && <LevelUpModal/> }

        </ChallengesContext.Provider>
    );
}