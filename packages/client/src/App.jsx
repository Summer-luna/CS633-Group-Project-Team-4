import { Paths } from './constants/Paths.js';
import { Home } from './pages/home/Home.jsx';
import { Layout } from './pages/home/Layout.jsx';
import { SignUp } from './pages/authentication/SignUp.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignIn } from './pages/authentication/SignIn.jsx';
import { AuthProvider } from './context/auth.context.jsx';
import { AuthGuard } from './pages/authentication/auth.guard.jsx';
import { Logout } from './pages/authentication/Logout.jsx';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { PresentSlides } from './pages/course/professor/PresentSlides.jsx';
import { AttendanceReport } from './pages/course/professor/AttendanceReport.jsx';
import { CourseDetailGuard } from './pages/course/CourseDetailGuard.jsx';
import { AttendanceProvider } from './context/attendance.context.jsx';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Router>
        <AuthProvider>
          <AttendanceProvider>
            <Routes>
              <Route path={Paths.HOME} element={<Layout />}>
                <Route element={<AuthGuard />}>
                  <Route path={Paths.HOME} element={<Home />} />
                  <Route path={Paths.COURSE_DETAIL} element={<CourseDetailGuard />} />
                  <Route path={Paths.PRESENT_SLIDES} element={<PresentSlides />} />
                  <Route path={Paths.ATTENDANCE_REPORT} element={<AttendanceReport />} />
                </Route>
                <Route path={Paths.SIGNUP} element={<SignUp />} />
                <Route path={Paths.LOGIN} element={<SignIn />} />
                <Route path={Paths.LOGOUT} element={<Logout />} />
              </Route>
            </Routes>
          </AttendanceProvider>
        </AuthProvider>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
