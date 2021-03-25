import React, { useState } from 'react';
import SwitchComponent from '../components/common/SwitchComponent';
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
    }
    if (fieldName === 'weight') {
      if (fieldValue < 0) {
        setWeight(fieldValue * -1);
      } else {
        setWeight(fieldValue);
      }
    }
    if (fieldName === 'language') {
      setLanguage(fieldValue);
    }
  };

  return (
    <section className={`${styles.basicInfoContainer} wrapper wrapper--fullHeight wrapper--greyBg`}>
      <p className="title">Hello! You’ll be experiencing the Water Accountant. You must insert your name, weight and language.</p>

      <form className="form">
        <label
          htmlFor="name"
          className="label"
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
        </label>

        <div className="inputGroup">
          <label
            htmlFor="weight"
            className="label"
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
        />

      </form>
    </section>
  );
}
