import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { LoggedUserContext } from '../contexts/LoggedUserContext';

export default function WaterAccountant(): JSX.Element {
  const router = useRouter();

  const { loggedUser, logout } = useContext(LoggedUserContext);

  if (process.browser && !loggedUser) {
    router.push('/');
  }

  if (process.browser && loggedUser && !loggedUser.name) {
    router.push('/basic-info');
  }

  return (
    <button type="button" onClick={logout}>Logout</button>
  );
}
