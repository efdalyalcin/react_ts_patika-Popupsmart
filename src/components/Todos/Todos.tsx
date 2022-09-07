import { useCallback, useEffect, useState } from 'react';
import { deleteTodo, getTodos } from '../../api/api';
import './Todos.scss';
import Todo from '../Todo/Todo';

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const loadTodos = useCallback(
    async () => {
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch {
        setTodos([]);
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
    <ul className="Todos">
      {todos.map(todo => (
        <li key={todo.id}>
          <Todo todo={todo} loadTodos={loadTodos} />
        </li>
      ))}
    </ul>
  )
}
