// @ts-nocheck
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Teacher from './components/teacher/Teacher';
import Student from './components/student/Student';
import QuizItem from './components/teacher/components/QuizItem';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="w-screen h-screen bg-white">
      <Header />
      {user.role === 'TEACHER' ? <Teacher /> : <Student />}
    </div>
  );
}
