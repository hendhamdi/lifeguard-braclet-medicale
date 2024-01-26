import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/router.js";
import ejs from "ejs";
import NotFound from "./middlewares/not_found.js";
import ErrorHandlerMiddleware from "./middlewares/error_handler.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import crypto from "crypto";
import connectMongoDBSession from "connect-mongodb-session";

const mongoDBSession = connectMongoDBSession(session);

const app = express();
import connectDB from "./db/connect.js";
dotenv.config();
//set ejs as view engine
app.set("view engine", "ejs");
//access req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//set up a collection to store  sessions
const store = new mongoDBSession({
    uri: process.env.MONGO_URI,
    collection: "sessions",
});
// Generate a random secret key for signing the session cookie
const secretKey = crypto.randomBytes(32).toString("hex");
app.use(express.static("public"));
// Other middleware configurations
app.use(cookieParser(secretKey));
app.use(
    session({
        secret: secretKey,
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            sameSite: "lax",
        },
    })
);
app.use(cors());
app.use(router);

app.use(NotFound);
app.use(ErrorHandlerMiddleware);
// Start the server
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
    } catch (error) {}
    app.listen(3000, () => console.log("app Listening on port", 3000));
};
start();

export { app };