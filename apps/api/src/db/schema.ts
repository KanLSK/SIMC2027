import { pgTable, uuid, text, timestamp, boolean, integer, pgEnum, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const roleEnum = pgEnum('role', ['student', 'admin', 'superadmin']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  status: text('status').default('pending'), 
  studentId: text('student_id').notNull().unique(), 
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  role: text('role').default('student'),
  isSubmitted: boolean('is_submitted').default(false), 
  createdAt: timestamp('created_at').defaultNow(),
});

export const exams = pgTable('exams', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  active: boolean('active').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const questions = pgTable('questions', {
  id: uuid('id').primaryKey().defaultRandom(),
  content: text('content').notNull(),
  type: text('type').default('MEQ').notNull(),
  options: text('options'), 
  correctAnswer: text('correct_answer'), 
  order: integer('order').notNull(),
});

export const answers = pgTable('answers', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  questionId: uuid('question_id').notNull(),
  value: text('value').notNull(),
  score: integer('score').default(0),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => {
  return {
    userQuestionIndex: uniqueIndex('user_question_idx').on(table.userId, table.questionId),
  };
});

export const usersRelations = relations(users, ({ many }) => ({
  answers: many(answers),
}));

export const answersRelations = relations(answers, ({ one }) => ({
  
  user: one(users, {
    fields: [answers.userId],
    references: [users.id],
  }),
  question: one(questions, {
    fields: [answers.questionId],
    references: [questions.id],
  }),
}));