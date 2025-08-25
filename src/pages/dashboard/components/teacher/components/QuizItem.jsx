import { IconButton } from '@mui/material';
import { CircleUser, SquarePen, Timer, Trash } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { deleteQuiz } from '../../../../../redux/reducers/teacherSlice';

export default function QuizItem({ quiz }) {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center my-4">
      <div className="flex flex-row justify-between items-center w-4/5 p-6 border-2 border-blue-200 rounded-2xl shadow-2xl shadow-cyan-200 bg-white">
        <div className="flex flex-col w-1/2 space-y-4">
          <h1 className="text-black text-3xl font-semibold">{quiz.title}</h1>
          <div className="flex flex-row justify-between w-full text-black">
            <div className="flex flex-row items-center space-x-2">
              <SquarePen />
              <span className="text-lg">{quiz.questions.length} Questions</span>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <Timer />
              <span className="text-lg">{quiz.durationInMinutes} Minutes</span>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <CircleUser />
              <span className="text-lg">Year {quiz.year}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <IconButton
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              padding: 0,
            }}
            // @ts-ignore
            onClick={() => dispatch(deleteQuiz(quiz.id))}
          >
            <Trash color="red" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
