import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

export const AddCourseDialogStudent = (props) => {
  const { open, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    event.preventDefault();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth component="form" onSubmit={handleSubmit}>
      <DialogTitle
        variant="h4"
        sx={{
          color: '#265792',
          mb: 2
        }}
      >
        Add Course
      </DialogTitle>

      <DialogContent sx={{ pt: 5 }}>
        <TextField name="joinCode" required fullWidth id="joinCode" label="Enter Join Code" autoFocus sx={{ mt: 3 }} />
      </DialogContent>

      <DialogActions>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, background: '#265792', fontWeight: 'bold' }}>
          Add Class
        </Button>
      </DialogActions>
    </Dialog>
  );
};
