import React, { useContext, useRef, useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/menu.module.scss';
import { LoggedUserContext } from '../../contexts/LoggedUserContext';

export default function MenuComponent(): JSX.Element {
  const { logout } = useContext(LoggedUserContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openedMenuClass, setOpenedMenuClass] = useState('');

  const menuBgRef = useRef<HTMLElement>();

  const openMenu = () => {
    setIsMenuOpen(true);

    setTimeout(() => {
      if (menuBgRef.current) {
        menuBgRef.current.scroll({
          left: menuBgRef.current.offsetWidth,
          behavior: 'smooth',
        });
        setOpenedMenuClass('menuBackground--opened');
      }
    }, 100);
  };

  const closeMenu = () => {
    if (menuBgRef.current) {
      menuBgRef.current.scroll({
        left: 0,
        behavior: 'smooth',
      });
    }

    setTimeout(() => {
      setOpenedMenuClass('');
      setIsMenuOpen(false);
    }, 200);
  };

  const scrollFinished = () => {
    const closesOn = (menuBgRef.current.scrollWidth / 2) - (menuBgRef.current.offsetWidth / 4);
    if (menuBgRef.current.scrollLeft <= closesOn) {
      closeMenu();
      return;
    }
    openMenu();
  };

  const handleMenuKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (isMenuOpen) {
        closeMenu();
        return;
      }
      openMenu();
    }
  };

  const handleLogoutKeyDown = (e) => {
    if (e.key === 'Enter') logout();
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
        <div
          tabIndex={0}
          role="button"
          className={styles.menuIcon}
          onClick={openMenu}
          onKeyDown={(e) => handleMenuKeyDown(e)}
        >
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
        aria-checked={isMenuOpen}
        ref={menuBgRef}
        onScroll={scrollHandler}
        className={`${styles.menuBackground} ${openedMenuClass && styles[openedMenuClass]}`}
      >
        <div className={styles.menuCover}>

          <div className={styles.menu}>
            <div className={styles.menu__header}>
              <div
                tabIndex={0}
                role="button"
                className={styles.menu__closeIcon}
                onClick={closeMenu}
                onKeyDown={(e) => handleMenuKeyDown(e)}
              >
                <img src="icons/close.svg" alt="Close menu" />
              </div>
            </div>

            <ul className={styles.menu__list}>
              <li className={styles.menu__item}>
                <Link href="/water-accountant">
                  Home
                </Link>
              </li>
              <li className={styles.menu__item}>
                <Link href="/water-recipient">
                  Add custom measure
                </Link>
              </li>
              <li className={styles.menu__item}>
                <Link href="/user-info">
                  My Info
                </Link>
              </li>
              <li className={styles.menu__item}>
                <div
                  tabIndex={0}
                  role="button"
                  onClick={logout}
                  onKeyDown={(e) => handleLogoutKeyDown(e)}
                >
                  Logout
                </div>
              </li>
            </ul>
          </div>

        </div>
      </section>
    </>
  );
}
