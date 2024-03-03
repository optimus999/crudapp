import React from 'react';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';

const Edit = ({ onClick }) => {
  return (
    <Stack spacing={2} direction="row">
        <Button variant="contained" color="warning" onClick={onClick}>Edit</Button>
    </Stack>
  );
};

export default Edit;
