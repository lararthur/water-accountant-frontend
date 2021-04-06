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
  language: 'pt-BR' | 'en-US' | null;
  recipients: Recipient[] | null;
}

interface UsersContextData {
  users: User[];
  registerUser: (param: UserParams) => void;
  loginUser: (param: UserParams) => void;
  submitBasicInfo: (obj) => void;
  addRecipient: (recipient: Recipient) => void;
}

interface UsersProviderProps {
  children: ReactNode;
}

export const UsersContext = createContext({} as UsersContextData);

export function UsersProvider({ children }: UsersProviderProps): JSX.Element {
  const usersSaved = Cookies.get('WaterAccountantUsers');
  const defaultUsers = usersSaved ? JSON.parse(usersSaved) : [];

  const [users, setUsers] = useState(defaultUsers);

  const { loggedUser, login } = useContext(LoggedUserContext);
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
      recipients: null,
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

  const submitBasicInfo = ({
    email, name, weight, weightMeasureUnit, language,
  }) => {
    const user = users.find((item) => item.email === email);
    const otherUsers = users.filter((item) => item.email !== email);

    const userWithBasicInfo = {
      ...user, name, weight, weightMeasureUnit, language,
    };

    const newUsers = [...otherUsers, userWithBasicInfo];

    setUsers(newUsers);
    Cookies.set('WaterAccountantUsers', JSON.stringify(newUsers));
    login(userWithBasicInfo);
  };

  const addRecipient = (recipient) => {
    const userRecipients = loggedUser.recipients || [];
    const newRecipient = recipient;

    if (userRecipients.length > 0) {
      newRecipient.id = userRecipients[userRecipients.length - 1].id + 1;
    } else {
      newRecipient.id = 1;
    }

    const userWithRecipient = {
      ...loggedUser,
      recipients: [...userRecipients, newRecipient],
    };

    const otherUsers = users.filter((item) => item.email !== loggedUser.email);
    const newUsers = [...otherUsers, userWithRecipient];

    setUsers(newUsers);
    Cookies.set('WaterAccountantUsers', JSON.stringify(newUsers));
    login(userWithRecipient);
  };

  return (
    <UsersContext.Provider value={{
      users,
      registerUser,
      loginUser,
      submitBasicInfo,
      addRecipient,
    }}
    >
      {children}
    </UsersContext.Provider>
  );
}
