import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { LoggedUserContext } from '../contexts/LoggedUserContext';

export default function WaterAccountant(): JSX.Element {
  const router = useRouter();

  const { loggedUser } = useContext(LoggedUserContext);

  if (process.browser && !loggedUser) {
    router.push('/');
  }

  return (
    <h1>Water Accountant</h1>
  );
}
