import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Formik, Field } from 'formik';
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

  const { loginUser, registerUser } = useContext(UsersContext);

  const {
    validateEmail,
    validatePassword,
    validatePasswordEquality,
    customValidations,
    resetCustomValidations,
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
    resetCustomValidations();
  };

  const onSubmit = ({ email, password }) => {
    if (switchObjArr[0].checked) {
      loginUser({ email, password });
    } else {
      registerUser({ email, password });
    }
  };

  const validate = (values) => {
    resetCustomValidations();

    const errors = {
      email: null,
      password: null,
      confirmPassword: null,
    };

    errors.email = validateEmail(values.email);
    errors.password = validatePassword(values.password);

    // checking if register swtitch is selected
    if (!switchObjArr[0].checked) {
      errors.confirmPassword = validatePasswordEquality(values.password, values.confirmPassword);
    }

    if (!errors.email) { delete errors.email; }
    if (!errors.password) { delete errors.password; }
    if (!errors.confirmPassword) { delete errors.confirmPassword; }

    return errors;
  };

  return (
    <section className={`${styles.homeContainer} wrapper wrapper--fullHeight wrapper--greyBg`}>
      <h1 className={styles.logo}>
        <span className={styles.logo__largerWord}>Water</span>
        Accountant
      </h1>

      {/*
        @TODO:
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
          handleSubmit, handleReset, errors, touched,
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
                  className={`label ${((touched.email && errors.email) || customValidations.email) && 'label--error'}`}
                >
                  <span className="label__text">E-mail</span>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="input"
                  />
                  <span className="tooltip">{errors.email || customValidations.email}</span>
                </label>

                <label
                  htmlFor="password"
                  className={`label ${((touched.password && errors.password) || customValidations.password) && 'label--error'}`}
                >
                  <span className="label__text">Password</span>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="input"
                  />
                  <span className="tooltip">{errors.password || customValidations.password}</span>
                </label>
              </>
            ) : (
              <>
                <label
                  htmlFor="email"
                  className={`label ${((touched.email && errors.email) || customValidations.email) && 'label--error'}`}
                >
                  <span className="label__text">E-mail</span>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="input"
                  />
                  <span className="tooltip">{errors.email || customValidations.email}</span>
                </label>

                <label
                  htmlFor="password"
                  className={`label ${((touched.password && errors.password) || customValidations.password) && 'label--error'}`}
                >
                  <span className="label__text">Password</span>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="input"
                  />
                  <span className="tooltip">{errors.password || customValidations.password}</span>
                </label>

                <label
                  htmlFor="confirm-password"
                  className={`label ${((touched.confirmPassword && errors.confirmPassword) || customValidations.confirmPassword) && 'label--error'}`}
                >
                  <span className="label__text">Confirm Password</span>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirm-password"
                    className="input"
                  />
                  <span className="tooltip">{errors.confirmPassword || customValidations.confirmPassword}</span>
                </label>
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
