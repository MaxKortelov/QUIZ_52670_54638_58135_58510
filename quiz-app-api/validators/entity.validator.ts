import {validate} from "class-validator";
import {Request} from 'express';


export async function validateBody<A extends object>(req: Request, Entity: { new(): A }): Promise<Array<string> | A> {
    const entity = new Entity();

    const keys = Object.keys(req.body);

    keys.forEach(key => {
      (entity as any)[key] = (req.body as any)[key];
    });

    const errorsEntities = await validate(entity);
    const errors = errorsEntities.map(error => error.constraints ? Object.values(error.constraints) : error.property).flat();

    if (errorsEntities.length) {
      throw errors;
    }
    return entity;
}