// @ts-nocheck
import { useSelector } from 'react-redux';
import QuizItem from './QuizItem';

export default function QuizList() {
  const { quizzes } = useSelector(state => state.teacher);

  return (
    <div>
      {quizzes.map(quiz => {
        return <QuizItem quiz={quiz} key={quiz.id} />;
      })}
    </div>
  );
}
