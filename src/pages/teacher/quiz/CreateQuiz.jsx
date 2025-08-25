// @ts-nocheck
import {
    IconButton,
} from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import QuizDetails from './components/QuizDetails';
import { useNavigate } from 'react-router-dom';
import McqQuestion from './components/McqQuestion';
import TextQuestion from './components/TextQuestion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestion, createQuiz } from '../../../redux/reducers/teacherSlice';
import { number } from 'yup';

export default function CreateQuiz() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [questionType, setQuestionType] = useState(null);
    const [showQuestionModal, setShowQuestionModal] = useState(false);

    const { questions, createQuizStatus } = useSelector(state => state.teacher);

    const [quizMeta, setQuizMeta] = useState({});

    const handleCreateQuiz = () => {
        if (!quizMeta.title || !quizMeta.startTime || !quizMeta.durationInMinutes || !quizMeta.year) {
            alert('Please fill all quiz details.');
            return;
        }

        if (questions.length === 0) {
            alert('Please add at least one question.');
            return;
        }

        const payload = {
            ...quizMeta,
            questions: questions.map(q => ({
                question: q.question,
                type: q.type,
                options: q.options || [],
                answer: q.answer instanceof number ? q.answer.toString() : q.answer,
            })),
        };

        console.log(payload);

        dispatch(createQuiz(payload));
    };

    useEffect(() => {
        if (createQuizStatus === 'succeeded') {
            navigate('/dashboard');
        }
    }, [createQuizStatus])

    const handleAddQuestion = () => {
        const type = window.prompt(
            "Enter question type: 'TEXT' or 'MCQ'"
        );
        if (type === 'TEXT' || type === 'MCQ') {
            setQuestionType(type);
            setShowQuestionModal(true);
        } else {
            alert('Invalid type, please enter TEXT or MCQ.');
        }
    };

    const handleConfirmQuestion = (newQuestion) => {
        dispatch(addQuestion(newQuestion));
        setShowQuestionModal(false);
        setQuestionType(null);
    };

    const handleCancelQuestion = () => {
        setShowQuestionModal(false);
        setQuestionType(null);
    };


    return (
        <div className="w-full h-full">
            <header className="shadow-2xl h-[15%] mb-20">
                <div className="flex flex-row justify-between items-center px-10 h-full text-black">
                    <div className="flex flex-row items-center space-x-4">
                        <IconButton
                            sx={{ width: 48, height: 48, borderRadius: '50%', padding: 0 }}
                            onClick={() => navigate('/dashboard')}
                        >
                            <ArrowLeft size={35} />
                        </IconButton>
                        <h1 className="text-3xl font-semibold">Create New Quiz</h1>
                    </div>

                    <div className="flex flex-row items-center space-x-20">
                        <div className="flex items-center">
                            <button className="small" onClick={() => { handleCreateQuiz() }}>Save</button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex justify-center mb-20">
                <QuizDetails onChange={setQuizMeta} />
            </div>

            <div className="flex justify-center mb-6">
                <button onClick={handleAddQuestion}>Add Question</button>
            </div>

            {showQuestionModal && questionType === 'TEXT' && (
                <TextQuestion onConfirm={handleConfirmQuestion} onCancel={handleCancelQuestion} />
            )}
            {showQuestionModal && questionType === 'MCQ' && (
                <McqQuestion onConfirm={handleConfirmQuestion} onCancel={handleCancelQuestion} />
            )}

            <div className="flex flex-col items-center space-y-4">
                {questions.map((q, idx) => (
                    <div key={idx} className="w-4/5 p-4 border rounded shadow bg-gray-50 text-black">
                        <strong>{q.type}</strong>: {q.question}
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-6">
                <button className="bg-green-500 text-white px-6 py-2 rounded" onClick={handleCreateQuiz}>
                    Save Quiz
                </button>
            </div>
        </div>
    );
}
