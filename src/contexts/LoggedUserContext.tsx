import React, { ReactNode, createContext, useState } from 'react';

interface User {
  email: string;
  password: string;
  name: string | null,
  weight: number | null,
  weightMeasureUnit: 'kg' | 'lb' | null,
  language: 'pt-BR' | 'en-US' | null,
}

interface LoggedUserContextData {
  LoggedUser: User | null;
  login: (user) => void;
  logout: () => void;
}

interface LoggedUserProvider {
  children: ReactNode;
}

export const LoggedUserContext = createContext({} as LoggedUserContextData);

export function LoggedUserProvider({ children }: LoggedUserProvider): JSX.Element {
  const [LoggedUser, setLoggedUser] = useState(null);

  const login = (user) => {
    setLoggedUser(user);
  };

  const logout = () => {
    setLoggedUser(null);
  };

  return (
    <LoggedUserContext.Provider value={{
      LoggedUser,
      login,
      logout,
    }}
    >
      {children}
    </LoggedUserContext.Provider>
  );
}
