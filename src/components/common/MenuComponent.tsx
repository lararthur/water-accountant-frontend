import React from 'react';
import styles from '../../styles/menu.module.scss';

export default function MenuComponent(): JSX.Element {
  return (
    <section className={styles.menuBar}>
      <div className="wrapper">
        <div className={styles.menuIcon} />
      </div>
    </section>
  );
}
