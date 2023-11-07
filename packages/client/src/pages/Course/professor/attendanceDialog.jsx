import { Button, Dialog, DialogActions, DialogContent, Stack, Typography } from '@mui/material';

export const AttendanceDialog = ({ open, onClose, setFinished, attendanceCode, endAttendance, joinCode }) => {
  const handleFinish = () => {
    endAttendance();
    setFinished(true);
    onClose();
  };

  const handleMinimize = () => {
    setFinished(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent sx={{ marginY: 5 }}>
        <Stack gap={2} alignItems="center">
          <Typography variant="h5">Attendance Code:</Typography>

          <Typography
            variant="h1"
            sx={{
              color: '#265792',
              fontWeight: 'bold'
            }}
          >
            {attendanceCode}
          </Typography>

          <Typography variant="h6" sx={{ color: 'grey' }}>
            Enter the above code into the ClassGuardian now
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontWeight: 'bold'
            }}
          >
            Enter Join Code
          </Typography>

          <Typography
            variant="h4"
            sx={{
              color: '#265792',
              fontWeight: 'light'
            }}
          >
            {joinCode}
          </Typography>

          <Typography sx={{ color: 'grey' }}>to join this course.</Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleMinimize}
          variant="contained"
          sx={{
            background: '#265792',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          Minimize and keep open
        </Button>

        <Button
          variant="contained"
          sx={{
            background: '#265792',
            color: 'white',
            fontWeight: 'bold'
          }}
          onClick={handleFinish}
          autoFocus
        >
          Finish
        </Button>
      </DialogActions>
    </Dialog>
  );
};
