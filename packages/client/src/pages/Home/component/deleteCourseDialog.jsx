import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { axiosInstance } from '../../../utils/axioInstance.js';
import { useAuth } from '../../../context/auth.context.jsx';

export const DeleteCourseDialog = ({ onClose, open, courseId, deleteCourse }) => {
  const { token, decoded_token } = useAuth();

  const handleDelete = async () => {
    const res = await axiosInstance.delete(`/instructor/course/delete`, {
      data: {
        courseId: courseId,
        userId: decoded_token.id
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.data) {
      deleteCourse(courseId);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="deleteCourseDialogTitle">{'Are you sure to delete this course permanently?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">This action can not be undone. You can use the Add Course Button to add this course again.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleDelete}
          variant="contained"
          sx={{
            background: '#bc3c3c',
            color: 'white',
            fontWeight: 'bold'
          }}
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
