import React from 'react';
import styles from '../../styles/menu.module.scss';

export default function MenuComponent(): JSX.Element {
  return (
    <section className={styles.menuBar}>
      <div className={styles.menuIcon}>
        <img
          className={styles.menuIcon__icon}
          src="icons/menu.svg"
          alt="menu"
        />
      </div>
    </section>
  );
}
