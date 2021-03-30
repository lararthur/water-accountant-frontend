import React, { useRef, useState } from 'react';
import styles from '../../styles/menu.module.scss';

export default function MenuComponent(): JSX.Element {
  const menuBgRef = useRef();
  /* menuBgRef.current && menuBgRef.current.scroll({
    left: menuBgRef.current.offsetWidth,
    behavior: 'smooth',
  }); */

  const [isScrolling, setIsScrolling] = useState(false);

  const moveMenuHandler = () => {
    if (!isScrolling) {
      setIsScrolling(true);
    }
  };

  const dropMenuHandler = () => {
    if (isScrolling) {
      // const changesOn = (scrollWidth / 2) - (offsetWidth / 4)
      // if scrollLeft <= chagesOn ? closeMenu() : openMenu()

      const changesOn = (menuBgRef.current.scrollWidth / 2) - (menuBgRef.current.offsetWidth / 4);
      if (menuBgRef.current.scrollLeft <= changesOn) {
        console.log('close menu');

        setTimeout(() => {
          menuBgRef.current.scroll({
            left: 0,
            behavior: 'smooth',
          });
        }, 200);
      } else {
        console.log('open menu');

        setTimeout(() => {
          menuBgRef.current.scroll({
            left: menuBgRef.current.offsetWidth,
            behavior: 'smooth',
          });
        }, 200);
      }

      setIsScrolling(false);
    }
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
        onTouchStart={moveMenuHandler}
        onTouchEnd={dropMenuHandler}
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
