import { Button, Grid, Typography } from '@mui/material';
import { CourseCard } from './component/courseCard.jsx';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth.context.jsx';
import { axiosInstance } from '../../utils/axioInstance.js';

export const Home = () => {
  const [courses, setCourses] = useState([]);
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
                >
                  Add Course
                </Button>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  sx={{
                    background: '#265792',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                >
                  Remove Course
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {courses.map((course) => {
        return <CourseCard key={course.courseId} courseName={course.Course.name} />;
      })}
    </Grid>
  );
};
