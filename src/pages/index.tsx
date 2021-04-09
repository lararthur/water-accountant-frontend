import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import SwitchComponent from '../components/common/SwitchComponent';
import styles from '../styles/home.module.scss';
import { UsersContext } from '../contexts/UsersContext';
import { ValidationsContext } from '../contexts/ValidationsContext';
import { LoggedUserContext } from '../contexts/LoggedUserContext';

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

const Home = (): JSX.Element => {
  const router = useRouter();

  const { loggedUser } = useContext(LoggedUserContext);

  if (process.browser && loggedUser) {
    router.push('/water-accountant');
  }

  const { registerUser, loginUser } = useContext(UsersContext);
  const {
    emailObj,
    passwordObj,
    confirmPasswordObj,
    validateEmail,
    validatePassword,
    validatePasswordEquality,
    resetValidations,
  } = useContext(ValidationsContext);

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

  const switchSubscriber = (newSwitchObjArr, handleReset) => {
    setSwitchObjArr(newSwitchObjArr);
    handleReset();
    // will need to do some cleanup for the fomik state!
    resetValidations();
  };

  const handleRegister = () => {
    // send data to user registration
    /* registerUser({ email, password }); */
  };

  const handleLogin = () => {
    /* loginUser({ email, password }); */
  };

  const onSubmit = (values, actions) => {
    console.log('Submit', values);
  };

  const validate = (values) => {
    const errors = {
      email: null,
      password: null,
      confirmPassword: null,
    };

    errors.email = validateEmail(values.email);
    errors.password = validatePassword(values.password);
    errors.confirmPassword = validatePasswordEquality(values.password, values.confirmPassword);

    if (!errors.email) { delete errors.email; }
    if (!errors.password) { delete errors.password; }
    if (!errors.confirmPassword) { delete errors.confirmPassword; }

    return errors;
  };

  const handleField = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    if (fieldName === 'email') {
      validateEmail(fieldValue);
    }
    if (fieldName === 'password') {
      validatePassword(fieldValue);
    }
    if (fieldName === 'confirmPassword') {
      validatePasswordEquality(password, fieldValue);
    }
  };

  return (
    <section className={`${styles.homeContainer} wrapper wrapper--fullHeight wrapper--greyBg`}>
      <h1 className={styles.logo}>
        <span className={styles.logo__largerWord}>Water</span>
        Accountant
      </h1>

      {/*
        @TODO:
        -> show the errors on the warning spots through the layout
        -> in the future, leave only the validatioons functions on the...
        -> ...Validations context. And probably it won`t be a context anymore.
      */}

      <Formik
        onSubmit={onSubmit}
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validate={validate}
      >
        {({
          values, handleChange, handleSubmit, handleReset,
        }) => (
          <form
            className="form"
            onSubmit={handleSubmit}
          >

            <SwitchComponent
              relatedSwitch={relatedSwitch}
              switchObjArr={switchObjArr}
              switchSubscriber={(newSwitchObjArr) => switchSubscriber(newSwitchObjArr, handleReset)}
            />

            {switchObjArr[0].checked ? (
              <>
                <label
                  htmlFor="email"
              // i'm comapring (isValid === false) because the initial value is null...
              // And it can become false only after validated...
              // I only want to have the error class after validated.
                  className={`label ${(emailObj.isValid === false) && 'label--error'}`}
                >
                  <span className="label__text">E-mail</span>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="input"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <span className="tooltip">{emailObj.message}</span>
                </label>

                <label
                  htmlFor="password"
              // i'm comapring (isValid === false) because the initial value is null...
              // And it can become false only after validated...
              // I only want to have the error class after validated.
                  className={`label ${(passwordObj.isValid === false) && 'label--error'}`}
                >
                  <span className="label__text">Password</span>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="input"
                    value={values.password}
                    onChange={handleChange}
                  />
                  <span className="tooltip">{passwordObj.message}</span>
                </label>

                {/* <input
                  className="button"
                  type="submit"
                  value="Login"
                  onClick={handleLogin}
                /> */}
              </>
            ) : (
              <>
                <label
                  htmlFor="email"
              // i'm comapring (isValid === false) because the initial value is null...
              // And it can become false only after validated...
              // I only want to have the error class after validated.
                  className={`label ${(emailObj.isValid === false) && 'label--error'}`}
                >
                  <span className="label__text">E-mail</span>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="input"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <span className="tooltip">{emailObj.message}</span>
                </label>

                <label
                  htmlFor="password"
              // i'm comapring (isValid === false) because the initial value is null...
              // And it can become false only after validated...
              // I only want to have the error class after validated.
                  className={`label ${(passwordObj.isValid === false) && 'label--error'}`}
                >
                  <span className="label__text">Password</span>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="input"
                    value={values.password}
                    onChange={handleChange}
                  />
                  <span className="tooltip">{passwordObj.message}</span>
                </label>

                <label
                  htmlFor="confirm-password"
              // i'm comapring (isValid === false) because the initial value is null...
              // And it can become false only after validated...
              // I only want to have the error class after validated.
                  className={`label ${(confirmPasswordObj.isValid === false) && 'label--error'}`}
                >
                  <span className="label__text">Confirm Password</span>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirm-password"
                    className="input"
                    value={values.confirmPassword}
                    onChange={handleChange}
                  />
                  <span className="tooltip">{confirmPasswordObj.message}</span>
                </label>

                {/* <input
                  className="button"
                  type="submit"
                  value="Register"
                  onClick={handleRegister}
                /> */}
              </>
            )}

            <input
              className="button"
              type="submit"
              value={switchObjArr[0].checked ? 'Login' : 'Register'}
            />
          </form>
        )}
      </Formik>

    </section>
  );
};

export default Home;
