import ReactDom from 'react-dom';
import { 
  FormControlLabel,
  FormGroup,
  Checkbox,
  TextField, 
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { updateTodo } from '../../api/api';
import './Edit.scss';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  loadTodos: () => void;
  todoId: number;
  content: string;
  isCompleted: boolean;
}

export default function Edit({
  isOpen,
  closeModal,
  loadTodos,
  todoId,
  content,
  isCompleted,
}: Props) {
  const [newContent, setNewContent] = useState(content);
  const [newIsCompleted, setNewIsCompleted] = useState(isCompleted);

  const submitTodo = async () => {
    if (newContent) {
      const newTodo: Todo = {
        content: newContent, 
        isCompleted: newIsCompleted, 
        id: todoId,
      } 
  
      await updateTodo(todoId, newTodo);
      closeModal();
      await loadTodos();
    }
  };

  if (!isOpen) {
    return null;
  };

  return ReactDom.createPortal(
    <div
      className="Edit"
    >
      <FormGroup>
        <TextField
          id="outlined-name"
          label="Content"
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
        <div className="Edit__buttons">
          <Button 
            variant="outlined"
            type="submit"
            color="success"
            onClick={submitTodo}
          >
            Update Todo
          </Button>
          <Button 
            variant="outlined"
            type="button"
            color="error"
            onClick={closeModal}
          >
            <CloseIcon />
          </Button>
        </div>
      </FormGroup>
    </div>,
    document.getElementById('modal')!
  );
}
