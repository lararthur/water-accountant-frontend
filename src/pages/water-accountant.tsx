import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import getLoggedUser from '../utils';
import { LoggedUserContext } from '../contexts/LoggedUserContext';
import styles from '../styles/water-accountant.module.scss';
import MenuComponent from '../components/common/MenuComponent';
import RecipientsComponent from '../components/pagesComponents/RecipientsComponent';

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { loggedUser: getLoggedUser(context) }, // will be passed to the page component as props
});

export default function WaterAccountant({ loggedUser }): JSX.Element {
  const router = useRouter();
  if (process.browser && !loggedUser) {
    router.push('/');
    // in order to this early return work, take a look at the @TODO
    return (<p>404</p>);
  }
  if (process.browser && loggedUser && !loggedUser.name) {
    router.push('/basic-info');
    // in order to this early return work, take a look at the @TODO
    return (<p>404</p>);
  }

  /*
  @TODO
  -> CHANGE THE COOKIES DATA TO FIREBASE OR REAL DB ASAP!!!...
  -> ...in order to fix the stuck progressBar, the 'did not mach Server x Browser' issue.
  -> in order to a early return work, maybe it is necessary to implement : https://stackoverflow.com/questions/54938236/can-you-early-return-with-react-hooks#:~:text=React%20does%20not%20allow%20you,an%20accidental%20early%20return%20statement. ...
  -> ...wich basically says that the the rest of the code must be componetized (or some of it).
   */

  const [dailyProgress, setDailyProgress] = useState(loggedUser);

  const [
    progressBarPercentage,
    setProgressBarPercentage,
  ] = useState(
    (100 * (dailyProgress.drank))
      / (dailyProgress.necessary),
  );

  /* const [progressBar, setProgressBar] = useState(defaultProgressBar); */

  console.log(dailyProgress, progressBarPercentage);

  const defineIndicatorNumberPosition = (): string => {
    if (progressBarPercentage > 94) {
      return '-100%';
    }
    if (progressBarPercentage > 5) {
      return '-50%';
    }
    return '0';
  };

  const indicatorNumberInitialPosition = defineIndicatorNumberPosition();
  const [
    indicatorNumberPosition,
    setIndicatorNumberPosition,
  ] = useState(indicatorNumberInitialPosition);

  return (
    <section className={`wrapper wrapper--fullHeight wrapper--greyBg ${styles.waterAccountantContainer}`}>
      <MenuComponent />

      <div className={styles.infoBox}>

        <div className={styles.indicator}>
          <div className={styles.indicator__MinMax}>
            <span className={styles.indicator__min}>
              0ml
            </span>
            <span className={styles.indicator__max}>
              {dailyProgress.necessary}
              ml
            </span>
          </div>

          <div className={styles.indicator__progressBar}>
            <div
              className={styles.indicator__achievedBar}
              style={{ width: `${progressBarPercentage}%` }}
            />
          </div>

          <div
            className={styles.indicator__achievedAmount}
            style={{ paddingLeft: `${progressBarPercentage}%` }}
          >
            <span
              className={styles.indicator__number}
              style={{ transform: `translateX(${indicatorNumberPosition})` }}
            >
              {dailyProgress.drank || '0'}
              ml
            </span>
          </div>
        </div>

        <div className={styles.counter}>
          <span className={styles.counter__greeter}>
            Hi,
            {` ${loggedUser && loggedUser.name}`}
            ! Today, you drank:
          </span>
          <span className={styles.counter__numbers}>
            <span className={styles.counter__drank}>
              {dailyProgress.drank || '0'}
              ml
            </span>
            {' '}
            / 3800ml
          </span>
        </div>

      </div>

      <RecipientsComponent />
    </section>
  );
}
