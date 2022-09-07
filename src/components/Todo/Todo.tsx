import { Card, CardActions, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { deleteTodo } from '../../api/api';
import Edit from '../Edit/Edit';

type Props = {
  todo: Todo;
  loadTodos: () => void;
};

export default function Todo({todo, loadTodos}: Props) {
  const [isEditOn, setIsEditOn] = useState(false);

  const handleEdit = () => {
    setIsEditOn(!isEditOn);
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    await loadTodos();
  }
  
  return (
    <Card 
      variant="outlined"
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

      <Edit 
        isOpen={isEditOn}
        closeModal={handleEdit}
        loadTodos={loadTodos}
        todoId={todo.id}
        content={todo.content}
        isCompleted={todo.isCompleted}
      />
    </Card>
  )
}
