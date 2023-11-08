import { Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import { StudentTable } from './studentTable.jsx';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import { endOfWeek, startOfWeek } from 'date-fns';
import DownloadIcon from '@mui/icons-material/Download';
import { axiosInstance } from '../../../utils/axioInstance.js';
import { useAuth } from '../../../context/auth.context.jsx';
import { useParams } from 'react-router-dom';

export const AttendanceReport = () => {
  const { token } = useAuth();
  const { courseId } = useParams();
  const date = new Date();
  const [rows, setRows] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: startOfWeek(date, { weekStartsOn: 1 }),
    endDate: endOfWeek(date, { weekStartsOn: 1 })
  });
  const [attendanceType, setAttendanceType] = useState(0);

  const handleChange = async (event, row) => {
    const attendanceType = event.target.value;
    setAttendanceType(attendanceType);
    const res = await axiosInstance.put(
      '/instructor/attendance/report/update',
      {
        id: row.attendanceId,
        attendanceType: attendanceType
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log(res.data);
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
      render: (row) => (
        <FormControl>
          <InputLabel id="demo-simple-select-label">Absence</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" defaultValue={row.attendance} label="Absence" onChange={(event) => handleChange(event, row)}>
            <MenuItem value={0}>Absence</MenuItem>
            <MenuItem value={1}>Present</MenuItem>
            <MenuItem value={2}>Excused</MenuItem>
          </Select>
        </FormControl>
      )
    }
  ];

  useEffect(() => {
    const getAttendances = async () => {
      const res = await axiosInstance.post(
        '/instructor/attendance/report',
        {
          classId: courseId,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (res.data) {
        const attendances = res.data;
        const data = attendances.map((attendance) => {
          return { id: attendance.buID, name: attendance.fullName, date: attendance.created, attendance: attendance.attendanceType, attendanceId: attendance.id };
        });
        setRows(data);
      }
    };

    token && getAttendances();
  }, [dateRange, token]);

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
        <Button variant="contained" sx={{ backgroundColor: "#265792'" }} endIcon={<DownloadIcon />}>
          Download
        </Button>
      </Stack>
      <StudentTable tableConfig={tableConfig} rows={rows} />
    </Stack>
  );
};
