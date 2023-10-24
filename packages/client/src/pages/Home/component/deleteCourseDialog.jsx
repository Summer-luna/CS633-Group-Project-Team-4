import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import * as React from 'react';

export const DeleteCourseDialog = (props) => {
  const { onClose, open } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="deleteCourseDialogTitle">{'Are you sure to delete this course permanently?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">This action can not be undone. You can use the Add Course Button to add this course again.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{
            background: '#bc3c3c',
            color: 'white',
            fontWeight: 'bold'
          }}
          onClick={onClose}
        >
          Delete
        </Button>

        <Button
          variant="contained"
          sx={{
            background: '#265792',
            color: 'white',
            fontWeight: 'bold'
          }}
          onClick={onClose}
          autoFocus
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
