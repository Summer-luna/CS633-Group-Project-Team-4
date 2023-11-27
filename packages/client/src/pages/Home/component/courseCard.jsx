import { Box, Button, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';
import { DeleteCourseDialog } from './deleteCourseDialog.jsx';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../../constants/Paths.js';

export const CourseCard = ({ courseName, courseId, deleteCourse }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const navigateToCourse = () => {
    navigate(`${Paths.COURSE}/${courseId}`, { state: { courseName } });
  };

  return (
    <Box
      id={courseId}
      sx={{
        minWidth: 700,
        border: '1px solid #265792',
        borderRadius: 2,
        backgroundColor: 'rgba(255,255,255,0.2)',
        ':hover': {
          backgroundColor: 'rgba(255,255,255,0.3)',
          cursor: 'pointer'
        }
      }}
    >
      <Box
        sx={{
          paddingBottom: 6,
          display: 'flex',
          justifyContent: 'right',
          alignItems: 'center',
          zIndex: 40
        }}
      >
        <Button onClick={handleDeleteDialogOpen}>
          <DeleteForeverIcon fontSize="large" sx={{ color: '#bc3c3c' }} />
        </Button>
        <DeleteCourseDialog open={deleteDialogOpen} onClose={handleDeleteDialogClose} courseId={courseId} deleteCourse={deleteCourse} />
      </Box>

      <Box sx={{ paddingBottom: 12 }} onClick={navigateToCourse}>
        <Typography component="h1" variant="h4" align="center">
          {courseName}
        </Typography>
      </Box>
    </Box>
  );
};
