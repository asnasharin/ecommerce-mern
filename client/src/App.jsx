import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from './components/User/SignUp';
import Login from './components/User/Login';
import Header from './components/layouts/Header/Header';
import Home from './components/Home/Home';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
