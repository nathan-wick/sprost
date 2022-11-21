import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Firebase from './components/Firebase';
import Authentication from './components/Authentication';
import Database from './components/Database';
import User, { UserContext } from './components/User';
import Navigation from './components/sprost/Navigation';
import Landing from './components/sprost/views/Landing';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Initial = () => {
  const user = useContext(UserContext);
  const initialView = user ? <Navigation /> : <Landing />;
  
  return <div
    className={user?.theme.name === `dark` ?  `bg-dark text-light` : `bg-light text-dark`}
    style={{ height: `100vh` }}>
    {initialView}
  </div>;
};


root.render(
  <React.StrictMode>
    <div className="App">
      <Firebase>
        <Database>
          <Authentication>
            <User>
              <Initial />
            </User>
          </Authentication>
        </Database>
      </Firebase>
    </div>
  </React.StrictMode>
);