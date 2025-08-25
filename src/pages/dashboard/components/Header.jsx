// @ts-nocheck
import { BookOpen } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  logoutUser,
  resetAuthStatuses,
} from '../../../redux/reducers/authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, logoutStatus } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (logoutStatus === 'succeeded') {
      navigate('/login');
      dispatch(resetAuthStatuses());
    }
  }, [logoutStatus]);

  return (
    <header className="shadow-2xl h-[15%]">
      <div className="flex flex-row justify-between items-center px-10 h-full text-black">
        <div className="flex flex-row items-center space-x-4">
          <BookOpen size={35} />
          <h1 className="text-3xl font-semibold">
            {user?.role === 'TEACHER'
              ? 'Teacher Dashboard'
              : 'Student Dashboard'}
          </h1>
        </div>

        <div className="flex flex-row items-center space-x-20">
          <div className="flex items-center">
            <span className="text-2xl">
              {`Welcome ${user?.role === 'TEACHER' ? 'Mr. / Ms.' : ''} ${user?.firstName || ''}`}
            </span>
          </div>
          <div className="flex items-center">
            <button
              className="small"
              onClick={() => {
                dispatch(logoutUser(null));
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
