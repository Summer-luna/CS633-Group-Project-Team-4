import { Paths } from './constants/Paths.js';
import { Home } from './pages/Home/home.jsx';
import { Layout } from './pages/Home/layout.jsx';
import { SignUp } from './pages/Authentication/signUp.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignIn } from './pages/Authentication/signIn.jsx';
import { AuthProvider } from './context/auth.context.jsx';
import { AuthGuard } from './pages/Authentication/auth.guard.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path={Paths.HOME} element={<Layout />}>
            <Route element={<AuthGuard />}>
              <Route path={Paths.HOME} element={<Home />} />
            </Route>
            <Route path={Paths.SIGNUP} element={<SignUp />} />
            <Route path={Paths.LOGIN} element={<SignIn />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
