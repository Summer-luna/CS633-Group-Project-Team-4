import { Button, Stack, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { Paths } from '../../../constants/Paths.js';
import { AttendanceDialog } from './attendanceDialog.jsx';
import { useState } from 'react';

export const PresentSlides = () => {
  const { course } = useLocation().state;
  const { name, id, joinCode } = course;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [finished, setFinished] = useState(true);

  const handleAttendanceDialogOpen = () => {
    if (finished) {
      console.log('This is finished');
      setDialogOpen(true);
    } else {
      console.log('This is not finished');
      setDialogOpen(true);
    }
  };

  const handleAttendanceDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ height: '80vh' }}>
      <Stack gap={1}>
        <Typography variant="body1">{name}</Typography>
        <Stack direction="row" gap={3} alignItems="center">
          <Typography variant="h2" sx={{ fontWeight: 'bolder', color: '#24444F' }}>
            Join Code:
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 'bolder', color: '#265792' }}>
            {joinCode}
          </Typography>
        </Stack>
        <Typography variant="body1">Students can enter this join code to participate.</Typography>
      </Stack>
      <Stack minWidth="50%" gap={3}>
        <Button variant="contained" sx={{ maxWidth: '300px' }} onClick={handleAttendanceDialogOpen}>
          Take Attendance
        </Button>
        <AttendanceDialog open={dialogOpen} onClose={handleAttendanceDialogClose} setFinished={setFinished} />
        <Link to={`${Paths.COURSE}/${id}`} state={{ name }} style={{ maxWidth: '300px' }}>
          <Button variant="contained" sx={{ backgroundColor: '#24444F' }} fullWidth>
            Cancel Presentation
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
};
