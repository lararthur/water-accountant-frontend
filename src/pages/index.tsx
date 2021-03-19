import React, { useState } from 'react';
import SwitchComponent from '../components/common/SwitchComponent';
import styles from '../styles/home.module.scss';

type switchObjArrType = [
  {
    identifier: string;
    checked: boolean;
  },
  {
    identifier: string;
    checked: boolean;
  },
];

const Home = () => {
  const defaultSwitchObjArr: switchObjArrType = [
    {
      identifier: 'Login',
      checked: true,
    },
    {
      identifier: 'Register',
      checked: false,
    },
  ];
  const relatedSwitch = 'formType';

  const [switchObjArr, setSwitchObjArr] = useState(defaultSwitchObjArr);

  return (
    <div className={`${styles.homeContainer} wrapper`}>
      <h1 className={styles.logo}>
        <span className={styles.logo__largerWord}>Water</span>
        Accountant
      </h1>

      <form className="form">

        <SwitchComponent
          defaultSwitchObjArr={defaultSwitchObjArr}
          relatedSwitch={relatedSwitch}
          switchObjArr={switchObjArr}
          setSwitchObjArr={setSwitchObjArr}
        />

        {switchObjArr[0].checked ? (
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
};

export default Home;
