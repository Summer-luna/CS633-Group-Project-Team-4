import { Box, Button, Stack, Typography } from '@mui/material';
import { CourseCard } from './component/courseCard.jsx';
import { AddCourseDialog } from './component/addCourseDialog.jsx';
import { AddStudentCourseDialog } from './component/addStudentCourseDialog.jsx';
import { useEffect, useReducer, useState } from 'react';
import { useAuth } from '../../context/auth.context.jsx';
import { axiosInstance } from '../../utils/axioInstance.js';
import { Actions, courseReducer } from '../../reducer/courseReducer.jsx';

export const Home = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [studentAddOpen, setStudentAddOpen] = useState(false);
  const [user, setUser] = useState({});
  const {token, decoded_token} = useAuth();
  const fullName = `${user.firstName} ${user.lastName}`;
  const [courses, dispatch] = useReducer(courseReducer, [], () => []);

  useEffect(() => {
    const getCourses = async () => {
      if(decoded_token) {
        const res = await axiosInstance.get(`/user/${decoded_token.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(res.data);
        dispatch({type: Actions.SET_COURSES, payload: res.data.courses});
      }
    };

    getCourses();
  }, [decoded_token]);

  const handleOpen = () => {
    if(user.role === 1) {
      handleAddDialogOpen();
    } else {
      handleStudentAddOpen();
    }
  }

    const addCourse = (course) => {
      dispatch({type: Actions.ADD_COURSE, payload: course});
    };

    const deleteCourse = (courseId) => {
      dispatch({type: Actions.DELETE_COURSE, payload: courseId});
    };

    const handleAddDialogOpen = () => {
      setAddDialogOpen(true);
    };

    const handleAddDialogClose = () => {
      setAddDialogOpen(false);
    };

    const handleStudentAddOpen = () => {
      setStudentAddOpen(true);
    };

    const handleStudentAddClose = () => {
      setStudentAddOpen(false);
    };

    return (
      <Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography
            component="h1"
            variant="h3"
            sx={{
              color: '#265792'
            }}
          >
            {fullName}
          </Typography>
          <Box>
            <Button
              variant="contained"
              sx={{
                background: '#265792',
                color: 'white',
                fontWeight: 'bold'
              }}
              onClick={handleOpen}
            >
              Add Course
            </Button>
            <AddCourseDialog open={addDialogOpen} onClose={handleAddDialogClose} addCourse={addCourse}/>
            <AddStudentCourseDialog open={studentAddOpen} onClose={handleStudentAddClose} />
          </Box>
        </Stack>
        <Stack flexWrap="wrap" direction="row" gap={5} sx={{mt: 7}}>
          {courses &&
            courses.map((course) => {
              return <CourseCard key={course.courseId} courseName={course?.Course?.name} courseId={course.courseId}
                                 deleteCourse={deleteCourse}/>;
            })}
        </Stack>
      </Stack>
    );
  };