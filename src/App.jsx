import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/landing/Landing';
import Register from './pages/auth/register/Register'
import Login from './pages/auth/login/Login';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />}/>
    </Routes>
  );
};

export default App;
