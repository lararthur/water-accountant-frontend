import React, { useState } from 'react';
import styles from '../styles/home.module.scss';

export default function Home() {
  const [isLoginForm, setisLoginForm] = useState(true);

  const keyDownInteraction = (e, status) => {
    if (e.key === 'Enter') {
      setisLoginForm(status);
    }
  };

  return (
    <div className={`${styles.homeContainer} wrapper`}>
      <h1 className={styles.logo}>
        <span className={styles.logo__largerWord}>Water</span>
        Accountant
      </h1>

      <form className="form">
        <label htmlFor="login">
          Login
          <input
            type="radio"
            id="login"
            name="formType"
            checked={isLoginForm}
            value={1}
            onChange={() => setisLoginForm(true)}
          />
        </label>
        <label htmlFor="register">
          Register
          <input
            type="radio"
            id="register"
            name="formType"
            checked={!isLoginForm}
            value={0}
            onChange={() => setisLoginForm(false)}
          />
        </label>

        <div className="switch">
          <div className="switch__wrapper">
            <div
              className="switch__button switch__button--selected"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => keyDownInteraction(e, true)}
              onClick={() => setisLoginForm(true)}
            >
              Login
            </div>
            <div
              className="switch__button"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => keyDownInteraction(e, false)}
              onClick={() => setisLoginForm(false)}
            >
              Register
            </div>
            <div className="switch__selection" style={{ right: 0 }} />
          </div>
        </div>
      </form>

      {isLoginForm ? (
        <form>
          <label htmlFor="email">
            E-mail
            <input type="email" id="email" />
          </label>
          <label htmlFor="password">
            Password
            <input type="password" id="password" />
          </label>

          <input type="button" value="Login" />
        </form>
      ) : (
        <form>
          <label htmlFor="email">
            E-mail
            <input type="email" id="email" />
          </label>
          <label htmlFor="password">
            Password
            <input type="password" id="password" />
          </label>
          <label htmlFor="confirm-password">
            Confirm Password
            <input type="password" id="confirm-password" />
          </label>

          <input type="button" value="Register" />
        </form>
      )}

    </div>
  );
}
