import { Hono } from "hono";
import { cors } from "hono/cors";
import type { ApiHealth } from "@simc/shared";
import type { Env } from "./env";
import { profileRoutes } from "./routes/profile";
import { stripeRoutes } from "./routes/stripe";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq, asc, sql } from "drizzle-orm";
import * as schema from "./db/schema";

const app = new Hono<{ Bindings: Bindings }>();

app.use(
	"*",
	cors({
		origin: (origin) => origin ?? "*",
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
		credentials: true,
	}),
);

app.get("/health", (c) => {
	const body: ApiHealth = {
		ok: true,
		service: "simc-api",
		timestamp: new Date().toISOString(),
	};
	return c.json(body);
});

app.route("/profile", profileRoutes);
app.route("/stripe", stripeRoutes);

type Bindings = {
	DATABASE_URL: string;
};

app.use("/api/*", cors());

app.get("/", (c) => c.text("SIMC API is Live! 🚀"));

app.post("/api/login", async (c) => {
	const { email, name } = await c.req.json();
	const client = postgres(c.env.DATABASE_URL);
	const db = drizzle(client, { schema });

	try {
		const existingUser = await db.query.users.findFirst({
			where: eq(schema.users.email, email),
		});

		if (existingUser) return c.json({ success: true, user: existingUser });

		const newUser = await db
			.insert(schema.users)
			.values({
				email: email,
				name: name,
				studentId: email,
			})
			.returning();

		return c.json({ success: true, user: newUser[0] });
	} catch (err: any) {
		return c.json({ success: false, error: err.message }, 500);
	} finally {
		await client.end();
	}
});

// 2. Get Questions
app.get("/api/questions", async (c) => {
	const client = postgres(c.env.DATABASE_URL);
	const db = drizzle(client, { schema });
	try {
		const allQuestions = await db.query.questions.findMany({
			orderBy: [asc(schema.questions.order)],
		});
		return c.json({ success: true, questions: allQuestions });
	} catch (err: any) {
		return c.json({ success: false, error: err.message }, 500);
	} finally {
		await client.end();
	}
});

// 3. Autosave Answer
app.post("/api/save", async (c) => {
	const { userId, questionId, value } = await c.req.json();
	const client = postgres(c.env.DATABASE_URL);
	const db = drizzle(client, { schema });

	try {
		const question = await db.query.questions.findFirst({
			where: eq(schema.questions.id, questionId),
		});

		let calculatedScore = 0;
		if (question?.type === "MCQ") {
			calculatedScore = value === question.correctAnswer ? 1 : 0;
		}

		await db
			.insert(schema.answers)
			.values({ userId, questionId, value, score: calculatedScore })
			.onConflictDoUpdate({
				target: [schema.answers.userId, schema.answers.questionId],
				set: {
					value,
					score: calculatedScore,
					updatedAt: new Date(),
				},
			});

		return c.json({ success: true });
	} catch (err: any) {
		return c.json({ success: false, error: err.message }, 500);
	} finally {
		await client.end();
	}
});

// 4. Final Submit
app.post("/api/submit", async (c) => {
	const { userId } = await c.req.json();
	const client = postgres(c.env.DATABASE_URL);
	const db = drizzle(client, { schema });
	try {
		await db
			.update(schema.users)
			.set({ isSubmitted: true })
			.where(eq(schema.users.id, userId));
		return c.json({ success: true });
	} catch (err: any) {
		return c.json({ success: false, error: err.message }, 500);
	} finally {
		await client.end();
	}
});

// 5. Admin Results (The one you were stuck on!)
app.get("/api/admin/results", async (c) => {
	const client = postgres(c.env.DATABASE_URL);
	const db = drizzle(client, { schema });
	try {
		const allResults = await db.query.users.findMany({
			where: eq(schema.users.role, "student"),
			with: {
				answers: true,
			},
		});
		return c.json({ success: true, data: allResults });
	} catch (err: any) {
		return c.json({ success: false, error: err.message }, 500);
	} finally {
		await client.end();
	}
});

