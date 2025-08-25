// @ts-nocheck
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizzes } from '../../../../redux/reducers/teacherSlice';
import QuizItem from './components/QuizItem';
import QuizList from './components/QuizList';
import { useNavigate } from 'react-router-dom';

export default function Teacher() {
  const {
    getQuizzesStatus,
    createQuizStatus,
    deleteQuizStatus,
    error,
    quizzes,
    questions,
  } = useSelector(state => state.teacher);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuizzes(null));
  }, [dispatch]);

  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex justify-center mt-20">
      <div className="w-3/5 h-full">
        <div className="w-full h-1/12 flex flex-row justify-between mb-30">
          <h1 className="text-black text-6xl">My Quizzes</h1>
          <button onClick={() => {navigate('/teacher/quiz')}}>Create Quiz</button>
        </div>
        <div>
          {quizzes.length === 0 ? (
            <span className="text-black text-3xl text-center w-full flex justify-center">
              No quizzes yet, add your first quiz.
            </span>
          ) : (
            <QuizList />
          )}
        </div>
      </div>
    </div>
  );
}
