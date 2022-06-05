import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import passport from "passport";
import "../auth/passportHandler";
import { User, UserInterface } from "../models/user";
import { Configuration } from "../utils/configuration";
import { Tiers } from "../utils/tiers";

if (!Configuration.JWT_SECRET) {
  console.error("JWT_SECRET nem létezik!");
  process.exit(1);
}

export class UserController {
  public async registerUser(req: Request, res: Response): Promise<void> {
    const hashedPassword = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync()
    );

    await User.create({
      username: req.body.username,
      password: hashedPassword,
      tier: Tiers.FREE,
    });

    const token = jwt.sign(
      { username: req.body.username, scope: req.body.scope },
      Configuration.JWT_SECRET || ""
    );
    res.status(200).send({ token: token });
  }

  public authenticateUser(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      "local",
      function (err: Error | string | undefined | null, user: UserInterface) {
        if (err) return next(err);
        if (!user) {
          return res
            .status(401)
            .json({ status: "error", code: "unauthorized" });
        } else {
          const token = jwt.sign(
            { username: user.username },
            Configuration.JWT_SECRET || ""
          );
          res.status(200).send({ token: token });
        }
      }
    );
  }
}