// Create a new question
app.post("/api/admin/questions", async (c) => {
	// 1. EXTRACT the new fields from the JSON body
	const { content, type, order, options, correctAnswer } = await c.req.json();
	const client = postgres(c.env.DATABASE_URL);
	const db = drizzle(client, { schema });

	try {
		const newQuestion = await db
			.insert(schema.questions)
			.values({
				content,
				type,
				order,
				options,
				correctAnswer,
			})
			.returning();

		return c.json({ success: true, question: newQuestion[0] });
	} catch (err: any) {
		console.error("API Error:", err);
		return c.json({ success: false, error: err.message }, 500);
	} finally {
		await client.end();
	}
});

// Delete a question (and its associated answers)
app.delete("/api/admin/questions/:id", async (c) => {
	const id = c.req.param("id");
	const client = postgres(c.env.DATABASE_URL);
	const db = drizzle(client, { schema });

	try {
		await db.delete(schema.answers).where(eq(schema.answers.questionId, id));
		await db.delete(schema.questions).where(eq(schema.questions.id, id));
		return c.json({ success: true });
	} catch (err: any) {
		console.error("Delete Error:", err);
		return c.json({ success: false, error: err.message }, 500);
	} finally {
		await client.end();
	}
});

app.on(["PUT", "PATCH"], "/api/admin/questions/:id", async (c) => {
	const id = c.req.param("id");
	const body = await c.req.json();
	const client = postgres(c.env.DATABASE_URL);
	const db = drizzle(client, { schema });

	try {
		const updateData: any = {};

		if (body.content !== undefined) updateData.content = body.content;
		if (body.type !== undefined) updateData.type = body.type;
		if (body.order !== undefined) updateData.order = body.order;
		if (body.options !== undefined) updateData.options = body.options;

		const result = await db
			.update(schema.questions)
			.set(updateData)
			.where(eq(schema.questions.id, id))
			.returning();

		if (result.length === 0) {
			return c.json({ success: false, error: "Question not found" }, 404);
		}

		return c.json({ success: true, question: result[0] });
	} catch (err: any) {
		console.error("Update Error:", err);
		return c.json({ success: false, error: err.message }, 500);
	} finally {
		await client.end();
	}
});

// Get current exam status
app.get("/api/exam-status", async (c) => {
	try {
		const client = postgres(c.env.DATABASE_URL);
		const db = drizzle(client, { schema });

		const exam = await db.query.exams.findFirst();

		return c.json({
			success: true,
			active: exam?.active || false,
		});
	} catch (err) {
		console.error(err);

		return c.json(
			{
				success: false,
				error: String(err),
			},
			500,
		);
	}
});

// Toggle exam status (Admin only)
app.post("/api/admin/toggle-exam", async (c) => {
	const { active } = await c.req.json();
	const client = postgres(c.env.DATABASE_URL);
	const db = drizzle(client, { schema });
	try {
		const exam = await db.query.exams.findFirst();
		if (exam) {
			await db
				.update(schema.exams)
				.set({ active })
				.where(eq(schema.exams.id, exam.id));
		}
		return c.json({ success: true, active });
	} finally {
		await client.end();
	}
});

app.get("/api/admin/monitor", async (c) => {
	const client = postgres(c.env.DATABASE_URL);
	const db = drizzle(client, { schema });

	try {
		const allStudents = await db
			.select()
			.from(schema.users)
			.where(eq(schema.users.role, "student"));
		const allAnswers = await db.select().from(schema.answers);
		const questions = await db.select().from(schema.questions);

		const monitorData = allStudents.map((student) => {
			const studentAnswers = allAnswers.filter(
				(a) => a.userId === student.studentId,
			);
			return {
				id: student.id,
				studentId: student.studentId,
				name: student.name,
				isSubmitted: student.isSubmitted,
				answerCount: studentAnswers.length,
				lastActive: studentAnswers.length > 0 ? "Active" : "Idle",
			};
		});

		return c.json({
			success: true,
			students: monitorData,
			totalQuestions: questions.length, // Crucial for the "Progress" display
		});
	} finally {
		await client.end();
	}
});

