import React from 'react';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';

const Delete = ({ onClick }) => {
  return (
    <Stack spacing={2} direction="row">
        <Button variant="contained" color="error" onClick={onClick} >Delete</Button>
    </Stack>
  );
};

export default Delete;
