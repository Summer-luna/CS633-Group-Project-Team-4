import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { axiosInstance } from '../../../utils/axioInstance.js';
import { useAuth } from '../../../context/auth.context.jsx';

export const AddStudentCourseDialog = ({ open, onClose, addCourse }) => {
  const { token, decoded_token } = useAuth();

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const res = await axiosInstance.post(
      '/student/enroll',
      { joinCode: data.get('joinCode'), studentId: decoded_token.id },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (res.data) {
      addCourse(res.data);
      handleClose();
    }
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
