import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { axiosInstance } from '../../../utils/axioInstance.js';
import { useAuth } from '../../../context/auth.context.jsx';

export const AttendanceDialog = ({ open, onClose, takeAttendanceData, setIsFind, setAttendanceType }) => {
  const { token } = useAuth();
  const handleEnter = () => {
    const takeAttendance = async () => {
      const res = await axiosInstance.post(
        '/student/takeAttendance',
        {
          ...takeAttendanceData
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data) {
        setIsFind(true);
        setAttendanceType(res.data.attendanceType);
      }
    };

    if (takeAttendanceData.attendanceCode && takeAttendanceData.classId && takeAttendanceData.userId) {
      takeAttendance();
      onClose();
    }
  };
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Enter the Attendance Code</DialogTitle>
      <DialogContent>
        <TextField label="Attendance Code" sx={{ marginTop: 2 }} type="number" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEnter} variant="contained">
          Enter
        </Button>
        <Button onClick={onClose} variant="contained" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
