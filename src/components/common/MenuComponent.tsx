import React from 'react';
import styles from '../../styles/menu.module.scss';

export default function MenuComponent(): JSX.Element {
  const checkMenuPosition = (e) => {
    console.log(e);
    // const chagesOn = (scrollWidth / 2) - (offsetWidth / 4)
    // if scrollLeft <= chagesOn ? closeMenu() : openMenu()
  };

  return (
    <>
      <section className={styles.menuBar}>
        <div className={styles.menuIcon}>
          <img
            className={styles.menuIcon__icon}
            src="icons/menu.svg"
            alt="menu"
          />
        </div>
      </section>

      <section onScroll={(e) => checkMenuPosition(e)} className={styles.menuBackground}>
        <div className={styles.menuCover}>

          <nav className={styles.menu}>
            <ul>
              <li>Home</li>
              <li>Add custom measure</li>
              <li>My Info</li>
              <li>Logout</li>
            </ul>
          </nav>

        </div>
      </section>
    </>
  );
}
