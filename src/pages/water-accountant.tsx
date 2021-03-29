import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { LoggedUserContext } from '../contexts/LoggedUserContext';
import styles from '../styles/water-accountant.module.scss';

export default function WaterAccountant(): JSX.Element {
  const router = useRouter();

  const defaultProgressBar = {
    min: 0,
    max: 3800,
    achieved: 1700,
    percentage: (100 * 1700) / 3800,
  };
  const [progressBar, setProgressBar] = useState(defaultProgressBar);

  const defineIndicatorNumberPosition = (): string => {
    if (progressBar.percentage > 94) {
      return '-100%';
    }
    if (progressBar.percentage > 5) {
      return '-50%';
    }
    return '0';
  };

  const indicatorNumberInitialPosition = defineIndicatorNumberPosition();
  const [
    indicatorNumberPosition,
    setIndicatorNumberPosition,
  ] = useState(indicatorNumberInitialPosition);

  const { loggedUser } = useContext(LoggedUserContext);

  if (process.browser && !loggedUser) {
    router.push('/');
  }

  if (process.browser && loggedUser && !loggedUser.name) {
    router.push('/basic-info');
  }

  return (
    <section className={`wrapper wrapper--fullHeight wrapper--greyBg ${styles.waterAccountantContainer}`}>
      <div className={styles.infoBox}>

        <div className={styles.indicator}>
          <div className={styles.indicator__MinMax}>
            <span className={styles.indicator__min}>
              {progressBar.min}
              ml
            </span>
            <span className={styles.indicator__max}>
              {progressBar.max}
              ml
            </span>
          </div>

          <div className={styles.indicator__progressBar}>
            <div
              className={styles.indicator__achievedBar}
              style={{ width: `${progressBar.percentage}%` }}
            />
          </div>

          <div
            className={styles.indicator__achievedAmount}
            style={{ paddingLeft: `${progressBar.percentage}%` }}
          >
            <span
              className={styles.indicator__number}
              style={{ transform: `translateX(${indicatorNumberPosition})` }}
            >
              {progressBar.achieved}
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
            <span className={styles.counter__drank}>1700ml</span>
            {' '}
            / 3800ml
          </span>
        </div>

      </div>
    </section>
  );
}
