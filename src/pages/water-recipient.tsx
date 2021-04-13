import { Field, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import MenuComponent from '../components/common/MenuComponent';
import SwitchComponent from '../components/common/SwitchComponent';
import { LoggedUserContext } from '../contexts/LoggedUserContext';
import { UsersContext } from '../contexts/UsersContext';
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
  const { loggedUser } = useContext(LoggedUserContext);
  const router = useRouter();

  if (process.browser && !loggedUser) {
    router.push('/');
  }

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

  const [submitButtonValue, setSubmitButtonValue] = useState('Save');

  useEffect(() => {
    if (!addToShortcutSwitchObjArr[0].checked) {
      setSubmitButtonValue('Drink');
      return;
    }
    if (addToShortcutSwitchObjArr[0].checked && !drinkNowSwitchObjArr[0].checked) {
      setSubmitButtonValue('Save');
      return;
    }
    if (addToShortcutSwitchObjArr[0].checked && drinkNowSwitchObjArr[0].checked) {
      setSubmitButtonValue('Save and Drink');
    }
  }, [addToShortcutSwitchObjArr, drinkNowSwitchObjArr]);

  const { validateMeasure } = useContext(ValidationsContext);

  const { addRecipient } = useContext(UsersContext);

  const saveRecipient = ({ measure, recipientName }) => {
    const type = recipientTypeSwitchObjArr.find((item) => item.checked);

    const recipient = {
      id: null,
      name: recipientName || type.identifier,
      measure: Number(measure),
      type: type.identifier.toLowerCase(),
    };
    addRecipient(recipient);
  };

  const onSubmit = (values) => {
    /*
    @TODO:
    -> use drink function (will be implemented at UsersContext)
    */

    // only drink
    if (!addToShortcutSwitchObjArr[0].checked) {
      // call drink function
      return;
    }
    // only save recipient to shortcut
    if (addToShortcutSwitchObjArr[0].checked && !drinkNowSwitchObjArr[0].checked) {
      saveRecipient(values);
      router.push('/water-accountant');
      return;
    }
    // save recipient to shorcut AND drink
    if (addToShortcutSwitchObjArr[0].checked && drinkNowSwitchObjArr[0].checked) {
      // call drink and saveRecipient functions
    }
  };

  const validate = ({ measure }) => {
    const errors = {
      measure: null,
    };

    const measureToNumber = Number(measure);
    errors.measure = validateMeasure(measureToNumber);

    if (!errors.measure) { delete errors.measure; }

    return errors;
  };

  return (
    <section className={`wrapper wrapper--fullHeight wrapper--greyBg ${styles.waterRecipientContainer}`}>
      <MenuComponent />
      <p className="title">Add/Edit Water Recipient</p>

      <Formik
        onSubmit={onSubmit}
        initialValues={{
          measure: '',
          recipientName: '',
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
              htmlFor="measure"
              className={`label ${(touched.measure && errors.measure) && 'label--error'}`}
            >
              <span className="label__text">Measure</span>
              <Field
                type="number"
                name="measure"
                id="measure"
                className="input"
              />
              <span className="tooltip">{errors.measure}</span>
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

            {addToShortcutSwitchObjArr[0].checked && ([
              <div className="inputGroup" key="recipientTypeSwitch">
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
              </div>,

              <div className="inputGroup" key="drinkNowSwitchObjArr">
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
              </div>,

              // unfortunatelly i had to add this ignore line below to avoid the...
              // ...warning of form-control stuff. I didn`t understand...
              // ...where i`m getting this wrong :(
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label
                htmlFor="recipientName"
                className="label"
                key="recipientName"
              >
                <span className="label__text">Recipient name (optional)</span>
                <Field
                  type="text"
                  name="recipientName"
                  id="recipientName"
                  className="input"
                />
              </label>,
            ])}

            <input
              className="button"
              type="submit"
              value={submitButtonValue}
            />
          </form>
        )}
      </Formik>

    </section>
  );
}
