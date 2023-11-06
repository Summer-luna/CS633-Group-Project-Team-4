import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { useEffect, useState } from 'react';
import { AttendanceDialog } from './attendanceDialog.jsx';
import { axiosInstance } from '../../../utils/axioInstance.js';
import { useParams } from 'react-router-dom';
import { useCourseDetail } from '../../../hooks/useCourseDetail.jsx';

export const CourseDetail = () => {
  const [open, setOpen] = useState(false);
  const { courseId } = useParams();
  const { course } = useCourseDetail(courseId);
  const [professor, setProfessor] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (Object.keys(course).length !== 0 && course.constructor === Object) {
      setProfessor(course.User[0].User);
    }
  }, [course]);

  return (
    <Stack sx={{ backgroundColor: 'white', padding: 10, borderRadius: 2 }}>
      <Stack gap={2} minHeight="300px">
        <Stack direction="row" gap={1}>
          <Typography color="#265792">Course Name:</Typography>
          <Typography>{course.name}</Typography>
        </Stack>
        <Stack direction="row" gap={1}>
          <Typography color="#265792">Instructor:</Typography>
          <Typography>{`${professor.firstName} ${professor.lastName}`}</Typography>
        </Stack>
        <Stack direction="row" gap={1} alignItems="center">
          <Typography color="#265792">Email:</Typography>
          <Stack direction="row" gap={2} alignItems="center">
            <Typography>{professor.email}</Typography>
            <IconButton href={`mailto:${professor.email}`}>
              <EmailIcon />
            </IconButton>
          </Stack>
        </Stack>
        <Stack direction="row" gap={1}>
          <Typography color="#265792">Building:</Typography>
          <Typography>{course.location}</Typography>
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
