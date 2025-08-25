import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { apiRoutes } from '../../utils/apiRoutes';

export const getQuizzes = createAsyncThunk(
  'teacher/getQuizzes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(apiRoutes.getQuizzes);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Fetching quizzes failed');
    }
  }
);

export const createQuiz = createAsyncThunk(
  'teacher/createQuiz',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(apiRoutes.createQuiz, payload);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Fetching quizzes failed');
    }
  }
);

export const deleteQuiz = createAsyncThunk(
  'teacher/deleteQuiz',
  async (quizId, { rejectWithValue }) => {
    try {
      const response = await api.delete(apiRoutes.deleteQuiz(quizId));
      if (response.status === 200) {
        return quizId;
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Fetching quizzes failed');
    }
  }
);

// @ts-ignore
const teacherSlice = createSlice({
  name: 'teacher',
  initialState: {
    getQuizzesStatus: 'idle',
    createQuizStatus: 'idle',
    deleteQuizStatus: 'idle',
    error: null,
    quizzes: [],
    questions: [],
  },
  reducers: {
    addQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
    removeQuestion: (state, action) => {
      state.questions = state.questions.filter(question => question.questionId != action.payload);
    },
    resetTeacherStatuses: state => {
      state.getQuizzesStatus = 'idle';
      state.createQuizStatus = 'idle';
      state.deleteQuizStatus = 'idle';
      state.error = null;
    },
    clearQuestions: state => {
      state.questions = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getQuizzes.pending, state => {
        state.getQuizzesStatus = 'loading';
        state.error = null;
      })
      .addCase(getQuizzes.fulfilled, (state, action) => {
        state.getQuizzesStatus = 'succeeded';
        state.quizzes = action.payload;
      })
      .addCase(getQuizzes.rejected, (state, action) => {
        state.getQuizzesStatus = 'failed';
        // @ts-ignore
        state.error = action.payload || 'Failed to fetch quizzes';
      })
      .addCase(createQuiz.pending, state => {
        state.createQuizStatus = 'loading';
        state.error = null;
      })
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.createQuizStatus = 'succeeded';
        state.quizzes.push(action.payload);
        // @ts-ignore
        state.questions = [];
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.createQuizStatus = 'failed';
        // @ts-ignore
        state.error = action.payload || 'Failed to create quiz';
      })
      .addCase(deleteQuiz.pending, state => {
        state.deleteQuizStatus = 'loading';
        state.error = null;
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.deleteQuizStatus = 'succeeded';
        state.quizzes = state.quizzes.filter(
          quiz => quiz.id !== action.payload
        );
      })
      .addCase(deleteQuiz.rejected, (state, action) => {
        state.deleteQuizStatus = 'failed';
        // @ts-ignore
        state.error = action.payload || 'Failed to delete quiz';
      });
  },
});

export default teacherSlice.reducer;
export const { resetTeacherStatuses, addQuestion, clearQuestions } = teacherSlice.actions;
