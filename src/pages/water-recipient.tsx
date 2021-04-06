import React, { useState } from 'react';
import MenuComponent from '../components/common/MenuComponent';
import SwitchComponent from '../components/common/SwitchComponent';
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
      </form>

    </section>
  );
}
