import { Button, Stack, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { Paths } from '../../../constants/Paths.js';
import { AttendanceDialog } from './attendanceDialog.jsx';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../../utils/axioInstance.js';
import { useAuth } from '../../../context/auth.context.jsx';
import { useAttendance } from '../../../context/attendance.context.jsx';
import randomatic from 'randomatic';

export const PresentSlides = () => {
  const { course } = useLocation().state;
  const { name, id, joinCode } = course;
  const [dialogOpen, setDialogOpen] = useState(false);
  const { finished, setFinished, endAttendance, attendanceCode, setAttendanceCode } = useAttendance();
  const { token } = useAuth();

  const handleAttendanceDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleAttendanceDialogClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    const updateAttendanceCode = async () => {
      await axiosInstance.put(
        `instructor/attendance/update`,
        {
          classId: id,
          attendanceCode: attendanceCode
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    };

    if (token) {
      updateAttendanceCode();
    }
  }, [attendanceCode]);

  // generate attendance code when dialog opens and attendance is finished
  useEffect(() => {
    if (finished && dialogOpen) {
      setAttendanceCode(randomatic('0', 4));
    }
  }, [finished, dialogOpen]);

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
      <Stack minWidth="40%" gap={3}>
        <Button variant="contained" sx={{ maxWidth: '300px' }} onClick={handleAttendanceDialogOpen}>
          Take Attendance
        </Button>
        <Link to={`${Paths.COURSE}/${id}`} state={{ courseName: name }} style={{ maxWidth: '300px' }}>
          <Button variant="contained" sx={{ backgroundColor: '#24444F' }} fullWidth>
            Cancel Presentation
          </Button>
        </Link>
      </Stack>
      <AttendanceDialog
        open={dialogOpen}
        onClose={handleAttendanceDialogClose}
        finished={finished}
        setFinished={setFinished}
        attendanceCode={attendanceCode}
        endAttendance={endAttendance}
        joinCode={joinCode}
        courseId={id}
      />
    </Stack>
  );
};
