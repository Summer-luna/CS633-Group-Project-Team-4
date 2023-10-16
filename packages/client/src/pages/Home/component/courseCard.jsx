import { Grid, Typography } from '@mui/material';

export const CourseCard = (props) => {
  return (
    <Grid
      item
      xs={5}
      sx={{
        paddingTop: 14,
        paddingBottom: 14,
        border: '1px solid #265792',
        borderRadius: 2,
        margin: 2,
        backgroundColor: 'rgba(255,255,255,0.2)',
        ':hover': {
          backgroundColor: 'rgba(255,255,255,0.3)',
          cursor: 'pointer'
        }
      }}
    >
      <Typography component="h1" variant="h4" align="center">
        {props.courseName}
      </Typography>
    </Grid>
  );
};
