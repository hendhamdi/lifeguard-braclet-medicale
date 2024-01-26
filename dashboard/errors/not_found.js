import { StatusCodes } from "http-status-codes";
import CustomError from "./custom_error.js";

class NotFound extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFound;
