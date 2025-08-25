import { BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-emerald-600 to-cyan-600 flex flex-col justify-center">
      <div className="flex justify-center mb-10">
        <div className="flex flex-row items-center w-1/3 justify-between">
          <BookOpen size={85} />
          <h1 className="font-bold text-8xl">Quiz Master</h1>
        </div>
      </div>
      <p className="text-center text-5xl mb-15">
        Create, manage, and take quizzes
        <br />
        with our comprehensive educational platform
      </p>
      <div className="flex justify-center">
        <div className="flex flex-row w-1/2 justify-evenly items-center">
          <button onClick={() => navigate('/register')}>Register</button>
          <button>Login</button>
        </div>
      </div>
    </div>
  );
}
