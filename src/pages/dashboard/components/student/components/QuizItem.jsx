import { IconButton } from '@mui/material';
import {
  Calendar,
  CircleUser,
  Clock,
  Play,
  SquarePen,
  Timer,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { deleteQuiz } from '../../../../../redux/reducers/teacherSlice';
import { formatDate } from '../../../../../utils/formatDate';

export default function QuizItem({ quiz }) {
  const dispatch = useDispatch();

  const { date, time } = formatDate(quiz.startTime);

  const quizStart = new Date(quiz.startTime).getTime();
  const quizEnd = quizStart + quiz.durationInMinutes * 60 * 1000;
  const now = Date.now();

  return (
    <div className="flex justify-center my-4">
      <div className="flex flex-row justify-between items-center w-4/5 p-6 border-2 border-blue-200 rounded-2xl shadow-2xl shadow-cyan-200 bg-white">
        <div className="flex flex-col w-11/12 space-y-4">
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
            <div className="flex flex-row items-center space-x-2">
              <Calendar />
              <span className="text-lg">{date}</span>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <Clock />
              <span className="text-lg">{time}</span>
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
            disabled={now < quizStart || now > quizEnd}
          >
            <Play color="green" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
