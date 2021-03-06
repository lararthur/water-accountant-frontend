import React, { useRef, useState } from 'react';

interface defaultSwitchObj {
  identifier: string,
  checked: boolean,
}

type switchObjArrType = [
  defaultSwitchObj,
  defaultSwitchObj,
];

interface SwitchComponentProps {
  relatedSwitch: string;
  switchObjArr: switchObjArrType;
  switchSubscriber: (param: switchObjArrType) => void;
}

const SwitchComponent = (
  {
    relatedSwitch, switchObjArr, switchSubscriber,
  }: SwitchComponentProps,
): JSX.Element => {
  const checkedObj = switchObjArr.find((item) => item.checked);
  const [checkedIdentifier, setcheckedIdentifier] = useState(checkedObj.identifier);

  const radioChange = (identifier) => {
    if (identifier === checkedIdentifier) {
      return;
    }

    const newSwitchObjArr: switchObjArrType = [
      { ...switchObjArr[0], checked: !switchObjArr[0].checked },
      { ...switchObjArr[1], checked: !switchObjArr[1].checked },
    ];

    const newCheckedIdentifier = newSwitchObjArr.find((item) => item.checked);

    setcheckedIdentifier(newCheckedIdentifier.identifier);

    switchSubscriber(newSwitchObjArr);
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

  const firstSwitchButtonRef = useRef<HTMLDivElement>(null);
  const secondSwitchButtonRef = useRef<HTMLDivElement>(null);

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
          {switchObjArr.map((switchItem, index) => {
            const formatedIdentifier = switchItem.identifier.replace(/\s/g, '').toLocaleLowerCase();
            return (
              <div
                ref={(index === 0) ? firstSwitchButtonRef : secondSwitchButtonRef}
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
          <div className="switch__selection" style={{ left: (switchObjArr[0].checked) ? '0' : `${firstSwitchButtonRef.current.clientWidth}px` }}>
            {checkedIdentifier}
          </div>
        </div>
      </div>
    </>
  );
};

export default SwitchComponent;
