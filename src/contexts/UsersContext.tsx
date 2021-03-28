import React, {
  ReactNode,
  createContext,
  useState,
  useContext,
} from 'react';
import Cookies from 'js-cookie';
import { LoggedUserContext } from './LoggedUserContext';
import { ValidationsContext } from './ValidationsContext';

interface UserParams {
  email: string;
  password: string;
}

interface User {
  email: string;
  password: string;
  name: string | null,
  weight: number | null,
  weightMeasureUnit: 'kg' | 'lb' | null,
  language: 'pt-BR' | 'en-US' | null,
}

interface UsersContextData {
  users: User[];
  registerUser: (param: UserParams) => void;
  loginUser: (param: UserParams) => void;
}

interface UsersProviderProps {
  children: ReactNode;
}

export const UsersContext = createContext({} as UsersContextData);

export function UsersProvider({ children }: UsersProviderProps): JSX.Element {
  const usersSaved = Cookies.get('WaterAccountantUsers');
  const defaultUsers = usersSaved ? JSON.parse(usersSaved) : [];

  const [users, setUsers] = useState(defaultUsers);

  const { login } = useContext(LoggedUserContext);
  const { setCustomErrorMessage } = useContext(ValidationsContext);

  const getUser = (email) => users.find((user) => user.email === email);

  const registerUser = ({ email, password }) => {
    // validate if email already exists
    const userExists = getUser(email);
    if (userExists) {
      setCustomErrorMessage('email', 'E-mail already registered');
      return;
    }

    // add user
    const newUser = {
      email,
      password,
      name: null,
      weight: null,
      weightMeasureUnit: null,
      language: null,
    };

    const newUsers = [...users, newUser];

    setUsers(newUsers);
    Cookies.set('WaterAccountantUsers', JSON.stringify(newUsers));

    login(newUser);
  };

  const loginUser = ({ email, password }) => {
    const userExists = getUser(email);
    if (!userExists) {
      setCustomErrorMessage('email', 'E-mail not registered');
      return;
    }
    if (password !== userExists.password) {
      setCustomErrorMessage('password', 'Incorrect password');
      return;
    }

    login(userExists);
  };

  return (
    <UsersContext.Provider value={{
      users,
      registerUser,
      loginUser,
    }}
    >
      {children}
    </UsersContext.Provider>
  );
}
