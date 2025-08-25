// @ts-nocheck
import { useSelector } from 'react-redux';
import QuizItem from './QuizItem';

export default function QuizList() {
  const { quizzes } = useSelector(state => state.student);

  return (
    <div>
      {quizzes.map(quiz => {
        return <QuizItem quiz={quiz} key={quiz.id} />;
      })}
    </div>
  );
}
