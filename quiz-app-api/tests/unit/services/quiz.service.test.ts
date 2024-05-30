import {
  answer,
  mockEmptyQuizSessionDB,
  mockQuestionDB,
  mockQuizSessionDB,
  mockSaveQuizQuestion,
  newQuizTest,
  questionWithAnswerDB
} from "../../mocks/quiz.mock";
import {
  addAnswers,
  addQuestions,
  addQuizQuestionAnswer,
  calculateBestQuizSession,
  createQuizSession,
  findNextQuizQuestion,
  initiateQuizSession,
  loadInitialQuizzes
} from '../../../services/quiz.service';
import {
  addAnswer,
  addCorrectAnswersToQuestion,
  addQuestion,
  addQuestionAnswer,
  addQuestionType,
  findEmptyQuizSession,
  getQuizQuestions,
  getQuizSession,
  getQuizType,
  getQuizTypeById,
  startQuizSession
} from "../../../db/quiz";
import {bufferToJson, listFilesSync} from "../../../utils/fs.util";

jest.mock('../../../db/quiz', () => ({
  addQuestion: jest.fn().mockReturnValue("test question id"),
  addCorrectAnswersToQuestion: jest.fn(),
  addAnswer: jest.fn().mockReturnValue(answer()),
  getQuizType: jest.fn().mockReturnValueOnce(true).mockReturnValue(false),
  addQuestionType: jest.fn().mockReturnValue("testId"),
  getQuizQuestions: jest.fn().mockReturnValue([mockQuestionDB]),
  findEmptyQuizSession: jest.fn().mockReturnValueOnce(mockQuizSessionDB).mockReturnValue(undefined),
  addQuizSession: jest.fn().mockReturnValue(mockQuizSessionDB),
  getQuizTypeById: jest.fn().mockReturnValue({description: "test description"}),
  getQuizSession: jest.fn().mockReturnValueOnce(mockQuizSessionDB).mockReturnValueOnce(mockQuizSessionDB).mockReturnValueOnce(mockQuizSessionDB).mockReturnValue(mockEmptyQuizSessionDB),
  startQuizSession: jest.fn().mockReturnValue(Promise.resolve()),
  getQuizQuestion: jest.fn().mockReturnValue(questionWithAnswerDB),
  addQuestionAnswer: jest.fn()
}));

jest.mock('../../../utils/fs.util', () => ({
  listFilesSync: jest.fn().mockReturnValue(["file.file"]),
  bufferToJson: jest.fn().mockReturnValue(newQuizTest),
  readFileSync: jest.fn().mockReturnValue("Buffer")
}));

describe("Test quiz service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  test("It should execute addQuestions correctly", async () => {
    await addQuestions("testQuestionTypeId", newQuizTest.questions);

    expect(addQuestion).toHaveBeenCalledTimes(newQuizTest.questions.length);
    expect(addQuestion).toHaveReturnedWith("test question id");
    expect(addAnswer).toHaveBeenCalled();
    expect(addCorrectAnswersToQuestion).toHaveBeenCalledTimes(newQuizTest.questions.length);
  });

  test("It should execute addAnswers correctly", async () => {
    const answers = newQuizTest.questions[0].answers;
    await addAnswers("testQuestionId", answers);

    expect(addAnswer).toHaveBeenCalledTimes(answers.length);
  });

  test("It should execute loadInitialQuizzes correctly", async () => {
    await loadInitialQuizzes();

    expect(addQuestionType).not.toHaveBeenCalled();

    await loadInitialQuizzes();

    expect(listFilesSync).toHaveBeenCalledTimes(2);
    expect(bufferToJson).toHaveBeenCalled();
    expect(getQuizType).toHaveBeenCalledWith(newQuizTest.quizType);
    expect(addQuestionType).toHaveBeenCalledWith(newQuizTest.quizType);
    expect(addQuestionType).toHaveBeenCalledWith(newQuizTest.quizType);
  });

  test("It should execute createQuizSession correctly", async () => {
    await createQuizSession("testTypeId", "testUserId");

    expect(findEmptyQuizSession).toHaveBeenCalledTimes(1);
    expect(findEmptyQuizSession).toHaveBeenCalledWith("testTypeId", "testUserId");
    expect(getQuizQuestions).not.toHaveBeenCalled();

    await createQuizSession("testTypeId", "testUserId");

    expect(getQuizQuestions).toHaveBeenCalled();
    expect(findEmptyQuizSession).toHaveBeenCalledTimes(2);
  });

  test("It should execute findNextQuizQuestion correctly", async () => {
    await findNextQuizQuestion("testTypeId", "testUserId");

    expect(getQuizSession).toHaveBeenCalledTimes(1);
    expect(getQuizTypeById).toHaveBeenCalledTimes(1);
    expect(getQuizTypeById).toHaveBeenCalledWith(mockQuizSessionDB.question_type_id);
  });

  test("It should execute initiateQuizSession correctly", async () => {
    const result = await initiateQuizSession("testQuizSessionId", "testUserId");

    expect(result.currentQuestionCount).toBe(0);
    expect(startQuizSession).toHaveBeenCalled();
    expect(startQuizSession).toHaveBeenCalledWith("testQuizSessionId", "testUserId");
    expect(getQuizSession).toHaveBeenCalled();
    expect(getQuizSession).toHaveBeenCalledWith("testQuizSessionId", "testUserId");
  });

  test("It should throw error - initiateQuizSession", async () => {
    try {
      await initiateQuizSession("testQuizSessionId", "testUserId")
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  test("It should execute addQuizQuestionAnswer correctly", async () => {
    await addQuizQuestionAnswer(mockSaveQuizQuestion, "testUserId");

    expect(addQuestionAnswer).toHaveBeenCalledWith(mockSaveQuizQuestion, "testUserId");
  });

  test("It should execute calculateBestQuizSession correctly", () => {
    const oldQuizSession = {
      ...mockQuizSessionDB,
      uuid: "oldQuizSession",
      date_started: new Date('Thu May 30 2024 19:02:41 GMT+0200 (Central European Summer Time)').toString(),
      date_ended: new Date('Thu May 30 2024 19:12:41 GMT+0200 (Central European Summer Time)').toString()
    };
    const newQuizSession = {
      ...mockQuizSessionDB,
      uuid: "newQuizSession",
      date_started: new Date('Thu May 30 2024 19:02:41 GMT+0200 (Central European Summer Time)').toString(),
      date_ended: new Date('Thu May 30 2024 19:22:41 GMT+0200 (Central European Summer Time)').toString()
    };

    const result1 = calculateBestQuizSession(oldQuizSession, null);

    expect(result1).toMatchObject(oldQuizSession);

    const result2 = calculateBestQuizSession(null, newQuizSession);

    expect(result2).toMatchObject(newQuizSession);

    const result3 = calculateBestQuizSession(oldQuizSession, newQuizSession);

    expect(result3).toMatchObject(oldQuizSession);

    const result4 = calculateBestQuizSession(newQuizSession, oldQuizSession);

    expect(result4).toMatchObject(oldQuizSession);

    expect(() => calculateBestQuizSession(null, null)).toThrow();
  });
});