import {bufferToJson, readFileSync} from "../utils/fs.util";
import {ChatQA} from "../types/chat";
import {addChatQuestions, getChatQuestions} from "../db/chat";

export async function loadInitialChatQA() {
    const { QA } = bufferToJson(readFileSync("assets/chatQA.json")) as unknown as { QA: ChatQA[] };
    const mappedQuestions = QA.map(it => it.question)

    try {
        await getChatQuestions()
    } catch (_) {
        await addChatQuestions(mappedQuestions);
        console.log(`Chat QA added to database`);
    }
}