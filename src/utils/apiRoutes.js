export const apiRoutes = {
  register: '/auth/register',
  login: '/auth/login',
  logout: '/auth/logout',
  createQuiz: '/teacher/quiz',
  getQuizzes: '/teacher/quiz',
  deleteQuiz: quizId => `/teacher/quiz/${quizId}`,
  getQuizzesStudent: '/student/quiz',
  submitQuiz: quizId => `/student/quiz/${quizId}/submit`,
};
