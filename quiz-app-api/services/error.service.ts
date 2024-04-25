import {Response} from 'express';
class ErrorService {

  errorObject = {
    errors: []
  }

  public validationError(res: Response, errors: Array<string> = []) {
    const body = Object.create(this.errorObject);
    body.errors = errors;
    res.statusCode = 400;
    res.send(body);
  }

  public existedEntityError(res: Response, errors: Array<string> = []) {
    const body = Object.create(this.errorObject);
    body.errors = ["Entity already exists", ...errors];
    res.statusCode = 409;
    res.send(body);
  }

  public serverError(res: Response, errors: Array<string> = []) {
    const body = Object.create(this.errorObject);
    body.errors = errors.length > 0 ? errors : ["Server error"];
    res.statusCode = 500;
    res.send(body);
  }

  public conflict(res: Response, errors: Array<string> = []) {
    const body = Object.create(this.errorObject);
    body.errors = errors.length > 0 ? errors : ["Conflict"];
    res.statusCode = 409;
    res.send(body);
  }

  public lockedResource(res: Response, errors: Array<string> = []) {
    const body = Object.create(this.errorObject);
    body.errors = errors.length > 0 ? errors : ["The resource is locked"];
    res.statusCode = 423;
    res.send(body);
  }
}

const errorService = new ErrorService();

export default errorService;