import {Request, Response} from "express";
import errorService from "../services/error.service";
import {loadFeedbacks} from "../db/feedbacks";

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

export const addFeedback = async (_req: Request, res: Response) => {

}