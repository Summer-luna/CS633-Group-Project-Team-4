import { createContext, useContext, useState } from 'react';

const AttendanceContext = createContext({});

export const AttendanceProvider = (props) => {
  const [finished, setFinished] = useState(true);
  const [attendanceCode, setAttendanceCode] = useState(null);

  const endAttendance = () => {
    setAttendanceCode(null);
  };

  return <AttendanceContext.Provider value={{ finished, setFinished, attendanceCode, setAttendanceCode, endAttendance }} {...props} />;
};

export const useAttendance = () => useContext(AttendanceContext);
