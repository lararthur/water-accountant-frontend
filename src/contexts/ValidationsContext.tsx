import React, { ReactNode, createContext, useState } from 'react';

interface ValidationsProviderProps {
  children: ReactNode;
}

interface defaultObjProperties {
  isValid: boolean | null;
  message: string | null;
}

interface ValidationsContextData {
  emailObj: defaultObjProperties;
  passwordObj: defaultObjProperties;
  confirmPasswordObj: defaultObjProperties;
  nameObj: defaultObjProperties;
  weightObj: defaultObjProperties;
  measureObj: defaultObjProperties;
  validateEmail: (email) => void;
  validatePassword: (password) => void;
  validateName: (name) => void;
  validateWeight: (weight) => void;
  validatePasswordEquality: (password, confirmPassword) => void;
  validateMeasure: (measure) => void;
  resetValidations: () => void;
  setCustomErrorMessage: (name: string, message: string) => void;
}

export const ValidationsContext = createContext({} as ValidationsContextData);

export function ValidationsProvider({ children }: ValidationsProviderProps): JSX.Element {
  const defaultObj: defaultObjProperties = { isValid: null, message: null };

  const [emailObj, setEmailObj] = useState(defaultObj);
  const [passwordObj, setPasswordObj] = useState(defaultObj);
  const [confirmPasswordObj, setConfirmPasswordObj] = useState(defaultObj);
  const [nameObj, setNameObj] = useState(defaultObj);
  const [weightObj, setWeightObj] = useState(defaultObj);
  const [measureObj, setMeasureObj] = useState(defaultObj);

  const resetValidations = () => {
    setEmailObj(defaultObj);
    setPasswordObj(defaultObj);
    setConfirmPasswordObj(defaultObj);
    setNameObj(defaultObj);
    setWeightObj(defaultObj);
  };

  const setCustomErrorMessage = (name, message) => {
    if (name === 'email') setEmailObj({ isValid: false, message });
    if (name === 'password') setPasswordObj({ isValid: false, message });
    if (name === 'confirmPassword') setConfirmPasswordObj({ isValid: false, message });
    if (name === 'name') setNameObj({ isValid: false, message });
    if (name === 'weight') setWeightObj({ isValid: false, message });
  };

  const validateEmail = (email) => {
    if (!email) {
      const newEmailObj = {
        isValid: false,
        message: 'No e-mail was provided',
      };
      setEmailObj(newEmailObj);
      return;
    }

    if (typeof email !== 'string') {
      const newEmailObj = {
        isValid: false,
        message: 'No e-mail was provided',
      };
      setEmailObj(newEmailObj);
      return;
    }

    const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailIsValid = emailRegexp.test(email);

    if (!emailIsValid) {
      const newEmailObj = {
        isValid: false,
        message: 'Invalid user e-mail',
      };
      setEmailObj(newEmailObj);
      return;
    }

    setEmailObj({ isValid: true, message: null });
  };

  const validatePassword = (password) => {
    if (!password) {
      const newPasswordObj = {
        isValid: false,
        message: 'No password was provided',
      };
      setPasswordObj(newPasswordObj);
      return;
    }

    if (typeof password !== 'string') {
      const newPasswordObj = {
        isValid: false,
        message: 'Password must be a string',
      };
      setPasswordObj(newPasswordObj);
      return;
    }

    // Strong password strength:
    /*
    ^ ----------------------- Start anchor
    (?=.*[A-Z].*[A-Z]) ------ Ensure string has at least two uppercase letters.
    (?=.*[!@#$&*]) ---------- Ensure string has at least one special case letter.
    (?=.*[0-9].*[0-9]) ------ Ensure string has at least two digits.
    (?=.*[a-z].*[a-z]) ------ Ensure string has at least two lowercase letters.
    .{8,} ------------------- Ensure string has at least a length of 8...
                              ...(to complete 8, the password must have at least...
                              ...one type opf character with more than 2 occurrences).
    $ ----------------------- End anchor.
    */
    const strongPassRegexp = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z]).{8,}$/;
    const passIsStrong = strongPassRegexp.test(password);

    if (passIsStrong) {
      setPasswordObj({ isValid: true, message: null });
      return;
    }

    // Medium password strength:
    /*
    ^ ----------------------- Start anchor
    (?=.*[A-Z]) ------------- Ensure string has at least one uppercase letters.
    (?=.*[!@#$&*]) ---------- Ensure string has at least one special case letter.
    (?=.*[0-9]) ------------- Ensure string has at least one digit.
    (?=.*[a-z]) ------------- Ensure string has at least one lowercase letters.
    .{8,} ------------------- Ensure string  at least a length of 8.
    $ ----------------------- End anchor.
    */
    const mediumPassRegexp = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    const passIsMedium = mediumPassRegexp.test(password);

    if (passIsMedium) {
      setPasswordObj({ isValid: true, message: null });
      return;
    }

    const newPasswordObj = {
      isValid: false,
      message: 'Weak user password. A Password must have 8 characters length, at least one uppercase letter, one lowercase letter, one number and one special case letter',
    };
    setPasswordObj(newPasswordObj);
  };

  const validatePasswordEquality = (password, confirmPassword) => {
    if (!confirmPassword) {
      const newConfirmPasswordObj = {
        isValid: false,
        message: 'Confirm password is empty',
      };
      setConfirmPasswordObj(newConfirmPasswordObj);
      return;
    }

    if (password !== confirmPassword) {
      const newConfirmPasswordObj = {
        isValid: false,
        message: 'Password and Confirm Password fields must be the same',
      };
      setConfirmPasswordObj(newConfirmPasswordObj);
      return;
    }

    setConfirmPasswordObj({ isValid: true, message: null });
  };

  const validateName = async (name) => {
    if (!name) {
      const newNameObj = {
        isValid: false,
        message: 'No name was provided',
      };
      setNameObj(newNameObj);
      return;
    }

    if (typeof name !== 'string') {
      const newNameObj = {
        isValid: false,
        message: 'Name must be a string',
      };
      setNameObj(newNameObj);
      return;
    }

    const strName = name.replace(/\s\s+/g, '').trim();
    const namingPattern = /^[A-Za-z ,.'-]+$/;

    if (namingPattern.test(strName)) {
      setNameObj({ isValid: true, message: null });
      return;
    }

    setNameObj({ isValid: false, message: 'Invalid user name' });
  };

  const validateMeasure = (measure) => {
    if (!measure) {
      const newMeasureObj = {
        isValid: false,
        message: 'No measure was provided',
      };
      setMeasureObj(newMeasureObj);
      return;
    }

    if (typeof measure !== 'number') {
      const newMeasureObj = {
        isValid: false,
        message: 'Measure must be a number',
      };
      setMeasureObj(newMeasureObj);
      return;
    }

    if (measure <= 0) {
      const newMeasureObj = {
        isValid: false,
        message: 'Invalid measure',
      };
      setMeasureObj(newMeasureObj);
      return;
    }

    setMeasureObj({ isValid: true, message: null });
  };

  const validateWeight = (weight) => {
    if (!weight) {
      const newWeightObj = {
        isValid: false,
        message: 'No weight was provided',
      };
      setWeightObj(newWeightObj);
      return;
    }

    if (typeof weight !== 'number') {
      const newWeightObj = {
        isValid: false,
        message: 'Weight must be a number',
      };
      setWeightObj(newWeightObj);
      return;
    }

    if (weight <= 0 || weight > 500) {
      const newWeightObj = {
        isValid: false,
        message: 'Invalid weight',
      };
      setWeightObj(newWeightObj);
      return;
    }

    setWeightObj({ isValid: true, message: null });
  };

  return (
    <ValidationsContext.Provider value={{
      emailObj,
      passwordObj,
      confirmPasswordObj,
      nameObj,
      weightObj,
      measureObj,
      validateEmail,
      validatePassword,
      validateName,
      validateWeight,
      validatePasswordEquality,
      validateMeasure,
      resetValidations,
      setCustomErrorMessage,
    }}
    >
      {children}
    </ValidationsContext.Provider>
  );
}
