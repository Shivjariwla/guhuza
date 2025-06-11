import { useLang } from "@/app/context/langContext";

interface QuizQuestion {
    question: string;
    comment: string;
    test_answer: number;
    answers: string[];
}

interface QuizTestGroup {
    test_group: number;
    next_test_group: number;
    question: QuizQuestion[];
}

interface QuizApiResponse {
    test: QuizTestGroup;
}

// Runtime browser-side translation function
const translateText = async (text: string, targetLang: string): Promise<string> => {
    if (targetLang === "en") return text;

    try {
        const res = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(
                text
            )}`
        );
        const data = await res.json();
        return data[0][0][0]; // Extracted translated string
    } catch (e) {
        console.error("Translation error:", e);
        return text;
    }
};

// Translates each quiz question object
const translateQuizData = async (
    quiz: QuizApiResponse,
    lang: string
): Promise<QuizApiResponse> => {
    const translatedQuestions = await Promise.all(
        quiz.test.question.map(async (q) => ({
            ...q,
            question: await translateText(q.question, lang),
            comment: await translateText(q.comment, lang),
            answers: await Promise.all(q.answers.map((ans) => translateText(ans, lang))),
        }))
    );

    return {
        test: {
            ...quiz.test,
            question: translatedQuestions,
        },
    };
};

// ✅ FINAL: Call this in page
export const fetchQuiz = async (
    level: string,
    lang: "en" | "fr" = "en"
): Promise<QuizApiResponse> => {
    const res = await fetch(`https://api-ghz-v2.azurewebsites.net/api/v2/quiz?level=${level}`);
    if (!res.ok) throw new Error("Failed to fetch quiz");
    const quiz = await res.json();

    if (lang === "fr") {
        return await translateQuizData(quiz, "fr");
    }

    return quiz;
};
