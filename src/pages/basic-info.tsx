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

  const [name, setName] = useState('');
  const [weight, setWeight] = useState(null);
  const [weightMeasureUnit, setWeightMeasureUnit] = useState('lb');
  const [language, setLanguage] = useState('en-US');

  const {
    nameObj,
    weightObj,
    validateName,
    validateWeight,
  } = useContext(ValidationsContext);

  const switchSubscriber = (newSwitchObjArr) => {
    const selectedObj = newSwitchObjArr.find((item) => item.checked);

    setWeightMeasureUnit(selectedObj.identifier.toLocaleLowerCase());
    setSwitchObjArr(newSwitchObjArr);
  };

  const handleField = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    if (fieldName === 'name') {
      setName(fieldValue);
      validateName(fieldValue);
    }
    if (fieldName === 'weight') {
      const valueToNumber = Number(fieldValue);

      if (valueToNumber < 0) {
        const fixedValue = valueToNumber * -1;

        setWeight(fixedValue);
        validateWeight(fixedValue);
      } else {
        setWeight(valueToNumber);
        validateWeight(valueToNumber);
      }
    }
    if (fieldName === 'language') {
      setLanguage(fieldValue);
    }
  };

  const handleSubmitBasicInfo = () => {
    validateName(name);
    validateWeight(weight);

    if (nameObj.isValid && weightObj.isValid) {
      const submitBasicInfoObj = {
        email: loggedUser.email,
        name,
        weight,
        weightMeasureUnit,
        language,
      };
      submitBasicInfo(submitBasicInfoObj);
      router.push('/water-accountant');
    }
  };

  return (
    <section className={`${styles.basicInfoContainer} wrapper wrapper--fullHeight wrapper--greyBg`}>
      <p className="title">Hello! You’ll be experiencing the Water Accountant. You must insert your name, weight and language.</p>

      <form className="form">
        <label
          htmlFor="name"
          // i'm comapring (isValid === false) because the initial value is null...
          // And it can become false only after validated...
          // I only want to have the error class after validated.
          className={`label ${(nameObj.isValid === false) && 'label--error'}`}
        >
          <span className="label__text">Name</span>
          <input
            type="text"
            name="name"
            id="name"
            className="input"
            value={name}
            onChange={(e) => handleField(e)}
          />
          <span className="tooltip">{nameObj.message}</span>
        </label>

        <div className="inputGroup">
          <label
            htmlFor="weight"
            // i'm comapring (isValid === false) because the initial value is null...
            // And it can become false only after validated...
            // I only want to have the error class after validated.
            className={`label ${(weightObj.isValid === false) && 'label--error'}`}
          >
            <span className="label__text">Weight</span>
            <input
              type="number"
              name="weight"
              id="weight"
              className="input"
              value={weight || ''}
              onChange={(e) => handleField(e)}
            />
            <span className="tooltip">{weightObj.message}</span>
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

        <label
          htmlFor="language"
          className="label"
        >
          <span className="label__text">Language</span>
          <select
            name="language"
            id="language"
            className="input"
            onChange={(e) => handleField(e)}
          >
            <option value="en-US">English</option>
            <option value="pt-BR">Português</option>
          </select>
        </label>

        <input
          className="button"
          type="button"
          value="Continue"
          onClick={handleSubmitBasicInfo}
        />

      </form>
    </section>
  );
}
