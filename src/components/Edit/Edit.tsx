import ReactDom from 'react-dom';
import { useEffect, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';

import { 
  FormControlLabel,
  FormGroup,
  Checkbox,
  TextField, 
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
  const [clickCount, setClickCount] = useState(0);

  const countClick = () => {
    setClickCount(() => clickCount + 1)
  };

  const ref = useDetectClickOutside(
    { 
      onTriggered: () => {
        countClick();

        if (clickCount > 0) {
          closeModal();
          setClickCount(0);
        }
      },
      triggerKeys: ['Enter', 'Tab'] 
    }
  );

  const submitTodo = async () => {
    if (newContent) {
      const newTodo: Todo = {
        content: newContent, 
        isCompleted: newIsCompleted, 
        id: todoId,
      } 
  
      await updateTodo(todoId, newTodo);
      closeModal();
      setClickCount(0);
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
      <FormGroup
        sx={{width: '400px',
          bgcolor: 'white',
          padding: '20px',
        }}
        ref={ref}
      >
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
            variant="contained"
            type="submit"
            color="success"
            onClick={submitTodo}
          >
            Update Todo
          </Button>
          <Button 
            variant="contained"
            type="button"
            color="error"
            onClick={() => {closeModal(); setClickCount(0)}}
          >
            <CloseIcon />
          </Button>
        </div>
      </FormGroup>
    </div>,
    document.getElementById('modal')!
  );
}
