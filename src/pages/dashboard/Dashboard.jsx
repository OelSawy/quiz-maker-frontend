// @ts-nocheck
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Teacher from './components/teacher/Teacher';
import Student from './components/student/Student';
import QuizItem from './components/teacher/components/QuizItem';

export default function Dashboard() {
  const { user } = useSelector(state => state.auth);

  return (
    <div className="w-screen h-screen bg-white">
      <Header />
      {user.role === 'TEACHER' ? <Teacher /> : <Student />}
    </div>
  );
}
