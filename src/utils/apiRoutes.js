export const apiRoutes = {
  register: '/auth/register',
  login: '/auth/login',
  logout: '/auth/logout',
  createQuiz: '/teacher/quiz',
  getQuizzes: '/teacher/quizzes',
  deleteQuiz: quizId => `/teacher/quiz/${quizId}`,
  getQuizzesStudent: '/student/quizzes',
  submitQuiz: quizId => `/student/quiz/${quizId}/submit`,
};
