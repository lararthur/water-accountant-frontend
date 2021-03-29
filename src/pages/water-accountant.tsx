import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { LoggedUserContext } from '../contexts/LoggedUserContext';
import styles from '../styles/water-accountant.module.scss';

export default function WaterAccountant(): JSX.Element {
  const router = useRouter();

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
            <span className={styles.indicator__min}>0ml</span>
            <span className={styles.indicator__max}>3800ml</span>
          </div>

          <div className={styles.indicator__progressBar}>
            <div className={styles.indicator__achievedBar} />
          </div>

          <div className={styles.indicator__achievedAmount}>
            <span className={styles.indicator__number}>
              1700ml
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
