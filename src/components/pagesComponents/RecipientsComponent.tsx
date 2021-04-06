import Link from 'next/link';
import React, { useState } from 'react';
import styles from '../../styles/recipients.module.scss';

export default function RecipientsComponent():JSX.Element {
  const [recipients, setRecipients] = useState([
    {
      id: 1,
      name: 'Small glass',
      measure: 200,
      type: 'glass',
    },
    {
      id: 2,
      name: 'Small bottle',
      measure: 200,
      type: 'bottle',
    },
    {
      id: 3,
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
            {recipients.map((item) => (

              <button
                key={`recipient${item.id}`}
                type="button"
                className={styles.recipient}
              >
                <div className={styles.recipient__info}>
                  <img
                    className={styles.recipient__image}
                    src={`recipients/${item.type}.png`}
                    alt="Glass of water"
                  />
                  <p className={styles.recipient__name}>{item.name}</p>
                  <p className={styles.recipient__measure}>
                    {item.measure}
                    ml
                  </p>
                </div>

                <div className={styles.recipient__actions}>
                  <div className={`${styles.recipient__action} ${styles['recipient__action--drink']}`}>
                    <div className={styles.recipient__actionIcon}>
                      <img src="icons/drink.svg" alt="Drink" />
                    </div>
                    <p>Drink</p>
                  </div>

                  <div className={`${styles.recipient__action} ${styles['recipient__action--edit']}`}>
                    <div className={styles.recipient__actionIcon}>
                      <img src="icons/edit.svg" alt="Edit" />
                    </div>
                    <p>Edit</p>
                  </div>

                  <div className={`${styles.recipient__action} ${styles['recipient__action--remove']}`}>
                    <div className={styles.recipient__actionIcon}>
                      <img src="icons/remove.svg" alt="Remove" />
                    </div>
                    <p>Remove</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className={styles.recipientsBox__empty}>
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

      <Link href="/water-recipient">
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
      </Link>
    </section>
  );
}
