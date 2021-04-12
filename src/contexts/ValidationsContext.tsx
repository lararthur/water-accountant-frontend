import React, { ReactNode, createContext, useState } from 'react';

interface ValidationsProviderProps {
  children: ReactNode;
}

interface ValidationsContextData {
  customValidations;
  validateEmail: (email) => void;
  validatePassword: (password) => void;
  validateName: (name) => void;
  validateWeight: (weight) => void;
  validatePasswordEquality: (password, confirmPassword) => void;
  validateMeasure: (measure) => void;
  resetCustomValidations: () => void;
  setCustomErrorMessage: (name: string, message: string) => void;
}

export const ValidationsContext = createContext({} as ValidationsContextData);

export function ValidationsProvider({ children }: ValidationsProviderProps): JSX.Element {
  const [customValidations, setCustomValidations] = useState({});

  const resetCustomValidations = () => {
    setCustomValidations({});
  };

  const setCustomErrorMessage = (name, message) => {
    const newCustomValidations = {
      ...customValidations,
      [name]: message,
    };
    setCustomValidations(newCustomValidations);
  };

  const validateEmail = (email) => {
    if (!email) {
      return 'No e-mail was provided';
    }

    if (typeof email !== 'string') {
      return 'E-mail must be a string';
    }

    const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailIsValid = emailRegexp.test(email);

    if (!emailIsValid) {
      return 'Invalid user e-mail';
    }

    return false;
  };

  const validatePassword = (password) => {
    if (!password) {
      return 'No password was provided';
    }

    if (typeof password !== 'string') {
      return 'Password must be a string';
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
      return false;
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
      return false;
    }

    return 'Weak user password. A Password must have 8 characters length, at least one uppercase letter, one lowercase letter, one number and one special case letter';
  };

  const validatePasswordEquality = (password, confirmPassword) => {
    if (!confirmPassword) {
      return 'Confirm password is empty';
    }

    if (password !== confirmPassword) {
      return 'Password and Confirm Password fields must be the same';
    }

    return false;
  };

  const validateName = (name) => {
    if (!name) {
      return 'No name was provided';
    }

    if (typeof name !== 'string') {
      return 'Name must be a string';
    }

    const strName = name.replace(/\s\s+/g, '').trim();
    const namingPattern = /^[A-Za-z ,.'-]+$/;

    if (namingPattern.test(strName)) {
      return false;
    }

    return 'Invalid user name';
  };

  const validateMeasure = (measure) => {
    if (!measure) {
      return 'No measure was provided';
    }

    if (typeof measure !== 'number') {
      return 'Measure must be a number';
    }

    if (measure <= 0) {
      return 'Invalid measure';
    }

    return false;
  };

  const validateWeight = (weight) => {
    if (!weight) {
      return 'No weight was provided';
    }

    if (typeof weight !== 'number') {
      return 'Weight must be a number';
    }

    if (weight <= 0 || weight > 500) {
      return 'Invalid weight';
    }

    return false;
  };

  return (
    <ValidationsContext.Provider value={{
      validateEmail,
      validatePassword,
      validateName,
      validateWeight,
      validatePasswordEquality,
      validateMeasure,
      customValidations,
      resetCustomValidations,
      setCustomErrorMessage,
    }}
    >
      {children}
    </ValidationsContext.Provider>
  );
}
