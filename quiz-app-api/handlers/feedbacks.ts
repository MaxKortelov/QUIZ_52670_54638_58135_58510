import {Request, Response} from "express";
import errorService from "../services/error.service";
import {createFeedback, loadFeedbacks} from "../db/feedbacks";
import {validateBody} from "../validators/entity.validator";
import {Feedback} from "../types/feedbacks";

export const getFeedbacks = async (_req: Request, res: Response) => {
  try {
    const feedbacks = await loadFeedbacks();

    res.statusCode = 200;
    res.send({ feedbacks });
    res.end();
  } catch (e) {
    console.log("error", e)
    errorService.serverError(res, ["Something went wrong"])
  }
}

export const addFeedback = async (req: Request, res: Response) => {
  await validateBody(req, Feedback).then(async (newFeedback) => {
    try {
      const feedback = await createFeedback(newFeedback as Feedback);
      res.statusCode = 201;
      res.send(feedback);
    } catch (e) {
      console.log("error", e);
      errorService.serverError(res);
    }
  })
    .catch((e) => {
      errorService.validationError(res, e);
    });
}