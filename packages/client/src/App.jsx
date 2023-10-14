import { Paths } from './constants/Paths.js';
import { Home } from './pages/Home/home.jsx';
import { Layout } from './pages/Home/layout.jsx';
import { SignUp } from "./pages/Authentication/signUp.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {SignIn} from "./pages/Authentication/signIn.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={Paths.HOME} element={<Layout />}>
          <Route path={Paths.HOME} element={<Home />} />
          <Route path={"/signup"} element={<SignUp />} />
          <Route path={"/signin"} element={<SignIn />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
