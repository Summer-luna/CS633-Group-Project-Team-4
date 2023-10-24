import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel, MenuItem, Select,
  TextField,
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as React from 'react';

export const AddCourseDialog = (props) => {
  const { open, onClose } = props;
  const [semester, setSemester] = React.useState(0);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const handleClose = () => {
    onClose();
  };

  const handleChange = (event) => {
    setSemester(event.target.value);
  };

  // Handling add class form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      className: data.get('className'),
      description: data.get('description'),
      location: data.get('location'),
      semester: semester,
      startDate: startDate,
      endDate: endDate
    });

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={'sm'} fullWidth component="form" onSubmit={handleSubmit}>
      <DialogTitle
        variant="h4"
        sx={{
          color: '#265792'
        }}
      >
        Add Class
      </DialogTitle>
      <br />
      <DialogContent>
        <Grid container direction="column" justifyContent="space-between" alignItems="center">
          <Grid item xs={12} sx={{ minWidth: '25vw' }} alignItems="center">
            <TextField autoComplete="class-name" name="className" required fullWidth id="className" label="Class Name" autoFocus sx={{ margin: 2 }} />
          </Grid>

          <Grid item xs={12} sx={{ minWidth: '25vw' }} alignItems="center">
            <TextField autoComplete="description" name="description" fullWidth id="description" label="Description" autoFocus sx={{ margin: 2 }} />
          </Grid>

          <Grid item xs={12} sx={{ minWidth: '25vw' }} alignItems="center">
            <TextField autoComplete="location" name="location" required fullWidth id="location" label="Location" sx={{ margin: 2 }} />
          </Grid>

          <Grid item xs={12} sx={{ minWidth: '25vw' }} alignItems="center">
            <FormControl fullWidth>
              <InputLabel id="semester-select-label" sx={{ margin: 2 }}>Semester</InputLabel>
              <Select labelId="semester-select-label" id="semester-selection" value={semester} label="Semester" onChange={handleChange} sx={{ margin: 2 }} fullWidth>
                <MenuItem value={0}>Fall</MenuItem>
                <MenuItem value={1}>Spring</MenuItem>
                <MenuItem value={2}>Summer</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ minWidth: '25vw' }} alignItems="center">
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              required
              slotProps={{ textField: { fullWidth: true } }}
              sx={{ margin: 2 }}
            />
          </Grid>

          <Grid item xs={12} sx={{ minWidth: '25vw' }} alignItems="center">
            <DatePicker label="End Date" value={endDate} onChange={(newValue) => setEndDate(newValue)} required slotProps={{ textField: { fullWidth: true } }} sx={{ margin: 2 }} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, background: '#265792', fontWeight: 'bold' }}>
          Add Class
        </Button>
      </DialogActions>
    </Dialog>
  );
};
