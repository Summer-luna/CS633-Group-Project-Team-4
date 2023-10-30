import { Button, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { StudentTable } from './studentTable.jsx';
import { Delete } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth.context.jsx';
import { useLocation, useParams } from 'react-router-dom';
import { axiosInstance } from '../../utils/axioInstance.js';
import { Paths } from '../../constants/Paths.js';
import { Link } from 'react-router-dom';

export const Students = () => {
  const { token } = useAuth();
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [course, setCourse] = useState({});
  const location = useLocation();
  const { courseName } = location.state;

  useEffect(() => {
    const getStudents = async () => {
      const res = await axiosInstance.get(`/instructor/course/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data) {
        const courses = res.data;
        const revisedCourses = courses.map((course) => {
          return { id: course.User.buID, name: `${course.User.firstName} ${course.User.lastName}`, email: course.User.email };
        });

        setStudents(revisedCourses);
      }
    };

    const getCourseDetail = async () => {
      const res = await axiosInstance.get(`user/course/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data) {
        setCourse(res.data);
      }
    };

    if (token) {
      getStudents();
      getCourseDetail();
    }
  }, [token]);

  const tableConfig = [
    {
      field: 'id',
      name: 'BU ID',
      render: (row) => row.id
    },
    {
      field: 'name',
      name: 'Student Name',
      render: (row) => row.name
    },
    {
      field: 'email',
      name: 'Email',
      render: (row) => row.email
    },
    {
      field: 'actions',
      name: 'Actions',
      render: () => (
        <Tooltip title="Delete">
          <IconButton>
            <Delete sx={{ color: '#265792' }} />
          </IconButton>
        </Tooltip>
      )
    }
  ];

  return (
    <Stack gap={4}>
      <Stack gap={2}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#265792' }}>
          {course.courseName || courseName}
        </Typography>
        <Typography variant="body1">Roster</Typography>
      </Stack>
      <StudentTable tableConfig={tableConfig} rows={students} />
      <Stack direction="row" gap={3} justifyContent="end">
        <Link to={`${Paths.COURSE}/${courseId}/present`} state={{ course }}>
          <Button variant="contained">Present Slides</Button>
        </Link>
        <Link to={`${Paths.COURSE}/${courseId}/attendance-report`}>
          <Button variant="contained">View Attendance</Button>
        </Link>
      </Stack>
    </Stack>
  );
};
