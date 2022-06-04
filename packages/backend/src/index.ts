import express, { NextFunction } from "express";
import { Router } from "./router";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { Configuration } from "./utils/configuration";

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(
  session({
    secret: "broqr",
    unset: "destroy",
    saveUninitialized: false,
    resave: false,
  })
);
app.use(passport.session());

Router(app);

app.use(
  (
    err: string | Error,
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    console.error(err);
    res.statusCode = 400;
    res.send(err.toString());
  }
);
app.listen(Configuration.BACKEND_PORT, () => {
  console.log("Server listening on " + Configuration.BACKEND_PORT);
});
