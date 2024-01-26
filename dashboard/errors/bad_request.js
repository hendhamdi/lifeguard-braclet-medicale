import { StatusCodes } from "http-status-codes";
import CustomError from "./custom_error.js";

class BadRequest extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequest;
