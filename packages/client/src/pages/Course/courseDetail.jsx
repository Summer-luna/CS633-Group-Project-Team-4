import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { StudentTable } from './studentTable.jsx';
import { Delete } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth.context.jsx';
import { useLocation, useParams } from 'react-router-dom';
import { axiosInstance } from '../../utils/axioInstance.js';

export const Students = () => {
  const { token } = useAuth();
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
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
        console.log(res.data);
        const courses = res.data;
        const revisedCourses = courses.map((course) => {
          return { id: course.User.buID, name: `${course.User.firstName} ${course.User.lastName}`, email: course.User.email };
        });

        setStudents(revisedCourses);
      }
    };

    if (token) {
      getStudents();
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
          {courseName}
        </Typography>
        <Typography variant="body1">Roster</Typography>
      </Stack>
      <StudentTable tableConfig={tableConfig} rows={students} />
    </Stack>
  );
};
