// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  error?: string;
}

export interface Question {
  id: string;
  content: string;
  type: 'MCQ' | 'MEQ';
  order: number;
  options?: string;
}

export interface QuestionsResponse {
  success: boolean;
  questions: Question[];
  error?: string;
}

export interface SaveAnswerRequest {
  userId: string;
  questionId: string;
  value: string;
}

export interface GenericResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface Answer {
  id: string;
  questionId: string;
  value: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  status: string;
  answers: Answer[];
}

export interface AdminResultsResponse {
  success: boolean;
  data: Student[];
}

export interface StatusResponse {
  success: boolean;
  active: boolean;
}

export interface ApiResponse {
  success: boolean;
  data: Student[];
  error?: string;
}

export interface MonitorStudent {
  id: string;
  studentId: string;
  name: string;
  answerCount: number;
  isSubmitted: boolean;
  lastActive: string | null;
}

export interface MonitorResponse {
  success: boolean;
  students: MonitorStudent[];
  totalQuestions: number;
}

export interface StudentDetailResponse {
  success: boolean;
  student: {
    name: string;
    studentId: string;
  };
  answers: Array<{
    questionId: string;
    questionContent: string;
    answerValue: string;
    score: number;
  }>;
}