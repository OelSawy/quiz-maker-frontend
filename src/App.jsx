import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/landing/Landing';
import Register from './pages/auth/register/Register';
import Login from './pages/auth/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import TakeQuiz from './pages/student/quiz/TakeQuiz';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='student/quiz' element={<TakeQuiz />} />
    </Routes>
  );
};

export default App;
