import React, { useEffect, useState } from 'react';
import { InitialStack, SignedInStack } from './Navigation';
import { getAuth } from 'firebase/auth';

const AuthNavigation = () => {
  const auth = getAuth();

  const [currentUser, setCurrentUser] = useState(null);

  const userHandler = (user) =>
    user ? setCurrentUser(user) : setCurrentUser(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => userHandler(user));
  }, []);

  return (
    <>
      {currentUser ? <SignedInStack /> : <InitialStack />}
    </>
  );
};

export default AuthNavigation;
