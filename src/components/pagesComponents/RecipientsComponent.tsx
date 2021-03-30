import React, { useState } from 'react';
import styles from '../../styles/recipients.module.scss';

export default function RecipientsComponent():JSX.Element {
  const [recipients, setRecipients] = useState([
    {
      name: 'Small glass',
      measure: 200,
      type: 'glass',
    },
    {
      name: 'Small bottle',
      measure: 200,
      type: 'bottle',
    },
    {
      name: 'Medium bottle',
      measure: 300,
      type: 'bottle',
    },
  ]);
  return (
    <section className={styles.recipientsContainer}>
      <div className={styles.recipientsBox}>

        {(recipients.length > 0) ? (
          <div className={styles.recipientsBox__scrolling}>
            <button
              type="button"
              className={styles.recipient}
            >
              <div className={styles.recipient__info}>
                <img
                  className={styles.recipient__image}
                  src="recipients/glass.png"
                  alt="Glass of water"
                />
                <p className={styles.recipient__name}>Small Glass</p>
                <p className={styles.recipient__measure}>200ml</p>
              </div>

              {/* recipient__actions */}
            </button>
          </div>
        ) : (
          <div>
            You don’t have any drinking recipient added to your shortcut...
            You can do it by clicking the button to the right!
            <img
              src="icons/arrow-right.svg"
              alt="Click the button to the right"
              className={styles.recipientsBox__arrow}
            />
          </div>
        )}

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
