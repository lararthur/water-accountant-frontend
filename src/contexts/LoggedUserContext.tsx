import React, {
  ReactNode, createContext, useState,
} from 'react';
import Cookies from 'js-cookie';

interface Recipient {
  id: number | null;
  name: string;
  measure: number;
  type: 'glass' | 'bottle';
}

interface DailyProgress {
  necessary: number | null;
  drank: number | null;
  date: Date;
}

interface User {
  email: string;
  password: string;
  name: string | null;
  weight: number | null;
  weightMeasureUnit: 'kg' | 'lb' | null;
  recipients: Recipient[] | null;
  dailyProgress: DailyProgress | null;
}

interface LoggedUserContextData {
  loggedUser: User | null;
  login: (user) => void;
  logout: () => void;
  isLogged: boolean;
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
  const [isLogged, setIsLogged] = useState(false);

  const login = (user) => {
    Cookies.set('LoggedUser', JSON.stringify(user));
    setIsLogged(true);
    setLoggedUser(user);
  };

  const logout = () => {
    Cookies.remove('LoggedUser');
    setIsLogged(false);
    setLoggedUser(null);
  };

  return (
    <LoggedUserContext.Provider value={{
      loggedUser,
      login,
      logout,
      isLogged,
    }}
    >
      {children}
    </LoggedUserContext.Provider>
  );
}
