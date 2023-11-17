import { Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import { StudentTable } from './studentTable.jsx';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import { endOfWeek, startOfWeek } from 'date-fns';
import DownloadIcon from '@mui/icons-material/Download';
import { axiosInstance } from '../../../utils/axioInstance.js';
import { useAuth } from '../../../context/auth.context.jsx';
import { useParams } from 'react-router-dom';
import { CSVLink } from 'react-csv';

export const AttendanceReport = () => {
  const { token } = useAuth();
  const { courseId } = useParams();
  const date = new Date();
  const [rows, setRows] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: startOfWeek(date, { weekStartsOn: 1 }),
    endDate: endOfWeek(date, { weekStartsOn: 1 })
  });
  const [csvHeader, setCsvHeader] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [attendances, setAttendances] = useState([]);

  const handleChange = async (event, row) => {
    const attendanceType = event.target.value;
    await axiosInstance.put(
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
          <InputLabel id="demo-simple-select-label">Attendance</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" defaultValue={row.attendance} label="Absence" onChange={(event) => handleChange(event, row)}>
            <MenuItem value={0}>Present</MenuItem>
            <MenuItem value={1}>Absent</MenuItem>
            <MenuItem value={2}>Excused</MenuItem>
          </Select>
        </FormControl>
      )
    }
  ];

  const createCsvHeader = () => {
    const header = [
      {
        label: 'Student Last',
        key: 'lastName'
      },
      {
        label: 'Student First',
        key: 'firstName'
      }
    ];

    const uniqueDate = {};

    rows.map((row) => {
      let date = row.date.substring(0, 10);
      uniqueDate[date] = date;
    });

    //Sort the date to be able to display date time from earliest to latest.
    Object.keys(uniqueDate)
      .sort((a, b) => {
        return new Date(a) - new Date(b);
      })
      .forEach((key) => {
        header.push({ label: uniqueDate[key], key: uniqueDate[key] });
      });

    setCsvHeader(header);
  };

  const createCsvData = () => {
    const transformedData = new Map();

    rows.map((row) => {
      const { date, userId, attendance } = row;
      let shortDate = date.substring(0, 10);

      if (!transformedData.has(userId)) {
        transformedData.set(userId, new Map());
      }

      let symbol = attendance === 0 ? '✅' : '❌';
      transformedData.get(userId).set(shortDate, symbol);
    });

    const uniqueDate = Array.from(new Set(rows.map((row) => row.date.substring(0, 10)))).sort();

    const result = Object.fromEntries(Array.from(transformedData, ([user, dateMap]) => [user, Object.fromEntries(uniqueDate.map((date) => [date, dateMap.get(date)]))]));

    let finalResult = [];
    for (const [key, value] of Object.entries(result)) {
      const data = rows.find((row) => row.userId === key);
      finalResult.push({ firstName: data.firstName, lastName: data.lastName, ...value });
    }

    setCsvData(finalResult);
  };

  const getCsvHeader = () => {
    return csvHeader;
  };

  const getCsvData = () => {
    return csvData;
  };

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
          return {
            id: attendance.buID,
            name: attendance.fullName,
            firstName: attendance.firstName,
            lastName: attendance.lastName,
            date: attendance.created,
            attendance: attendance.attendanceType,
            attendanceId: attendance.id,
            userId: attendance.userId
          };
        });
        setAttendances(data);
      }
    };

    token && getAttendances();
  }, [dateRange, token]);

  const getAllAttendances = async () => {
    const res = await axiosInstance.post(
      '/instructor/attendance/report',
      {
        classId: courseId
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
        return {
          id: attendance.buID,
          name: attendance.fullName,
          firstName: attendance.firstName,
          lastName: attendance.lastName,
          date: attendance.created,
          attendance: attendance.attendanceType,
          attendanceId: attendance.id,
          userId: attendance.userId
        };
      });
      setRows(data);
    }
  };

  useEffect(() => {
    token && getAllAttendances();
  }, [token]);

  const getCsv = async () => {
    if (rows.length > 0) {
      createCsvHeader();
      createCsvData();
    }
  };

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
        <CSVLink data={getCsvData()} headers={getCsvHeader()} filename={'Attendance_Report.csv'} onClick={getCsv}>
          <Button variant="contained" sx={{ backgroundColor: "#265792'" }} endIcon={<DownloadIcon />}>
            Download
          </Button>
        </CSVLink>
      </Stack>
      <StudentTable tableConfig={tableConfig} rows={attendances} />
    </Stack>
  );
};
