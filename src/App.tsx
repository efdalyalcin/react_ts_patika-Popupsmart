import { useCallback, useEffect, useState } from 'react';
import { getTodos } from './api/getTodos';
import './App.scss';
import SignIn from './SignIn/SignIn';

function App() {
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
      <SignIn />

      {todos.map(todo => (
        <div>
          {todo.content}
        </div>
      ))}
    </div>
  );
}

export default App;
