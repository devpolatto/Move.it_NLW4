import { ChallengesProvider } from '../contexts/ChallengeContext'

import GlobalStyles from '../styles/GlobalStyles';

function MyApp({ Component, pageProps }) {
  return(
    <ChallengesProvider>
        <GlobalStyles/>
        <Component {...pageProps} />
    </ChallengesProvider>
  );
}

export default MyApp
