import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './SignIn.scss';

type Props = {
  handleSignIn: () => void;
};

const SignIn: React.FC<Props> = ({handleSignIn}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const userNameLengthCheck = () => (
    userName.length >= 3 
      ? 'success'
      : 'error'
  );

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (userName.length >= 3) {
      localStorage.setItem("UserName", userName);
  
      handleSignIn();
      setUserName('');
      setPassword('');

    }
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
        color={userNameLengthCheck()}
      >
        Sign In
      </Button>
    </form>
  )
}

export default SignIn;
