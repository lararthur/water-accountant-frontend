import React, { useState } from 'react';

interface defaultSwitchObj {
  identifier: string,
  checked: boolean,
}

type switchObjArrType = [
  defaultSwitchObj,
  defaultSwitchObj,
];

interface SwitchComponentProps {
  defaultSwitchObjArr: switchObjArrType;
  relatedSwitch: string;
  switchObjArr;
  setSwitchObjArr;
}

const SwitchComponent = (
  {
    defaultSwitchObjArr, relatedSwitch, switchObjArr, setSwitchObjArr,
  }: SwitchComponentProps,
) => {
  const [checkedIdentifier, setcheckedIdentifier] = useState('Login');

  const radioChange = (identifier) => {
    let indexToTrue = 0;
    let indexToFalse = 0;

    const toTrue = switchObjArr.find((item, index) => {
      const equality = item.identifier === identifier;
      if (equality) {
        indexToTrue = index;
      }
      return equality;
    });
    const toFalse = switchObjArr.find((item, index) => {
      const equality = item.identifier === identifier;
      if (!equality) {
        indexToFalse = index;
      }
      return !equality;
    });

    const newSwitchObjArr: switchObjArrType = defaultSwitchObjArr;
    newSwitchObjArr[indexToTrue] = { ...toTrue, checked: true };
    newSwitchObjArr[indexToFalse] = { ...toFalse, checked: false };

    setSwitchObjArr(newSwitchObjArr);
    setcheckedIdentifier(toTrue.identifier);
  };

  const radioChangeHandler = (e, identifier) => {
    if (e.type === 'keydown') {
      if (e.key === 'Enter') {
        radioChange(identifier);
      }
    } else {
      radioChange(identifier);
    }
  };

  return (
    <>
      {switchObjArr.map((switchRadioItem) => {
        const formatedIdentifier = switchRadioItem.identifier.replace(/\s/g, '').toLocaleLowerCase();
        return (
          <label
            key={`radio-${formatedIdentifier}`}
            htmlFor={formatedIdentifier}
            className="hidden"
          >
            {switchRadioItem.identifier}
            <input
              type="radio"
              id={formatedIdentifier}
              name={relatedSwitch}
              checked={switchRadioItem.checked}
              value={formatedIdentifier}
              onChange={(e) => radioChangeHandler(e, switchRadioItem.identifier)}
            />
          </label>
        );
      })}

      <div className="switch">
        <div className="switch__wrapper">
          {switchObjArr.map((switchItem) => {
            const formatedIdentifier = switchItem.identifier.replace(/\s/g, '').toLocaleLowerCase();
            return (
              <div
                key={`switch-${formatedIdentifier}`}
                className={`switch__button ${switchItem.checked && 'switch__button--selected'}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => radioChangeHandler(e, switchItem.identifier)}
                onClick={(e) => radioChangeHandler(e, switchItem.identifier)}
              >
                {switchItem.identifier}
              </div>
            );
          })}
          <div className="switch__selection" style={{ left: (switchObjArr[0].checked) ? '0' : '50%' }}>
            {checkedIdentifier}
          </div>
        </div>
      </div>
    </>
  );
};

export default SwitchComponent;
