import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import { axiosInstance } from '../../../utils/axioInstance.js';
import { useAuth } from '../../../context/auth.context.jsx';

export const AddCourseDialog = ({ open, onClose, addCourse }) => {
  const [semester, setSemester] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { token, decoded_token } = useAuth();

  const handleClose = () => {
    onClose();
  };

  const handleChange = (event) => {
    setSemester(event.target.value);
  };

  // Handling add class form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const res = await axiosInstance.post(
      '/instructor/course/add',
      {
        userId: decoded_token.id,
        name: data.get('className'),
        description: data.get('description'),
        location: data.get('location'),
        semesterId: semester,
        startDate: startDate,
        endDate: endDate
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (res.data) {
      console.log(res.data);
      addCourse(res.data);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth component="form" onSubmit={handleSubmit}>
      <DialogTitle
        variant="h4"
        sx={{
          color: '#265792',
          mb: 2
        }}
      >
        Add Course
      </DialogTitle>
      <DialogContent sx={{ pt: 5 }}>
        <Stack justifyContent="space-between" alignItems="center" gap={2} sx={{ pt: 2 }}>
          <TextField name="className" required fullWidth id="className" label="Class Name" autoFocus />
          <TextField name="description" fullWidth id="description" label="Description" autoFocus />
          <TextField name="location" required fullWidth id="location" label="Location" />
          <FormControl fullWidth>
            <InputLabel id="semester-select-label">Semester</InputLabel>
            <Select labelId="semester-select-label" id="semester-selection" value={semester} label="Semester" onChange={handleChange} fullWidth>
              <MenuItem value={0}>Fall</MenuItem>
              <MenuItem value={1}>Spring</MenuItem>
              <MenuItem value={2}>Summer</MenuItem>
            </Select>
          </FormControl>
          <DatePicker label="Start Date" value={startDate} onChange={(newValue) => setStartDate(newValue)} required sx={{ width: '100%' }} />
          <DatePicker label="End Date" value={endDate} onChange={(newValue) => setEndDate(newValue)} required sx={{ width: '100%' }} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, background: '#265792', fontWeight: 'bold' }}>
          Add Class
        </Button>
      </DialogActions>
    </Dialog>
  );
};
