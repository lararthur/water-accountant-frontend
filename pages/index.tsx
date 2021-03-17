import React, { useState } from 'react';
import styles from '../styles/home.module.scss';

export default function Home() {
  const [isLoginForm, setisLoginForm] = useState(true);

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
            defaultChecked={isLoginForm}
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
            defaultChecked={!isLoginForm}
            value={0}
            onChange={() => setisLoginForm(false)}
          />
        </label>

        <div className="switch">
          <div className="switch__wrapper">
            <div className="switch__button switch__button--selected">
              Login
            </div>
            <div className="switch__button">
              Register
            </div>
            <div className="switch__selection" />
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
