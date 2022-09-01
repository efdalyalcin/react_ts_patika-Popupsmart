import { useCallback, useEffect, useState } from 'react';
import { getTodos } from './api/getTodos';
import './App.scss';
import SignIn from './components/SignIn/SignIn';
import SignOut from './components/SignOut/SignOut';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    setIsSignedIn(!isSignedIn);
  };

  const [todos, setTodos] = useState<Todo[]>([]);

  const loadTodos = useCallback(
    async () => {
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch {
        setTodos([]);
        // error is handled with a turnary in the render
      }
    },
    [],
  );

  useEffect(
    () => {
      loadTodos();
    },
    [loadTodos]
  );

  return (
    <div className="App">
      {isSignedIn 
        ? <SignOut handleSignIn={handleSignIn} />
        : <SignIn handleSignIn={handleSignIn} />
      }

      {todos.map(todo => (
        <div>
          {todo.content}
        </div>
      ))}
    </div>
  );
}

export default App;
