import React, { useRef, useState } from 'react';
import styles from '../../styles/menu.module.scss';

export default function MenuComponent(): JSX.Element {
  const menuBgRef = useRef<HTMLElement>();
  const menuBgElement = menuBgRef.current;

  /*
  if (menuBgElement) {
      menuBgElement.scroll({
        left: menuBgElement.offsetWidth,
        behavior: 'smooth',
      });
    }
  */

  const scrollFinished = () => {
    const changesOn = (menuBgElement.scrollWidth / 2) - (menuBgElement.offsetWidth / 4);
    if (menuBgElement.scrollLeft <= changesOn) {
      menuBgElement.scroll({
        left: 0,
        behavior: 'smooth',
      });
    } else {
      menuBgElement.scroll({
        left: menuBgElement.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const [scrollTimer, setScrollTimer] = useState(-1);

  const scrollHandler = () => {
    if (scrollTimer !== -1) {
      clearTimeout(scrollTimer);
    }

    setScrollTimer(window.setTimeout(scrollFinished, 75));
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

      <section
        tabIndex={0}
        role="switch"
        /* @TODO: assign to 'aria-checked' the 'isMenuOpen' flag */
        aria-checked="false"
        ref={menuBgRef}
        onScroll={scrollHandler}
        className={styles.menuBackground}
      >
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
