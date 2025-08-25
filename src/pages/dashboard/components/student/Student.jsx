// @ts-nocheck
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuizItem from './components/QuizItem';
import QuizList from './components/QuizList';
import { getQuizzesStudent } from '../../../../redux/reducers/studentSlice';

export default function Student() {
  const { getQuizzesStatus, submitQuizStatus, error, quizzes, answers } =
    useSelector(state => state.student);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuizzesStudent(null));
  }, [dispatch]);

  useEffect(() => {
    console.log(quizzes);
  }, [quizzes]);

  return (
    <div className="w-full h-full flex justify-center mt-20">
      <div className="w-3/5 h-full">
        <h1 className="text-black text-6xl mb-30">Available Quizzes</h1>
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
