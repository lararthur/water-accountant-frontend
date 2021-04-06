import React, { useContext, useState } from 'react';
import MenuComponent from '../components/common/MenuComponent';
import SwitchComponent from '../components/common/SwitchComponent';
import { ValidationsContext } from '../contexts/ValidationsContext';
import styles from '../styles/water-recipient.module.scss';

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

export default function WaterRecipient(): JSX.Element {
  const defaultRecipientTypeSwitchObjArr: switchObjArrType = [
    {
      identifier: 'Glass',
      checked: true,
    },
    {
      identifier: 'Bottle',
      checked: false,
    },
  ];
  const defaultAddToShortcutSwitchObjArr: switchObjArrType = [
    {
      identifier: 'Yes',
      checked: true,
    },
    {
      identifier: 'No',
      checked: false,
    },
  ];
  const defaultDrinkNowSwitchObjArr: switchObjArrType = [
    {
      identifier: 'Yes',
      checked: true,
    },
    {
      identifier: 'No',
      checked: false,
    },
  ];

  const [
    recipientTypeSwitchObjArr,
    setRecipientTypeSwitchObjArr,
  ] = useState(defaultRecipientTypeSwitchObjArr);
  const [
    addToShortcutSwitchObjArr,
    setAddToShortcutSwitchObjArr,
  ] = useState(defaultAddToShortcutSwitchObjArr);
  const [
    drinkNowSwitchObjArr,
    setDrinkNowSwitchObjArr,
  ] = useState(defaultDrinkNowSwitchObjArr);

  const recipientTypeSwitchSubscriber = (newSwitchObjArr) => {
    setRecipientTypeSwitchObjArr(newSwitchObjArr);
  };
  const addToShortcutSwitchSubscriber = (newSwitchObjArr) => {
    setAddToShortcutSwitchObjArr(newSwitchObjArr);
  };
  const drinkNowSwitchSubscriber = (newSwitchObjArr) => {
    setDrinkNowSwitchObjArr(newSwitchObjArr);
  };

  const [measure, setMeasure] = useState(null);
  const [recipientName, setRecipientName] = useState('');

  const { measureObj, validateMeasure } = useContext(ValidationsContext);

  const handleField = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    if (fieldName === 'measure') {
      const valueToNumber = Number(fieldValue);

      if (valueToNumber < 0) {
        const fixedValue = valueToNumber * -1;
        setMeasure(fixedValue);
        validateMeasure(fixedValue);
        return;
      }
      setMeasure(valueToNumber);
      validateMeasure(valueToNumber);
    }
    if (fieldName === 'recipientName') {
      setRecipientName(fieldValue);
    }
  };

  const handleSubmitRecipient = () => {
    /*
    @TODO:
    -> make recipient type, drink now and recipient name fields...
    -> ...render only if add to shortcut is true.
    -> also, the button text will change if certain fields are true.
    -> lastly, submit the form to save the changes.
    */
  };

  return (
    <section className={`wrapper wrapper--fullHeight wrapper--greyBg ${styles.waterRecipientContainer}`}>
      <MenuComponent />
      <p className="title">Add/Edit Water Recipient</p>

      <form className="form">

        <div className="inputGroup">
          <span
            className="label"
          >
            <span className="label__text">Recipient type</span>
            <SwitchComponent
              relatedSwitch="recipientTypeSwitch"
              switchObjArr={recipientTypeSwitchObjArr}
              switchSubscriber={recipientTypeSwitchSubscriber}
            />
          </span>
        </div>

        <label
          htmlFor="measure"
          // i'm comapring (isValid === false) because the initial value is null...
          // And it can become false only after validated...
          // I only want to have the error class after validated.
          className={`label ${(measureObj.isValid === false) && 'label--error'}`}
        >
          <span className="label__text">Measure</span>
          <input
            type="number"
            name="measure"
            id="measure"
            className="input"
            value={measure || ''}
            onChange={(e) => handleField(e)}
          />
          <span className="tooltip">{measureObj.message}</span>
        </label>

        <div className="inputGroup">
          <span
            className="label"
          >
            <span className="label__text">Add to shortcut?</span>
            <SwitchComponent
              relatedSwitch="shortcutSwitch"
              switchObjArr={addToShortcutSwitchObjArr}
              switchSubscriber={addToShortcutSwitchSubscriber}
            />
          </span>
        </div>

        <div className="inputGroup">
          <span
            className="label"
          >
            <span className="label__text">Drink right now?</span>
            <SwitchComponent
              relatedSwitch="drinkNowSwitch"
              switchObjArr={drinkNowSwitchObjArr}
              switchSubscriber={drinkNowSwitchSubscriber}
            />
          </span>
        </div>

        <label
          htmlFor="recipientName"
          className="label"
        >
          <span className="label__text">Recipient name (optional)</span>
          <input
            type="text"
            name="recipientName"
            id="recipientName"
            className="input"
            value={recipientName}
            onChange={(e) => handleField(e)}
          />
        </label>

        <input
          className="button"
          type="button"
          value="Save and Drink"
          onClick={handleSubmitRecipient}
        />
      </form>

    </section>
  );
}
