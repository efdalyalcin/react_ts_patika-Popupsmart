import './AddTodo.scss';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useState } from 'react';
import { createTodo } from '../../api/api';

type Props = {
  loadTodos: () => void;
};

export default function AddTodo({loadTodos}: Props) {
  const [newIsCompleted, setNewIsCompleted] = useState(false);
  const [newContent, setNewContent] = useState('');

  const contentLengthCheck = () => (
    newContent.length >= 3 
      ? 'success'
      : 'error'
  );

  const handleAddTodo = async () => {
    if (newContent.length >= 3) {
      const newTodo: Todo = {id: Date.now(), content: newContent, isCompleted: newIsCompleted}
    
      await createTodo(newTodo);
      setNewContent('');
      setNewIsCompleted(false);
      await loadTodos();
    }
  };

  return (
    <div className="AddTodo">
      <TextField 
        id="outlined-basic"
        label="Todo content"
        variant="outlined"
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        required
      />

      <FormControlLabel 
          control={
            <Checkbox checked={newIsCompleted} 
              onChange={(e) => setNewIsCompleted(e.target.checked)} 
            />
          } 
          label="Is todo completed?" 
        />

      <Button 
        variant='outlined'
        color={contentLengthCheck()}
        onClick={handleAddTodo}
      >
        Add Todo
      </Button>
    </div>
  )
}
