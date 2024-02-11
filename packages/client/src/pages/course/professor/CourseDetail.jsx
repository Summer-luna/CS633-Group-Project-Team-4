import { Button, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { StudentTable } from './StudentTable.jsx';
import { Delete } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/auth.context.jsx';
import { useLocation, useParams } from 'react-router-dom';
import { axiosInstance } from '../../../utils/axioInstance.js';
import { Paths } from '../../../constants/Paths.js';
import { Link } from 'react-router-dom';
import { DeleteStudentDialog } from './DeleteStudentDialog.jsx';
import { useCourseDetail } from '../../../hooks/useCourseDetail.jsx';
import { InputFileUpload } from './components/InputFileUpload.jsx';
import * as XLSX from 'xlsx';

export const Students = () => {
  const { token } = useAuth();
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const location = useLocation();
  const { courseName } = location.state;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const { course } = useCourseDetail(courseId);

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
          return { id: course.User.buID, name: `${course.User.firstName} ${course.User.lastName}`, email: course.User.email, userId: course.userId };
        });

        setStudents(revisedCourses);
      }
    };

    if (token) {
      getStudents();
    }
  }, [token]);

  const handleFile = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    const fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    if (selectedFile && fileTypes.includes(selectedFile.type)) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = async (e) => {
        const workbook = XLSX.read(e.target.result, { type: 'buffer' });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        const studentList = data
          .map((student) => {
            return {
              email: student['Email'],
              password: '12345',
              firstName: student['Student First'],
              lastName: student['Student Last'],
              buID: student['Student ID'],
              role: 0
            };
          })
          .filter((student) => student.email && student.firstName && student.lastName && student.buID);

        await axiosInstance.post('/instructor/updateRoster', {
          courseId: courseId,
          joinCode: course.joinCode,
          studentList: studentList
        });
      };
    }
  };

  const handleDelete = async (studentId) => {
    const res = await axiosInstance.delete(`/student/drop`, {
      data: {
        courseId: courseId,
        userId: studentId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.data) {
      handleDeleteDialogClose();
      window.location.reload();
    }
  };

  const handleDeleteDialogOpen = (studentId) => {
    setStudentId(studentId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

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
      render: (row) => {
        return (
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDeleteDialogOpen(row.userId)}>
              <Delete sx={{ color: '#265792' }} />
            </IconButton>
          </Tooltip>
        );
      }
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
        <InputFileUpload onChange={handleFile} />
        <Link to={`${Paths.COURSE}/${courseId}/present`} state={{ course }}>
          <Button variant="contained">Present Slides</Button>
        </Link>
        <Link to={`${Paths.COURSE}/${courseId}/attendance-report`}>
          <Button variant="contained">View Attendance</Button>
        </Link>
      </Stack>
      <DeleteStudentDialog open={deleteDialogOpen} onClose={handleDeleteDialogClose} handleDelete={() => handleDelete(studentId)} />
    </Stack>
  );
};
