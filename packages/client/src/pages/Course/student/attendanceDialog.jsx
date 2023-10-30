import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

export const AttendanceDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Enter the Attendance Code</DialogTitle>
      <DialogContent>
        <TextField label="Attendance Code" sx={{ marginTop: 2 }} type="number" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Enter
        </Button>
        <Button onClick={onClose} variant="contained" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
