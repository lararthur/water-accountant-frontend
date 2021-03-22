import React, { useState, useContext } from 'react';
import SwitchComponent from '../components/common/SwitchComponent';
import styles from '../styles/home.module.scss';
import { UsersContext } from '../contexts/UsersContext';

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
  const { registerUser } = useContext(UsersContext);

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

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const subscriber = (newSwitchObjArr) => {
    setSwitchObjArr(newSwitchObjArr);
  };

  const handleRegister = () => {
    /*
    @Todo:
    -> still missing more consistent validations!
    */
    // fields validations
    if (password !== confirmPassword) {
      console.log('not passwords are different');
      return;
    }

    // send data to user registration
    registerUser({ email, password });
  };

  const handleField = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    if (fieldName === 'email') {
      setEmail(fieldValue);
    }
    if (fieldName === 'password') {
      setPassword(fieldValue);
    }
    if (fieldName === 'confirmPassword') {
      setConfirmPassword(fieldValue);
    }
  };

  return (
    <div className={`${styles.homeContainer} wrapper`}>
      <h1 className={styles.logo}>
        <span className={styles.logo__largerWord}>Water</span>
        Accountant
      </h1>

      <form className="form">

        <SwitchComponent
          relatedSwitch={relatedSwitch}
          switchObjArr={switchObjArr}
          subscriber={subscriber}
        />

        {switchObjArr[0].checked ? (
          <>
            <label
              htmlFor="email"
              className="label"
            >
              <span className="label__text">E-mail</span>
              <input
                type="email"
                name="email"
                id="email"
                className="input"
                onChange={(e) => handleField(e)}
              />
            </label>

            <label
              htmlFor="password"
              className="label"
            >
              <span className="label__text">Password</span>
              <input
                type="password"
                name="password"
                id="password"
                className="input"
                onChange={(e) => handleField(e)}
              />
            </label>

            <input
              className="button"
              type="button"
              value="Login"
            />
          </>
        ) : (
          <>
            <label
              htmlFor="email"
              className="label"
            >
              <span className="label__text">E-mail</span>
              <input
                type="email"
                name="email"
                id="email"
                className="input"
                onChange={(e) => handleField(e)}
              />
            </label>

            <label
              htmlFor="password"
              className="label"
            >
              <span className="label__text">Password</span>
              <input
                type="password"
                name="password"
                id="password"
                className="input"
                onChange={(e) => handleField(e)}
              />
            </label>

            <label
              htmlFor="confirm-password"
              className="label"
            >
              <span className="label__text">Confirm Password</span>
              <input
                type="password"
                name="confirmPassword"
                id="confirm-password"
                className="input"
                onChange={(e) => handleField(e)}
              />
            </label>

            <input
              className="button"
              type="button"
              value="Register"
              onClick={handleRegister}
            />
          </>
        )}
      </form>

    </div>
  );
};

export default Home;
