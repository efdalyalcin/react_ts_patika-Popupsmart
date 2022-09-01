import { useCallback, useEffect, useState } from 'react';
import { getTodos } from '../../api/getTodos';
import { Card, CardActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEditOn, setIsEditOn] = useState(false);

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

  const handleEdit = () => {
    setIsEditOn(!isEditOn);
  };

  // handle delete with API
  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <div>
      {todos.map(todo => (
        <Card 
          variant="outlined"
          key={todo.id}
        >
          <p>{todo.content}</p>
          <p>
            {todo.isCompleted
              ? 'Todo is completed'
              : 'Todo is not completed'
            }
          </p>
          <CardActions>
            <button
              onClick={handleEdit}
            >
              <EditIcon />
            </button>
            <button onClick={() => handleDelete(todo.id)} >
              <DeleteIcon />
            </button>
          </CardActions>
        </Card>
      ))}
    </div>
  )
}
