import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './SignIn.scss';

export default function SignIn() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem("User Name", userName);
    setUserName('');
    setPassword('');
  }

  return (
    <form className="SignIn" onSubmit={(event) => submitHandler(event)}>
      <TextField 
        label="User Name"
        variant="outlined" 
        value={userName}
        onChange={e => setUserName(e.target.value)}
        required
        autoComplete="username"
      />
      <TextField 
        type="password"
        label="Password"
        variant="outlined" 
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />
      <Button 
        variant="outlined"
        type="submit"
      >
        Sign In
      </Button>
    </form>
  )
}
