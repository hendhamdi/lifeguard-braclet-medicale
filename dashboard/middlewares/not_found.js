import { StatusCodes } from "http-status-codes";

export default function handleNotFound(req, res, next) {
  res.status(StatusCodes.NOT_FOUND).send("Route Does Not Exist");
}
