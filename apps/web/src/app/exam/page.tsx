"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import {
	Question,
	QuestionsResponse,
	GenericResponse,
	StatusResponse,
} from "../../types";

export default function ExamPage() {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [userId, setUserId] = useState<string | null>(null);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isLocked, setIsLocked] = useState(false); // Default to false for UI testing
	const [syncStatus, setSyncStatus] = useState<
		"synced" | "saving" | "unsaved" | "error"
	>("synced");

	// UI Specific State
	const [currentIndex, setCurrentIndex] = useState(0);
	const [answers, setAnswers] = useState<Record<string, string>>({});

	const syncStatusRef = useRef(syncStatus);
	useEffect(() => {
		syncStatusRef.current = syncStatus;
	}, [syncStatus]);

	// Load Data & Initial Answers
	useEffect(() => {
		
		const loadData = async () => {
			const id = localStorage.getItem("studentId");
			setUserId(id);
			try {
				// Mocking fetch for UI demonstration, replace with your actual API
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/questions`,
				).catch(() => null);
				let data = res ? await res.json() : null;

				if (data?.success) {
					setQuestions(data.questions);
					// Load existing answers from localStorage
					const loadedAnswers: Record<string, string> = {};
					data.questions.forEach((q: Question) => {
						const saved = localStorage.getItem(`answer_${q.id}`);
						if (saved) loadedAnswers[q.id] = saved;
					});
					setAnswers(loadedAnswers);
				}
			} catch (error) {
				console.error("Failed to load questions:", error);
			}
		};
		loadData();
	}, []);

	// Sync Logic (Retained from your code)
	const saveToCloud = useCallback(async () => {
		const currentUserId = userId || localStorage.getItem("studentId");
		if (isLocked || !currentUserId || questions.length === 0) return;

		setSyncStatus("saving");
		try {
			const savePromises = questions.map((q) => {
				const val = localStorage.getItem(`answer_${q.id}`) || "";
				return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save`, {
					method: "POST",
					body: JSON.stringify({
						userId: currentUserId,
						questionId: q.id,
						value: val,
					}),
					headers: { "Content-Type": "application/json" },
					keepalive: true,
				});
			});

			const results = await Promise.all(savePromises);
			if (results.every((res) => res.ok)) setSyncStatus("synced");
			else setSyncStatus("error");
		} catch (error) {
			setSyncStatus("error");
		}
	}, [isLocked, userId, questions]);

	useEffect(() => {
		const handleVisibilityChange = () => {
			if (
				document.visibilityState === "hidden" &&
				syncStatusRef.current === "unsaved"
			) {
				saveToCloud();
			}
		};

		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			if (syncStatusRef.current === "unsaved") {
				saveToCloud();
				e.preventDefault();
				e.returnValue = "";
			}
		};

		window.addEventListener("visibilitychange", handleVisibilityChange);
		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("visibilitychange", handleVisibilityChange);
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [saveToCloud]);

	useEffect(() => {
		console.log("DATABASE_URL =", process.env.DATABASE_URL);
		const checkStatus = async () => {
			if (document.hidden) return;
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/exam-status`,
				);
				const data = (await res.json()) as StatusResponse;
				if (data.success) setIsLocked(!data.active);
			} catch (err) {
				console.error("Status check failed:", err);
			}
		};
		checkStatus();
		const timer = setInterval(checkStatus, 3000);
		return () => clearInterval(timer);
	}, []);

	const handleTextChange = (
    questionId: string,
    value: string,
    isMcq: boolean = false,
) => {
    if (isLocked) return;
    localStorage.setItem(`answer_${questionId}`, value);
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    
    setSyncStatus("unsaved");
    if (isMcq) {
        saveToCloud();
    }
};

	const handleSubmit = async () => {
		if (!confirm("Are you sure? This will finalize your submission.")) return;
		await saveToCloud();

		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/submit`, {
				method: "POST",
				body: JSON.stringify({ userId }),
				headers: { "Content-Type": "application/json" },
			});
			const data = (await res.json()) as GenericResponse;
			if (data.success) {
				setIsSubmitted(true);
				questions.forEach((q) => localStorage.removeItem(`answer_${q.id}`));
				window.scrollTo(0, 0);
			}
		} catch (error) {
			alert("Final submission failed.");
		}
	};

