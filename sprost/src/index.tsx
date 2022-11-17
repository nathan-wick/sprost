import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Firebase from './components/Firebase';
import Authentication, { AuthenticationContext } from './components/Authentication';
import Database, { DatabaseContext } from './components/Database';
import { Auth, onAuthStateChanged, User as AuthUser } from 'firebase/auth';
import Navigation from './components/sprost/Navigation';
import Landing from './components/sprost/views/Landing';
import { doc, Firestore, setDoc } from 'firebase/firestore';
import { User } from './types/User';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Initial = () => {
  const authentication = useContext(AuthenticationContext);
  const database = useContext(DatabaseContext);
  const [ user, setUser ] = useState<AuthUser | null>(null);
  const [ initialView, setInitialView ] = useState<JSX.Element>(<Landing />);

  onAuthStateChanged(authentication as Auth, (user) => {
    setUser(user);
  });

  const UpdateUser = async (user: AuthUser) => {
    const initialUserData: Partial<User> = {
      id: user.uid,
      name: user.displayName,
      email: user.email,
      portrait: user.photoURL,
    };
    const userReference = doc(database as Firestore, "users", user.uid);
    await setDoc(userReference, initialUserData, { merge: true });
    console.log(`Updated User`, initialUserData);
  }

  useEffect(() => {
    if (user) {
      UpdateUser(user);
      setInitialView(<Navigation />);
    } else {
      setInitialView(<Landing />);
    }
  }, [ user ]);

  return initialView;
}

root.render(
  <React.StrictMode>
    <div className="App">
      <Firebase>
        <Database>
          <Authentication>
            <Initial />
          </Authentication>
        </Database>
      </Firebase>
    </div>
  </React.StrictMode>
);