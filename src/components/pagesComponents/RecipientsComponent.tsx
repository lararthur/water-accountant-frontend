import React from 'react';
import styles from '../../styles/recipients.module.scss';

export default function RecipientsComponent():JSX.Element {
  return (
    <section className={styles.recipientsContainer}>
      <div className={styles.recipientsBox}>
        <div>
          You don’t have any drinking recipient added to your shortcut...
          You can do it by clicking the button to the right!
          <img
            src="icons/arrow-right.svg"
            alt="Click the button to the right"
            className={styles.recipientsBox__arrow}
          />
        </div>
      </div>

      <button
        type="button"
        className={styles.drinkOrAddButton}
      >
        <img
          src="icons/add.svg"
          alt="Drink or add custom measure"
          className={styles.drinkOrAddButton__icon}
        />
        Drink/add custom measure
      </button>
    </section>
  );
}