app.get("/api/admin/student-detail/:id", async (c) => {
	const id = c.req.param("id");
	const client = postgres(c.env.DATABASE_URL);
	const db = drizzle(client, { schema });

	try {
		const student = await db.query.users.findFirst({
			where: eq(schema.users.id, id),
		});

		if (!student)
			return c.json({ success: false, error: "Student not found" }, 404);

		const studentAnswers = await db.query.answers.findMany({
			where: eq(schema.answers.userId, id),
		});

		const allQuestions = await db.query.questions.findMany();

		const answersWithContent = allQuestions.map((q) => {
			const ans = studentAnswers.find((a) => a.questionId === q.id);
			return {
				questionId: q.id,
				questionContent: q.content,
				type: q.type,
				answerValue: ans?.value || "",
				score: ans?.score || 0,
			};
		});

		return c.json({ success: true, student, answers: answersWithContent });
	} catch (err: any) {
		return c.json({ success: false, error: err.message }, 500);
	} finally {
		await client.end();
	}
});

app.post("/api/admin/grade", async (c) => {
	const { userId, questionId, score } = await c.req.json();
	const client = postgres(c.env.DATABASE_URL);
	const db = drizzle(client, { schema });

	try {
		await db
			.insert(schema.answers)
			.values({
				userId,
				questionId,
				score: parseInt(score),
				value: "",
			})
			.onConflictDoUpdate({
				target: [schema.answers.userId, schema.answers.questionId],
				set: { score: parseInt(score) },
			});

		return c.json({ success: true });
	} catch (err: any) {
		console.error("Grading Error:", err);
		return c.json({ success: false, error: err.message }, 500);
	} finally {
		await client.end();
	}
});

app.get("/api/admin/results", async (c) => {
	const client = postgres(c.env.DATABASE_URL);
	const db = drizzle(client, { schema });

	try {
		const results = await db
			.select({
				id: schema.users.id,
				name: schema.users.name,
				studentId: schema.users.studentId,
				email: schema.users.email,
				mcqScore:
					sql<number>`CAST(COALESCE(SUM(CASE WHEN ${schema.questions.type} = 'MCQ' THEN ${schema.answers.score} ELSE 0 END), 0) AS INTEGER)`.as(
						"mcqScore",
					),
				meqScore:
					sql<number>`CAST(COALESCE(SUM(CASE WHEN ${schema.questions.type} = 'MEQ' THEN ${schema.answers.score} ELSE 0 END), 0) AS INTEGER)`.as(
						"meqScore",
					),
				totalScore:
					sql<number>`CAST(COALESCE(SUM(${schema.answers.score}), 0) AS INTEGER)`.as(
						"totalScore",
					),
				answeredCount:
					sql<number>`CAST(COUNT(${schema.answers.id}) AS INTEGER)`.as(
						"answeredCount",
					),
			})
			.from(schema.users)
			.leftJoin(schema.answers, eq(schema.users.id, schema.answers.userId))
			.leftJoin(
				schema.questions,
				eq(schema.answers.questionId, schema.questions.id),
			)
			.groupBy(
				schema.users.id,
				schema.users.name,
				schema.users.studentId,
				schema.users.email,
			)
			.orderBy(sql`total_score DESC NULLS LAST`);

		return c.json({
			success: true,
			data: results,
		});
	} catch (err: any) {
		console.error("Results API Error:", err);
		return c.json(
			{
				success: false,
				error: err.message || "Failed to fetch results",
			},
			500,
		);
	} finally {
		await client.end();
	}
});

export default app;
