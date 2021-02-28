import Head from 'next/head'
import { GetServerSideProps } from 'next';

import { CountdownProvider } from '../contexts/CountdownContext';

import ExperienceBar from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';

export default function Home(props) {

  console.log(props)

  return (
    <div className="containerApp">
      <Head><title>Inicio | move.it</title></Head>
      <ExperienceBar/>

      <CountdownProvider>
        <section>
          <div>
            <Profile/>
            <CompletedChallenges/>
            <Countdown/>
          </div>
          <div>
            <ChallengeBox/>
          </div>
        </section>
      </CountdownProvider>
      
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const { level, currentExperience, challengeCompleted } = ctx.req.cookies;

  return{
    props: {
      level,
      currentExperience,
      challengeCompleted,
    }
  };
}
