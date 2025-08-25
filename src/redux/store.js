import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice';
import teacherSlice from './reducers/teacherSlice';
import studentSlicer from './reducers/studentSlicer';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    teacher: teacherSlice,
    student: studentSlicer
  },
});
