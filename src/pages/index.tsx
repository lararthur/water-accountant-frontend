import React, { useState } from 'react';
import styles from '../styles/home.module.scss';

export default function Home() {
  const defaultSwitchObjArr = [{
    identifier: 'Login',
    checked: true,
  }, {
    identifier: 'Register',
    checked: false,
  }];
  const relatedSwitch = 'formType';

  const [switchObjArr, setSwitchObjArr] = useState(defaultSwitchObjArr);
  const [checkedIdentifier, setcheckedIdentifier] = useState('Login');

  const radioChange = (identifier) => {
    let indexToTrue = 0;
    let indexToFalse = 0;

    const toTrue = switchObjArr.find((item, index) => {
      const equality = item.identifier === identifier;
      if (equality) {
        indexToTrue = index;
      }
      return equality;
    });
    const toFalse = switchObjArr.find((item, index) => {
      const equality = item.identifier === identifier;
      if (!equality) {
        indexToFalse = index;
      }
      return !equality;
    });

    const newSwitchObjArr = [];
    newSwitchObjArr[indexToTrue] = { ...toTrue, checked: true };
    newSwitchObjArr[indexToFalse] = { ...toFalse, checked: false };

    setSwitchObjArr(newSwitchObjArr);
    setcheckedIdentifier(toTrue.identifier);
  };

  const radioChangeHandler = (e, identifier) => {
    if (e.type === 'keydown') {
      if (e.key === 'Enter') {
        radioChange(identifier);
      }
    } else {
      radioChange(identifier);
    }
  };

  return (
    <div className={`${styles.homeContainer} wrapper`}>
      <h1 className={styles.logo}>
        <span className={styles.logo__largerWord}>Water</span>
        Accountant
      </h1>

      <form className="form">

        {switchObjArr.map((switchRadioItem) => {
          const formatedIdentifier = switchRadioItem.identifier.replace(/\s/g, '').toLocaleLowerCase();
          return (
            <label
              key={`radio-${formatedIdentifier}`}
              htmlFor={formatedIdentifier}
              className="hidden"
            >
              {switchRadioItem.identifier}
              <input
                type="radio"
                id={formatedIdentifier}
                name={relatedSwitch}
                checked={switchRadioItem.checked}
                value={formatedIdentifier}
                onChange={(e) => radioChangeHandler(e, switchRadioItem.identifier)}
              />
            </label>
          );
        })}

        <div className="switch">
          <div className="switch__wrapper">
            {switchObjArr.map((switchItem) => {
              const formatedIdentifier = switchItem.identifier.replace(/\s/g, '').toLocaleLowerCase();
              return (
                <div
                  key={`switch-${formatedIdentifier}`}
                  className={`switch__button ${switchItem.checked && 'switch__button--selected'}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => radioChangeHandler(e, switchItem.identifier)}
                  onClick={(e) => radioChangeHandler(e, switchItem.identifier)}
                >
                  {switchItem.identifier}
                </div>
              );
            })}
            <div className="switch__selection" style={{ left: (switchObjArr[0].checked) ? '0' : '50%' }}>
              {checkedIdentifier}
            </div>
          </div>
        </div>

        {checkedIdentifier === 'Login' ? (
          <>
            <label htmlFor="email" className="label">
              <span className="label__text">E-mail</span>
              <input type="email" id="email" className="input" />
            </label>
            <label htmlFor="password" className="label">
              <span className="label__text">Password</span>
              <input type="password" id="password" className="input" />
            </label>

            <input
              className="button"
              type="button"
              value="Login"
            />
          </>
        ) : (
          <>
            <label htmlFor="email" className="label">
              <span className="label__text">E-mail</span>
              <input type="email" id="email" className="input" />
            </label>
            <label htmlFor="password" className="label">
              <span className="label__text">Password</span>
              <input type="password" id="password" className="input" />
            </label>
            <label htmlFor="confirm-password" className="label">
              <span className="label__text">Confirm Password</span>
              <input type="password" id="confirm-password" className="input" />
            </label>

            <input
              className="button"
              type="button"
              value="Register"
            />
          </>
        )}
      </form>

    </div>
  );
}
