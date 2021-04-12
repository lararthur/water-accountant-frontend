import { Field, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import SwitchComponent from '../components/common/SwitchComponent';
import { LoggedUserContext } from '../contexts/LoggedUserContext';
import { UsersContext } from '../contexts/UsersContext';
import { ValidationsContext } from '../contexts/ValidationsContext';
import styles from '../styles/basic-info.module.scss';

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

export default function basicInfoPage(): JSX.Element {
  const { loggedUser } = useContext(LoggedUserContext);
  const router = useRouter();

  if (process.browser && !loggedUser) {
    router.push('/');
  }

  const { submitBasicInfo } = useContext(UsersContext);
  const defaultSwitchObjArr: switchObjArrType = [
    {
      identifier: 'Lb',
      checked: true,
    },
    {
      identifier: 'Kg',
      checked: false,
    },
  ];
  const relatedSwitch = 'weightMeasureUnit';
  const [switchObjArr, setSwitchObjArr] = useState(defaultSwitchObjArr);

  const [weightMeasureUnit, setWeightMeasureUnit] = useState('lb');

  const {
    validateName,
    validateWeight,
  } = useContext(ValidationsContext);

  const switchSubscriber = (newSwitchObjArr) => {
    const selectedObj = newSwitchObjArr.find((item) => item.checked);

    setWeightMeasureUnit(selectedObj.identifier.toLocaleLowerCase());
    setSwitchObjArr(newSwitchObjArr);
  };

  const onSubmit = ({ name, weight }) => {
    const submitBasicInfoObj = {
      email: loggedUser.email,
      name,
      weight: Number(weight),
      weightMeasureUnit,
    };
    submitBasicInfo(submitBasicInfoObj);
    router.push('/water-accountant');
  };

  const validate = ({ name, weight }) => {
    const errors = {
      name: null,
      weight: null,
    };

    errors.name = validateName(name);

    const weightToNumber = Number(weight);
    errors.weight = validateWeight(weightToNumber);

    if (!errors.name) { delete errors.name; }
    if (!errors.weight) { delete errors.weight; }

    return errors;
  };

  return (
    <section className={`${styles.basicInfoContainer} wrapper wrapper--fullHeight wrapper--greyBg`}>
      <p className="title">Hello! You’ll be experiencing the Water Accountant. You must insert your name and weight.</p>

      <Formik
        onSubmit={onSubmit}
        initialValues={{
          name: '',
          weight: '',
        }}
        validate={validate}
      >
        {({
          handleSubmit, errors, touched,
        }) => (
          <form
            className="form"
            onSubmit={handleSubmit}
          >
            <label
              htmlFor="name"
              className={`label ${(touched.name && errors.name) && 'label--error'}`}
            >
              <span className="label__text">Name</span>
              <Field
                type="text"
                name="name"
                id="name"
                className="input"
              />
              <span className="tooltip">{errors.name}</span>
            </label>

            <div className="inputGroup">
              <label
                htmlFor="weight"
                className={`label ${(touched.weight && errors.weight) && 'label--error'}`}
              >
                <span className="label__text">Weight</span>
                <Field
                  type="number"
                  name="weight"
                  id="weight"
                  className="input"
                />
                <span className="tooltip">{errors.weight}</span>
              </label>

              <span
                className="label"
              >
                <span className="label__text">Weight measure unit</span>
                <SwitchComponent
                  relatedSwitch={relatedSwitch}
                  switchObjArr={switchObjArr}
                  switchSubscriber={switchSubscriber}
                />
              </span>
            </div>

            <input
              className="button"
              type="submit"
              value="Continue"
            />

          </form>
        )}
      </Formik>
    </section>
  );
}
