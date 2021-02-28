import Switch from 'react-switch';
import Cookies from 'js-cookie';

import { useContext, useEffect } from 'react';
import { ChallengesContext } from '../../contexts/ChallengeContext';

import { Container } from './styles'


export function Profile(){ 

    const { level, toggleTheme, theme } = useContext(ChallengesContext);

    useEffect(()=> {
        console.log(theme.title)
    }, [theme.title])

    return(
        <Container theme={theme}>
            <img src="https://avatars.githubusercontent.com/u/51465694?s=460&u=ac81de69d4d73a4e4b85a8f69741b26d8fe0ddcc&v=4" alt=""/>
            <div>
                <strong>Angelo Polatto</strong>
                <div className="sublite">
                    <div className="level">
                        <p>
                            <img src="icons/level.svg" alt=""/>
                            Level {level}
                            
                        </p>
                    </div>
                    <div className="theme">
                        {/* <Switch
                            onChange={toggleTheme}
                            checked={}
                            checkedIcon={false}
                            uncheckedIcon={false}
                            offColor={theme.colors.switchIcon.offColor}
                            onColor={theme.colors.switchIcon.onColor}
                        /> */}
                    </div>
                </div>
            </div>
        </Container>
    );
}