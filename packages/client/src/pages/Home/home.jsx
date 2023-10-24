import { Button, Grid, Typography } from '@mui/material';
import { CourseCard } from './component/courseCard.jsx';
import { AddCourseDialog } from './component/addCourseDialog.jsx';
import * as React from 'react';

export const Home = () => {
  const courses = [
    {
      id: 1,
      name: 'Course 1'
    },
    {
      id: 2,
      name: 'Course 2'
    },
    {
      id: 3,
      name: 'Course 3'
    },
    {
      id: 4,
      name: 'Course 4'
    }
  ];

  const [addDialogOpen, setAddDialogOpen] = React.useState(false);

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
              Professor Name
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

      {courses.map((course) => (
        <CourseCard key={course.id} courseName={course.name} />
      ))}
    </Grid>
  );
};
