import {NewQuestion} from "../../../types/quiz";
import {validate} from "class-validator";

const validationError = {
  target: {
    question: '',
    answerId: '',
    answers: []
  },
  value: [],
  property: '',
  children: [],
  constraints: {}
}

describe("Test decorator utils", () => {
  it('should throw an error message when answers length less then 2', async () => {
    const model = new NewQuestion();

    const error = {...validationError, target: {...validationError.target, question: 'Test question string'}, constraints: {...validationError.constraints, arrayMinSize: 'answers must contain at least 2 elements'}, property: 'answers'}

    model.question = "Test question string";
    model.answerId = "";
    model.answers = [];

    return validate(model).then(errors => {
      expect(errors.length).toBe(1);
      expect(errors).toMatchObject([error]);
    });
  });

  it('should throw an error message when question length is less then 8', async () => {
    const model = new NewQuestion();

    model.question = "";
    model.answerId = "";
    model.answers = [];

    const error1 = {...validationError, constraints: {arrayMinSize: 'answers must contain at least 2 elements'}, property: 'answers'}
    const error2 = {...validationError, constraints: {minLength: 'question must be longer than or equal to 8 characters'}, property: 'question', value: ""}


    return validate(model).then(errors => {
      expect(errors.length).toBe(2);
      expect(errors).toMatchObject([error2, error1]);
    });
  });

  it('should throw an error message when object inside answers array is not valid', async () => {
    const model = new NewQuestion();

    model.question = "Test question string";
    model.answerId = "";
    // @ts-ignore
    model.answers = [{id: "", text:""}, {id: "", description:""}];

    const error = {...validationError, target: {...validationError.target, question: 'Test question string', answers: model.answers}, constraints: {...validationError.constraints, IsNonPrimitiveArray: "Array of objects is not valid",}, property: 'answers', value: model.answers}

    return validate(model).then(errors => {
      expect(errors.length).toBe(1);
      expect(errors).toMatchObject([error]);
    });
  });

  it('should throw an error message when object inside answers array is primitive', async () => {
    const model = new NewQuestion();

    model.question = "Test question string";
    model.answerId = "";
    // @ts-ignore
    model.answers = ["", ""];

    const childrenError = {
      target: [ '', '' ],
      value: '',
      property: '0',
      children: [],
      constraints: {
        nestedValidation: 'each value in nested property answers must be either object or array'
      }
    }

    const error = {target: {...validationError.target, question: model.question, answers: model.answers}, property: 'answers', value: model.answers, children: [childrenError, {...childrenError, property: "1"}]}

    return validate(model).then(errors => {

      expect(errors.length).toBe(1);
      expect(errors).toMatchObject([error]);
    });
  });
});