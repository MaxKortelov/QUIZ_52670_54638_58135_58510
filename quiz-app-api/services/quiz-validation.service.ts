import {NextFunction, Request, Response} from "express";

export async function validateQuizSession(req: Request, res: Response, next: NextFunction) {
  console.log("Here to validate session")
  next();
}