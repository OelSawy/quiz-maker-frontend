// @ts-nocheck
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAnswer, submitQuiz } from "../../../redux/reducers/studentSlice";
import { useLocation, useNavigate } from "react-router-dom";

export default function TakeQuiz() {

    const location = useLocation();
    const { quiz } = location.state;

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answer, setAnswer] = useState("");

    const { answers, submitQuizStatus } = useSelector(state => state.student);

    const currentQuestion = quiz.questions[currentIndex];

    const handleSubmitAnswer = () => {
        dispatch(addAnswer({ questionId: currentQuestion.questionId, answer }));

        if (currentIndex + 1 < quiz.questions.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            dispatch(submitQuiz({ id: quiz.id, answers }));
        }
    };

    useEffect(() => {
        if (submitQuizStatus === 'succeeded') {
            navigate('/dashboard');
        }
    }, [submitQuizStatus]);

    return (
        <div className="w-3/5 mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6">{quiz.title}</h1>
            <div className="border p-6 rounded space-y-4 bg-gray-50">
                <h2 className="text-3xl font-semibold text-black">Question {currentIndex + 1}:</h2>
                <p className="text-2xl text-black">{currentQuestion.question}</p>

                <div className="flex flex-row w-[80%] justify-between">
                    {currentQuestion.type === "TEXT" ? (
                        <div className="w-1/2 bg-black">
                            <input
                                type="text"
                                value={answer}
                                onChange={e => setAnswer(e.target.value)}
                                className="w-full p-2 rounded border-2 border-black"
                                placeholder="Enter your answer..."
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-2">
                            {currentQuestion.options.map((opt, idx) => (
                                <label key={idx} className="flex items-center space-x-2 text-black">
                                    <input
                                        type="radio"
                                        name={`question-${currentIndex}`}
                                        value={idx}
                                        checked={answer === idx.toString()}
                                        onChange={e => setAnswer(e.target.value)}
                                    />
                                    <span className="text-black">{opt}</span>
                                </label>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={handleSubmitAnswer}
                        className="bg-blue-500 px-4 py-2 rounded small text-black"
                        disabled={answer === ""}
                    >
                        {currentIndex + 1 === quiz.questions.length ? "Submit" : "Next"}
                    </button>
                </div>
            </div>

            <p className="mt-4 text-gray-500">
                Question {currentIndex + 1} of {quiz.questions.length}
            </p>
        </div>
    );
}