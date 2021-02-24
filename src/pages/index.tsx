import Head from 'next/head'

import ExperienceBar from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';

export default function Home() {
  return (
    <div className="containerApp">
      <Head><title>Inicio | move.it</title></Head>
      <ExperienceBar/>
      <section>

        <div>
          <Profile/>
          <CompletedChallenges/>
          <Countdown/>
        </div>
        <div>

        </div>

      </section>
    </div>
  );
}
