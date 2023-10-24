import { Button, Grid, Stack, Typography } from '@mui/material';
import { CourseCard } from './component/courseCard.jsx';
import { AddCourseDialog } from './component/addCourseDialog.jsx';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth.context.jsx';
import { axiosInstance } from '../../utils/axioInstance.js';

export const Home = () => {
  const [courses, setCourses] = useState([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [user, setUser] = useState({});
  const { token, decoded_token } = useAuth();
  const fullName = `${user.firstName} ${user.lastName}`;

  useEffect(() => {
    const getCourses = async () => {
      if (decoded_token) {
        const res = await axiosInstance.get(`/user/${decoded_token.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(res.data);
        setCourses(res.data.courses);
      }
    };

    getCourses();
  }, [decoded_token]);

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
                <AddCourseDialog open={addDialogOpen} onClose={handleAddDialogClose} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Stack flexWrap="wrap" direction="row" gap={5} sx={{ mt: 7 }}>
        {courses.map((course) => {
          return <CourseCard key={course.courseId} courseName={course.Course.name} courseId={course.courseId} />;
        })}
      </Stack>
    </Grid>
  );
};
