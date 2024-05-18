export class SessionOptions {
  quizTypeId: string;
  userId: string;
  questionSequence: Array<string>;
  duration?: number;
  attempts?: number;
}