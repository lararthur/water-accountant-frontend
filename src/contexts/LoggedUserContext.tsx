import React, { ReactNode, createContext, useState } from 'react';
import Cookies from 'js-cookie';

interface User {
  email: string;
  password: string;
  name: string | null,
  weight: number | null,
  weightMeasureUnit: 'kg' | 'lb' | null,
  language: 'pt-BR' | 'en-US' | null,
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
