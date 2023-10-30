import { Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import { StudentTable } from './studentTable.jsx';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import { endOfWeek, startOfWeek } from 'date-fns';
import DownloadIcon from '@mui/icons-material/Download';

export const AttendanceReport = () => {
  const [absence, setAbsence] = useState(0);
  const date = new Date();
  const [dateRange, setDateRange] = useState({
    startDate: startOfWeek(date, { weekStartsOn: 1 }),
    endDate: endOfWeek(date, { weekStartsOn: 1 })
  });

  const handleChange = (event) => {
    setAbsence(event.target.value);
  };

  const tableConfig = [
    {
      field: 'id',
      name: 'BU ID',
      render: (row) => row.id
    },
    {
      field: 'date',
      name: 'Date',
      render: (row) => row.date
    },
    {
      field: 'name',
      name: 'Student Name',
      render: (row) => row.name
    },
    {
      field: 'attendance',
      name: 'Attendance',
      render: () => (
        <FormControl>
          <InputLabel id="demo-simple-select-label">Absence</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={absence} label="Absence" onChange={handleChange}>
            <MenuItem value={0}>Absence</MenuItem>
            <MenuItem value={1}>Present</MenuItem>
            <MenuItem value={2}>Excused</MenuItem>
          </Select>
        </FormControl>
      )
    }
  ];

  const rows = [
    {
      id: '123456',
      name: 'Khushbu Kumari',
      date: '10/10/2021'
    },
    {
      id: '246802',
      name: 'Xinyue Luna',
      date: '10/10/2021'
    },
    {
      id: '369258',
      name: 'Yilin Li',
      date: '10/10/2021'
    },
    {
      id: '482604',
      name: 'Nelson Montesinos',
      date: '10/10/2021'
    }
  ];

  return (
    <Stack gap={4}>
      <Stack gap={2}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#265792' }}>
          Introduction to Computer Science
        </Typography>
        <Typography variant="body1">Roster</Typography>
      </Stack>
      <Stack gap={5} direction="row">
        <DatePicker
          label="Start Date"
          value={dateRange.startDate}
          onChange={(newValue) => {
            setDateRange((prevState) => ({
              ...prevState,
              startDate: newValue
            }));
          }}
        />
        <DatePicker
          label="End Date"
          value={dateRange.endDate}
          onChange={(newValue) => {
            setDateRange((prevState) => ({
              ...prevState,
              endDate: newValue
            }));
          }}
        />
        <Button variant="contained" sx={{ backgroundColor: "#265792'" }}>
          Display
        </Button>
        <Button variant="contained" sx={{ backgroundColor: "#265792'" }} endIcon={<DownloadIcon />}>
          Download
        </Button>
      </Stack>
      <StudentTable tableConfig={tableConfig} rows={rows} />
    </Stack>
  );
};
