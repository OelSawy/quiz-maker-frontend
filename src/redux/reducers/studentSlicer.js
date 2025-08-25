// @ts-nocheck
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { apiRoutes } from '../../utils/apiRoutes';

export const getQuizzesStudent = createAsyncThunk(
    'student/getQuizzesStudent',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(apiRoutes.getQuizzesStudent);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || 'Fetching quizzes failed');
        }
    }
);

export const submitQuiz = createAsyncThunk(
    'student/submitQuiz',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await api.post(apiRoutes.submitQuiz(payload.id), payload);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || 'Fetching quizzes failed');
        }
    }
);

const studentSlice = createSlice({
    name: 'student',
    initialState: {
        getQuizzesStudentStatus: 'idle',
        submitQuizStatus: 'idle',
        error: null,
        quizzes: [],
        answers: [],
    },
    reducers: {
        resetStudentStatuses: state => {
            state.getQuizzesStudentStatus = 'idle';
            state.submitQuizStatus = 'idle';
            state.error = null;
        },
        clearAnswers: state => {
            state.answers = [];
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getQuizzesStudent.pending, state => {
                state.getQuizzesStudentStatus = 'loading';
                state.error = null;
            })
            .addCase(getQuizzesStudent.fulfilled, (state, action) => {
                state.getQuizzesStudentStatus = 'succeeded';
                state.quizzes = action.payload;
            })
            .addCase(getQuizzesStudent.rejected, (state, action) => {
                state.getQuizzesStudentStatus = 'failed';
                // @ts-ignore
                state.error = action.payload || 'Failed to fetch quizzes';
            })
            .addCase(submitQuiz.pending, state => {
                state.submitQuizStatus = 'loading';
                state.error = null;
            })
            .addCase(submitQuiz.fulfilled, (state, action) => {
                state.submitQuizStatus = 'succeeded';
                state.quizzes.push(action.payload);
                // @ts-ignore
                state.answers = [];
            })
            .addCase(submitQuiz.rejected, (state, action) => {
                state.submitQuizStatus = 'failed';
                // @ts-ignore
                state.error = action.payload || 'Failed to submit quiz';
            })
    },
});

export default studentSlice.reducer;
export const { resetStudentStatuses } = studentSlice.actions;