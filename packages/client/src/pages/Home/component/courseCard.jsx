import { Box, Button, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';
import { DeleteCourseDialog } from './deleteCourseDialog.jsx';

export const CourseCard = ({ courseName, courseId }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
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
      <Box>
        <Button onClick={handleDeleteDialogOpen}>
          <DeleteForeverIcon fontSize="large" sx={{ color: '#bc3c3c' }} />
        </Button>
        <DeleteCourseDialog open={deleteDialogOpen} onClose={handleDeleteDialogClose} courseId={courseId} />
      </Box>

      <Box sx={{ paddingBottom: 12 }}>
        <Typography component="h1" variant="h4" align="center">
          {courseName}
        </Typography>
      </Box>
    </Box>
  );
};
