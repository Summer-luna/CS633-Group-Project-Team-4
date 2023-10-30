import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from 'react';
import { AttendanceDialog } from './attendanceDialog.jsx';

export const CourseDetail = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack sx={{ backgroundColor: 'white', padding: 10, borderRadius: 2 }}>
      <Stack gap={2} minHeight="300px">
        <Stack direction="row" gap={1}>
          <Typography color="#265792">Course Name:</Typography>
          <Typography>CS222 Discrete Mathematics</Typography>
        </Stack>
        <Stack direction="row" gap={1}>
          <Typography color="#265792">Instructor:</Typography>
          <Typography>Teresa Miller</Typography>
        </Stack>
        <Stack direction="row" gap={1} alignItems="center">
          <Typography color="#265792">Email:</Typography>
          <Stack direction="row" gap={2} alignItems="center">
            <Typography>elentukh@bu.edu</Typography>
            <IconButton href={`mailto:test@example.com`}>
              <EmailIcon />
            </IconButton>
          </Stack>
        </Stack>
        <Stack direction="row" gap={1}>
          <Typography color="#265792">Building:</Typography>
          <Typography>Science & Engineering Room 304</Typography>
        </Stack>
      </Stack>
      <Box>
        <Button variant="contained" onClick={handleClickOpen}>
          Take Attendance
        </Button>
        <AttendanceDialog open={open} onClose={handleClose} />
      </Box>
    </Stack>
  );
};
