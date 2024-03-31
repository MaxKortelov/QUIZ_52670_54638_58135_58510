import {validate} from "class-validator";
import {Request, Response} from 'express';
import errorService from "../services/error.service";


export async function validateBody<A extends object>(req: Request, res: Response, Entity: { new(): A }): Promise<A> {
  const entity = new Entity();

  const keys = Object.keys(req.body);

  keys.forEach(key => {
    (entity as any)[key] = (req.body as any)[key];
  });

  const errorsEntities = await validate(entity);
  const errors: Array<string> = errorsEntities.map(error => error.constraints ? Object.values(error.constraints) : error.property).flat();

  if (errorsEntities.length) {
    errorService.validationError(res, errors);
    throw new Error("Validation not passed");
  }

  return entity;
}