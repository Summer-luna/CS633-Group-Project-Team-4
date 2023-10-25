import { Button, Grid, Stack, Typography } from '@mui/material';
import { CourseCard } from './component/courseCard.jsx';
import { AddCourseDialog } from './component/addCourseDialog.jsx';
import { useEffect, useReducer, useState } from 'react';
import { useAuth } from '../../context/auth.context.jsx';
import { axiosInstance } from '../../utils/axioInstance.js';
import { Actions, courseReducer } from '../../reducer/courseReducer.jsx';

export const Home = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [user, setUser] = useState({});
  const { token, decoded_token } = useAuth();
  const fullName = `${user.firstName} ${user.lastName}`;
  const [courses, dispatch] = useReducer(courseReducer, [], () => []);

  useEffect(() => {
    const getCourses = async () => {
      if (decoded_token) {
        const res = await axiosInstance.get(`/user/${decoded_token.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(res.data);
        dispatch({ type: Actions.SET_COURSES, payload: res.data.courses });
      }
    };

    getCourses();
  }, [decoded_token]);

  const addCourse = (course) => {
    dispatch({ type: Actions.ADD_COURSE, payload: course });
  };

  const deleteCourse = (courseId) => {
    dispatch({ type: Actions.DELETE_COURSE, payload: courseId });
  };

  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  return (
    <Grid container justifyContent="space-between">
      <Grid item xs={12}>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Grid item alignItems="center">
            <Typography
              component="h1"
              variant="h3"
              sx={{
                color: '#265792'
              }}
            >
              {fullName}
            </Typography>
          </Grid>

          <Grid item>
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
              <Grid item sx={{ paddingRight: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    background: '#265792',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                  onClick={handleAddDialogOpen}
                >
                  Add Course
                </Button>
                <AddCourseDialog open={addDialogOpen} onClose={handleAddDialogClose} addCourse={addCourse} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Stack flexWrap="wrap" direction="row" gap={5} sx={{ mt: 7 }}>
        {courses &&
          courses.map((course) => {
            return <CourseCard key={course.courseId} courseName={course?.Course?.name} courseId={course.courseId} deleteCourse={deleteCourse} />;
          })}
      </Stack>
    </Grid>
  );
};
