import {Response} from 'express';
class ErrorService {

  errorObject = {
    errors: []
  }

  public validationError(res: Response, errors: Array<string>) {
    const body = Object.create(this.errorObject);
    body.errors = errors;
    res.statusCode = 400;
    res.send(body);
    res.end();
  }

  public existedEntityError(res: Response, errors: Array<string> = []) {
    const body = Object.create(this.errorObject);
    body.errors = ["User already exists", ...errors];
    res.statusCode = 409;
    res.send(body);
    res.end();
  }
}

const errorService = new ErrorService();

export default errorService;