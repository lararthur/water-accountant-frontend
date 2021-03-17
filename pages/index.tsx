import React, { useState } from 'react';
import styles from '../styles/home.module.scss';

export default function Home() {
  const [isLoginForm, setisLoginForm] = useState(true);
  const [selectedSwitchName, setSelectedSwitchName] = useState('Login');
  const [selectedSwitchNamePosition, setSelectedSwitchNamePosition] = useState({ left: 0 });

  const radioChange = (e, status, position, keyDownInteraction?) => {
    if (keyDownInteraction) {
      if (e.key === 'Enter') {
        setisLoginForm(status);
        setSelectedSwitchName(e.target.innerText);
        setSelectedSwitchNamePosition(position);
      }
    } else {
      setisLoginForm(status);
      setSelectedSwitchName(e.target.innerText);
      setSelectedSwitchNamePosition(position);
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
            onChange={(e) => radioChange(e, true, { left: 0 })}
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
            onChange={(e) => radioChange(e, false, { left: '50%' })}
          />
        </label>

        <div className="switch">
          <div className="switch__wrapper">
            <div
              className="switch__button switch__button--selected"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => radioChange(e, true, { left: 0 }, true)}
              onClick={(e) => radioChange(e, true, { left: 0 })}
            >
              Login
            </div>
            <div
              className="switch__button"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => radioChange(e, false, { left: '50%' }, true)}
              onClick={(e) => radioChange(e, false, { left: '50%' })}
            >
              Register
            </div>
            <div className="switch__selection" style={selectedSwitchNamePosition}>
              {selectedSwitchName}
            </div>
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
