import { useCallback, useEffect, useState } from 'react';
import { deleteTodo, getTodos } from '../../api/api';
import { Card, CardActions, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Todos.scss';
import Edit from '../Edit/Edit';

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

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    await loadTodos();
  }

  return (
    <div className="Todos">
      {todos.map(todo => (
        <Card 
          variant="outlined"
          key={todo.id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

          }}
        >
          <p>{todo.content}</p>
          <p>
            {todo.isCompleted
              ? 'Todo is completed'
              : 'Todo is not completed'
            }
          </p>
          <CardActions>
            <Button
              onClick={handleEdit}
              variant="outlined"
            >
              <EditIcon />
            </Button>
            <Button 
              onClick={() => handleDelete(todo.id)}
              variant="outlined"
            >
              <DeleteIcon />
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  )
}
