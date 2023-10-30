import { Paths } from './constants/Paths.js';
import { Home } from './pages/Home/home.jsx';
import { Layout } from './pages/Home/layout.jsx';
import { SignUp } from './pages/Authentication/signUp.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignIn } from './pages/Authentication/signIn.jsx';
import { AuthProvider } from './context/auth.context.jsx';
import { AuthGuard } from './pages/Authentication/auth.guard.jsx';
import { Logout } from './pages/Authentication/logout.jsx';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Students } from './pages/Course/courseDetail.jsx';
import { PresentSlides } from './pages/Course/presentSlides.jsx';
import { AttendanceReport } from './pages/Course/attendanceReport.jsx';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path={Paths.HOME} element={<Layout />}>
              <Route element={<AuthGuard />}>
                <Route path={Paths.HOME} element={<Home />} />
                <Route path={Paths.COURSE_DETAIL} element={<Students />} />
                <Route path={Paths.PRESENT_SLIDES} element={<PresentSlides />} />
                <Route path={Paths.ATTENDANCE_REPORT} element={<AttendanceReport />} />
              </Route>
              <Route path={Paths.SIGNUP} element={<SignUp />} />
              <Route path={Paths.LOGIN} element={<SignIn />} />
              <Route path={Paths.LOGOUT} element={<Logout />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
