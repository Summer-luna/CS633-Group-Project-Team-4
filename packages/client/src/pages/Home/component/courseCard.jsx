import { Button, Grid, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import * as React from 'react';
import { DeleteCourseDialog } from './deleteCourseDialog.jsx';

export const CourseCard = (props) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <Grid
      item
      xs={5}
      sx={{
        // paddingTop: 14,
        // paddingBottom: 14,
        border: '1px solid #265792',
        borderRadius: 2,
        margin: 5,
        backgroundColor: 'rgba(255,255,255,0.2)',
        ':hover': {
          backgroundColor: 'rgba(255,255,255,0.3)',
          cursor: 'pointer'
        }
      }}
    >
      <Grid container direction="column" align="right">
        <Grid item sx={{ paddingBottom: 10 }}>
          <Button onClick={handleDeleteDialogOpen}>
            <DeleteForeverIcon fontSize="large" sx={{ color: '#bc3c3c' }} />
          </Button>
          <DeleteCourseDialog open={deleteDialogOpen} onClose={handleDeleteDialogClose} />
        </Grid>

        <Grid item sx={{ paddingBottom: 12 }}>
          <Typography component="h1" variant="h4" align="center">
            {props.courseName}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
