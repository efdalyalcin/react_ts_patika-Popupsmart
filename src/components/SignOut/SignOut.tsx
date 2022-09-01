import React from 'react';
import Button from '@mui/material/Button';
import './SignOut.scss';

type Props = {
  handleSignIn: () => void;
};

const SignOut: React.FC<Props> = ({ handleSignIn }) => {
  const userName = localStorage.getItem("UserName");

  const handleSignOut = () => {
    localStorage.clear();
    handleSignIn();
  }

  return (
    <div className="SignOut">
      <span>{userName}</span>

      <Button 
        variant="outlined"
        type="button"
        color="error"
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </div>
  )
}

export default SignOut;