const handleNavigateQuestion = (nextIndex: number) => {
    if (syncStatus === "unsaved") {
        saveToCloud();
    }
    setCurrentIndex(nextIndex);
};

	if (isLocked) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-[#1a0505] p-6 text-red-500">
				<h2 className="text-3xl font-black">Exam Locked</h2>
			</div>
		);
	}

	if (isSubmitted) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-[#1a0505] p-6 text-green-500">
				<h2 className="text-3xl font-black">Submitted Successfully</h2>
			</div>
		);
	}

	const currentQuestion = questions[currentIndex];
	const totalQuestions = questions.length;
	const answeredCount = Object.keys(answers).length;

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#3b0909] via-[#1a0505] to-[#0a0000] text-[#e5d5d5] font-sans selection:bg-red-900 overflow-hidden flex flex-col">
			{/* HEADER */}
			<header className="px-8 py-4 flex justify-between items-center border-b border-red-900/30 bg-black/20 backdrop-blur-md z-10">
				<div className="flex items-center gap-4 text-xs font-mono tracking-widest text-red-400/70">
					<span className="border border-red-900/50 px-2 py-1 rounded">
						CASE : EXAM PHASE
					</span>
					<span>• SIMC 27 • EXAM</span>
				</div>
				<div className="flex items-center gap-6">
					<div className="flex items-center gap-2 text-red-500 text-xs font-bold tracking-widest animate-pulse">
						<div className="w-2 h-2 rounded-full bg-red-500"></div> REC LIVE
					</div>
					<div className="text-2xl font-mono text-red-100 font-light">
						00:47:12
					</div>
					<button
						onClick={handleSubmit}
						className="border border-red-800/50 hover:bg-red-900/30 text-red-200 px-6 py-2 rounded-full text-sm transition-all flex items-center gap-2"
					>
						ส่งคำตอบทั้งหมด
					</button>
				</div>
			</header>

			{/* MAIN LAYOUT */}
			<div className="flex flex-1 overflow-hidden p-6 gap-6 max-w-[1600px] mx-auto w-full">
				{/* LEFT PANEL: QUESTION AREA */}
				<div className="flex-1 flex flex-col">
					{/* Progress Section */}
					<div className="flex items-center gap-4 mb-6">
						<h2 className="text-2xl font-light">
							ข้อ{" "}
							<span className="font-bold text-white">{currentIndex + 1}</span>{" "}
							<span className="text-red-400/50 text-lg">
								/ {totalQuestions}
							</span>
						</h2>
						<div className="flex-1 h-1.5 bg-red-950 rounded-full overflow-hidden relative">
							<div
								className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-600 to-yellow-500 transition-all duration-300"
								style={{
									width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
								}}
							></div>
						</div>
						<div className="flex gap-4 text-xs">
							<span className="flex items-center gap-1">
								<div className="w-2 h-2 rounded-full bg-teal-500"></div>{" "}
								Bookmarked 4
							</span>
							<span className="flex items-center gap-1">
								<div className="w-2 h-2 rounded-full bg-red-600"></div> Skipped
								2
							</span>
						</div>
					</div>

					{/* Question Card */}
					{currentQuestion && (
						<div className="flex-1 bg-gradient-to-b from-red-950/40 to-black/40 backdrop-blur-xl border border-red-900/30 rounded-3xl p-10 flex flex-col shadow-2xl relative overflow-hidden">
							{/* Glow Effect */}
							<div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none"></div>

							{/* Meta */}
							<div className="flex justify-between items-start mb-6">
								<span className="text-xs font-mono tracking-widest text-red-400/70 uppercase">
									Question {currentIndex + 1}
								</span>
								<div className="flex items-center gap-3">
									<span className="bg-red-900/40 border border-red-800/50 px-3 py-1 rounded-full text-sm font-mono text-red-200">
										2 pts
									</span>
								</div>
							</div>

							{/* Content */}
							<p className="text-2xl leading-relaxed text-white font-medium mb-10 text-shadow-sm">
								{currentQuestion.content}
							</p>

							{/* ส่วนแสดงพื้นที่คำตอบ (Options สำหรับ MCQ / Textarea สำหรับ MEQ) */}
							<div className="space-y-4 flex-1">
								{/* 1. กรณีคำถามเป็นแบบ MCQ (ปรนัย) */}
								{currentQuestion.type === "MCQ" && (
									<div className="space-y-3">
										{JSON.parse(currentQuestion.options || "[]").map(
											(option: string, i: number) => {
												const isSelected =
													answers[currentQuestion.id] === option;
												const label = String.fromCharCode(65 + i); // แปลงเป็น A, B, C, D

												return (
													<button
														key={option}
														onClick={() =>
															handleTextChange(currentQuestion.id, option, true)
														} //
														className={`w-full text-left flex items-center p-5 rounded-2xl border transition-all duration-200 ${
															isSelected
																? "bg-yellow-500/10 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.1)]"
																: "bg-black/20 border-red-900/30 hover:bg-red-900/20 hover:border-red-700/50"
														}`}
													>
														<div
															className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm mr-4 transition-colors ${
																isSelected
																	? "bg-yellow-500 text-black font-bold"
																	: "bg-red-950 text-red-300"
															}`}
														>
															{label}
														</div>
														<span
															className={`text-lg ${isSelected ? "text-yellow-100" : "text-red-100/80"}`}
														>
															{option}
														</span>
														{isSelected && (
															<div className="ml-auto text-yellow-500">✓</div>
														)}
													</button>
												);
											},
										)}
									</div>
								)}

								{/* 2. กรณีคำถามเป็นแบบ MEQ (เขียนตอบ/อัตนัย) */}
								{currentQuestion.type === "MEQ" && (
									<div className="relative group">
										<textarea
											// ดึงค่าคำตอบล่าสุดจาก stateanswers (หรือ fallback ไปยัง localStorage เผื่อเพิ่งโหลดหน้าใหม่)
											value={answers[currentQuestion.id] || ""}
											onChange={(e) =>
												handleTextChange(
													currentQuestion.id,
													e.target.value,
													false,
												)
											} // isMcq = false จะยังไม่ยิงขึ้น Cloud ทันทีเพื่อลดการยิง API ถี่เกินไป
											className="w-full p-6 h-64 bg-black/30 border border-red-900/30 rounded-2xl outline-none text-white text-lg placeholder-red-300/20 focus:border-red-500/50 focus:bg-red-950/10 transition-all resize-none font-sans leading-relaxed custom-scrollbar shadow-inner"
											placeholder="พิมพ์คำตอบเชิงวิเคราะห์หรือบรรยายของคุณที่นี่..."
										/>
										{/* เส้นเอฟเฟกต์เรืองแสงด้านล่างช่องพิมพ์เมื่อมีการโฟกัส */}
										<div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
											
										{/* คำแนะนำเล็กๆ ใต้ช่องพิมพ์ */}
										<div className="flex justify-between items-center mt-2 px-2 text-xs text-red-400/40">
											<span>
												* ระบบจะบันทึกร่างคำตอบของคุณลงในเครื่องอัตโนมัติ
											</span>
											<span>
												{answers[currentQuestion.id]?.length || 0} ตัวอักษร
											</span>
										</div>
									</div>
								)}
							</div>

							{/* Navigation Footer */}
							<div className="mt-8 pt-6 border-t border-red-900/30 flex justify-between items-center">
								<button
									onClick={() =>
										setCurrentIndex((prev) => Math.max(0, prev - 1))
									}
									disabled={currentIndex === 0}
									className="px-6 py-3 rounded-full text-red-300 hover:bg-red-950/50 disabled:opacity-30 transition-all flex items-center gap-2"
								>
									← ข้อก่อนหน้า
								</button>
								<div className="flex gap-4">
									<button className="px-6 py-3 rounded-full text-red-300 hover:bg-red-950/50 transition-all flex items-center gap-2 border border-transparent hover:border-red-900/50">
										⚑ Bookmark
									</button>
									<button
										onClick={() =>
											setCurrentIndex((prev) =>
												Math.min(totalQuestions - 1, prev + 1),
											)
										}
										disabled={currentIndex === totalQuestions - 1}
										className="px-8 py-3 rounded-full bg-red-700 hover:bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)] disabled:opacity-50 transition-all flex items-center gap-2"
									>
										ข้อถัดไป →
									</button>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* RIGHT PANEL: NAVIGATOR */}
				<div className="w-[340px] bg-black/40 backdrop-blur-xl border border-red-900/30 rounded-3xl p-6 flex flex-col relative">
					<h3 className="text-xs font-mono tracking-widest text-red-400/70 mb-1">
						NAVIGATOR
					</h3>
					<p className="text-lg text-white mb-6">50 ข้อ • จัดเรียงตามหมวด</p>

					{/* Grid Container (Scrollable) */}
					<div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
						<div className="grid grid-cols-5 gap-2">
							{questions.map((q, i) => {
								const isCurrent = currentIndex === i;
								const isAnswered = !!answers[q.id];

								// Determine styling based on state
								let styleClass =
									"bg-red-950/40 border-red-900/30 text-red-300 hover:bg-red-900/50"; // Default
								if (isCurrent)
									styleClass =
										"bg-yellow-500 text-black font-bold shadow-[0_0_10px_rgba(234,179,8,0.4)]";
								else if (isAnswered)
									styleClass =
										"bg-teal-500/20 border-teal-500/30 text-teal-300";

								return (
									<button
										key={q.id}
										onClick={() => handleNavigateQuestion(i)}
										className={`aspect-square rounded-lg border flex items-center justify-center text-sm transition-all ${styleClass}`}
									>
										{String(i + 1).padStart(2, "0")}
									</button>
								);
							})}
						</div>
					</div>

					{/* Legend */}
					<div className="mt-6 pt-6 border-t border-red-900/30 space-y-2 text-sm text-red-200/70">
						<div className="flex items-center gap-3">
							<div className="w-3 h-3 rounded bg-teal-500/40 border border-teal-500/50"></div>{" "}
							ตอบแล้ว • {answeredCount}
						</div>
						<div className="flex items-center gap-3">
							<div className="w-3 h-3 rounded bg-yellow-500"></div> กำลังทำ • 1
						</div>
						<div className="flex items-center gap-3">
							<div className="w-3 h-3 rounded bg-red-900/80 border border-red-500/50"></div>{" "}
							Bookmark • 4
						</div>
						<div className="flex items-center gap-3">
							<div className="w-3 h-3 rounded bg-black border border-red-900/50"></div>{" "}
							ข้ามไว้ • 2
						</div>
					</div>
				</div>
			</div>

			{/* FOOTER BAR */}
			<footer className="px-8 py-2 border-t border-red-900/30 text-[10px] text-red-500/50 font-mono flex justify-between items-center bg-black/40">
				<div>HOTKEYS • 1-4 ตอบ • → ถัดไป • ← ย้อน • B Bookmark • ESC ออก</div>
				<div className="flex items-center gap-2">
					กำลังเชื่อมต่อกับ proctor server •{" "}
					{syncStatus === "synced" ? (
						<span className="text-teal-500">เสถียร</span>
					) : (
						<span className="text-yellow-500 animate-pulse">กำลังซิงค์...</span>
					)}
				</div>
			</footer>
		</div>
	);
}
