import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { useEffect, useState } from 'react';
import { AttendanceDialog } from './AttendanceDialog.jsx';
import { axiosInstance } from '../../../utils/axioInstance.js';
import { useParams } from 'react-router-dom';
import { useCourseDetail } from '../../../hooks/useCourseDetail.jsx';
import { useAuth } from '../../../context/auth.context.jsx';

export const CourseDetail = () => {
  const [open, setOpen] = useState(false);
  const [isFind, setIsFind] = useState(null);
  const { courseId } = useParams();
  const { course } = useCourseDetail(courseId);
  const [attendanceType, setAttendanceType] = useState(0);
  const [professor, setProfessor] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const { decoded_token, token } = useAuth();

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

  useEffect(() => {
    const checkAttendance = async () => {
      const isFind = await axiosInstance.post(
        '/student/checkAttendance',
        {
          classId: courseId,
          userId: decoded_token.id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (isFind) {
        setIsFind(isFind.data);
        setAttendanceType(isFind.data.attendanceType);
      }
    };

    if (decoded_token && token) {
      checkAttendance();
    }
  }, []);

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
      {isFind ? (
        <Typography>You have been marked {attendanceType ? 'absence' : 'present'}</Typography>
      ) : (
        <Box>
          {course.attendanceCode ? (
            <Box>
              <Button variant="contained" onClick={handleClickOpen}>
                Take Attendance
              </Button>
              <AttendanceDialog
                open={open}
                onClose={handleClose}
                setIsFind={setIsFind}
                takeAttendanceData={{ classId: courseId, userId: decoded_token.id, attendanceCode: course.attendanceCode }}
                setAttendanceType={setAttendanceType}
              />
            </Box>
          ) : (
            <Typography>Attendance is not available</Typography>
          )}
        </Box>
      )}
    </Stack>
  );
};
