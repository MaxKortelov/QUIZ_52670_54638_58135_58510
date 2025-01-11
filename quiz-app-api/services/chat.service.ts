import {bufferToJson, readFileSync} from "../utils/fs.util";
import {ChatQA} from "../types/chat";
import {addChatQuestions, getChatQA, getChatQuestions, saveQAPatternsToDB} from "../db/chat";
import {toFlexiblePattern, toNaturalPattern} from "../utils/text.util";

export async function loadInitialChatQA() {
    const { QA } = bufferToJson(readFileSync("assets/chatQA.json")) as unknown as { QA: ChatQA[] };
    await saveQuestionsToDB(QA);
    await saveQAPatterns(QA);
}

async function saveQuestionsToDB(questions: ChatQA[]) {
    try {
        await getChatQuestions()
    } catch (_) {
        const mappedQuestions = questions.map(it => it.question)
        await addChatQuestions(mappedQuestions);
        console.log(`Chat questions added to database`);
    }
}

async function saveQAPatterns(questions: ChatQA[]) {
    try {
        await getChatQA();
    } catch (_) {
        const qa = await generateQAPatterns(questions);

        console.log("Adding patterns to DB");
        await saveQAPatternsToDB(qa);
        console.log("Patterns added to DB");
    }
}

async function generateQAPatterns(questions: ChatQA[]): Promise<ChatQA[]> {
    console.log("Creating flexible patterns...");
    const flexiblePatternQA = questions.map(it => ({...it, question: toFlexiblePattern(it.question)}));
    console.log("Flexible patterns created");
    console.log("Creating natural patterns...");
    const naturalPatternQA = questions.map(it => ({...it, question: toNaturalPattern(it.question)}));
    console.log("Natural patterns created");

    return [...flexiblePatternQA, ...naturalPatternQA];
}