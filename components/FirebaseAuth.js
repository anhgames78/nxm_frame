import React from 'react';
import { UserAuth } from '../src/data';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from '../utils/auth/initFirebase'
import { setUserCookie } from '../utils/auth/userCookies'
import { mapUserData } from '../utils/auth/mapUserData'

// Init the Firebase app.
initFirebase()

const firebaseAuthConfig = {
  signInFlow: 'popup',
  // Auth providers
  // https://github.com/firebase/firebaseui-web#configure-oauth-providers
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  signInSuccessUrl: '/',
  credentialHelper: 'none',
  callbacks: {
    signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
      const userData = await mapUserData(user)
      setUserCookie(userData)
      setAuth(true)
    },
  },
}

const FirebaseAuth = () => {
  const [auth, setAuth] = React.useContext(UserAuth);
  return (
    <div>
      <StyledFirebaseAuth
        uiConfig={firebaseAuthConfig}
        firebaseAuth={firebase.auth()}
      />
    </div>
  )
}

export default FirebaseAuth