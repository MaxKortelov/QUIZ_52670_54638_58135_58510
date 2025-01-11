import {bufferToJson, readFileSync} from "../utils/fs.util";
import {ChatQA, ChatQAPatterns} from "../types/chat";
import {addChatQuestions, getAllChatQA, getChatQuestions, saveQAPatternsToDB} from "../db/chat";
import {clearText, toFlexiblePattern, toNaturalPattern} from "../utils/text.util";
import {getPercentage} from "../utils/math.util";
import {kmpSearch} from "../utils/algorithms.util";
import {findHighestNumberIndexes} from "../utils/search.util";
import {MatchResult} from "../types/services/chat.service";

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
        await getAllChatQA();
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

export async function findBestMatch(prompt: string): Promise<ChatQAPatterns | undefined> {
    const qa = await getAllChatQA();
    const patterns = qa.map(it => it.questionPattern);

    const flexibleMatchResult = findBestFlexibleMatch(patterns, prompt);
    const naturalMatchResult = findBestNaturalMatch(patterns, prompt);

    const bestResult = findHighestPercentage([flexibleMatchResult, naturalMatchResult]);
    return qa[bestResult.indexAnswer];
}

export function findBestFlexibleMatch(patterns: string[], prompt: string): MatchResult {
    const clearedPrompt = toFlexiblePattern(prompt);

    const results = patterns.map(pattern => getPercentage(kmpSearch(clearedPrompt, pattern), pattern.length));

    const bestResults = findHighestNumberIndexes(results, 4).filter(it => results[it] > 0);

    return {indexAnswer: bestResults[0] || -1, matchPercentage: results[bestResults[0] || -1]};
}

export function findBestNaturalMatch(patterns: string[], prompt: string): MatchResult {
    const clearedPrompt = toNaturalPattern(prompt);

    const results = patterns.map(pattern => getPercentage(kmpSearch(clearedPrompt, pattern), pattern.length));

    const bestResults = findHighestNumberIndexes(results, 4).filter(it => results[it] > 0);

    return {indexAnswer: bestResults[0], matchPercentage: results[bestResults[0]]};
}

function findHighestPercentage(results: MatchResult[]): MatchResult {
    let bestResult = results[0];

    for (const result of results) {
        if(result.matchPercentage > bestResult.matchPercentage) {
            bestResult = result;
        }
    }

    return bestResult;
}