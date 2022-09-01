import { useState } from 'react';
import './App.scss';
import SignIn from './components/SignIn/SignIn';
import SignOut from './components/SignOut/SignOut';
import Todos from './components/Todos/Todos';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    setIsSignedIn(!isSignedIn);
  };

  return (
    <div className="App">
      <nav>
        {isSignedIn 
          ? <SignOut handleSignIn={handleSignIn} />
          : <SignIn handleSignIn={handleSignIn} />
        }
      </nav>
      <main>
        <Todos />
      </main>
    </div>
  );
}

export default App;
