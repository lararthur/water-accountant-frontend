import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';

export const UsersContext = createContext({});

export function UsersProvider({ children }) {
  /* const defaultUsers = [
    {
      email: 'arthur.lara.negocios.01@gmail.com',
      password: '1597535',
      name: 'Arthur Lara',
      weight: 110,
      weightMeasureUnit: 'kg',
      language: 'pt-BR',
    },
  ]; */
  const usersSaved = Cookies.get('WaterAccountantUsers');
  const defaultUsers = usersSaved ? JSON.parse(usersSaved) : [];

  const [users, setUsers] = useState(defaultUsers);

  console.log('users', users);

  const registerUser = ({ email, password }) => {
    // validate if email already exists
    const userExists = users.find((user) => user.email === email);
    if (userExists) {
      console.log('user already registered');
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
  };

  return (
    <UsersContext.Provider value={{
      users,
      registerUser,
    }}
    >
      {children}
    </UsersContext.Provider>
  );
}
