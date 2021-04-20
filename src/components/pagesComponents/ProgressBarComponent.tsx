import React, { useContext, useState } from 'react';
import { LoggedUserContext } from '../../contexts/LoggedUserContext';
import styles from '../../styles/water-accountant.module.scss';

export default function ProgressBarComponent() {
  const { loggedUser } = useContext(LoggedUserContext);
  const [dailyProgress] = useState(loggedUser.dailyProgress);

  const defineIndicatorNumberPosition = (): string => {
    if (progressBarPercentage > 94) {
      return '-100%';
    }
    if (progressBarPercentage > 5) {
      return '-50%';
    }
    return '0';
  };

  const [
    progressBarPercentage,
  ] = useState(
    (100 * (dailyProgress.drank))
      / (dailyProgress.necessary),
  );

  const [
    indicatorNumberPosition,
  ] = useState(defineIndicatorNumberPosition());

  if (loggedUser) {
    return (
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
    );
  }
    <p>Not found</p>;
}
