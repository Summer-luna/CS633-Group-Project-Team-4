import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from './pages/home/home'
import { Call } from './pages/call/index'
import { Attend } from './pages/attend/index'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/call/" element={<Call />} />
        <Route path="/attend/" element={<Attend />} />
      </Routes>
    </Router>
  );
}
export default App;
