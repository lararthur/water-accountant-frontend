import React, {
  ReactNode, createContext, useState, useContext,
} from 'react';
import Cookies from 'js-cookie';
import {
  differenceInDays, getDate, getMonth, getYear,
} from 'date-fns';
import { UsersContext } from './UsersContext';

interface Recipient {
  id: number | null;
  name: string;
  measure: number;
  type: 'glass' | 'bottle';
}

interface User {
  email: string;
  password: string;
  name: string | null;
  weight: number | null;
  weightMeasureUnit: 'kg' | 'lb' | null;
  recipients: Recipient[] | null;
}

interface LoggedUserContextData {
  loggedUser: User | null;
  login: (user) => void;
  logout: () => void;
}

interface LoggedUserProvider {
  children: ReactNode;
}

export const LoggedUserContext = createContext({} as LoggedUserContextData);

export function LoggedUserProvider({ children }: LoggedUserProvider): JSX.Element {
  const loggedUserExists = Cookies.get('LoggedUser');
  const loggedUserFormated = loggedUserExists ? JSON.parse(loggedUserExists) : null;

  /*
  @TODO:
  -> fix the Warning: Text content did not match. Server: " null" Client: " Name".
  -> maybe when chaged to some real DB, the these Cookies problems will stop
  */
  const [loggedUser, setLoggedUser] = useState(loggedUserFormated || null);

  const { resetDailyProgress } = useContext(UsersContext);

  // the code below verifies if it is a different day...
  // ...if it is, the data of water drank will reset.
  if (loggedUser) {
    const lastDate = new Date(loggedUser.dailyProgress.date);
    const currentDate = new Date();

    const lastDateObj = {
      day: getDate(lastDate),
      month: getMonth(lastDate),
      year: getYear(lastDate),
    };
    const currentDateObj = {
      day: getDate(currentDate),
      month: getMonth(currentDate),
      year: getYear(currentDate),
    };

    const difference = differenceInDays(
      new Date(lastDateObj.year, lastDateObj.month, lastDateObj.day),
      new Date(currentDateObj.year, currentDateObj.month, currentDateObj.day),
    );

    if (difference !== 0) {
      resetDailyProgress(loggedUser.email);
    }
  }

  const login = (user) => {
    Cookies.set('LoggedUser', JSON.stringify(user));
    setLoggedUser(user);
  };

  const logout = () => {
    Cookies.remove('LoggedUser');
    setLoggedUser(null);
  };

  return (
    <LoggedUserContext.Provider value={{
      loggedUser,
      login,
      logout,
    }}
    >
      {children}
    </LoggedUserContext.Provider>
  );
}
