import express from "express";
import { User, UserInterface } from "../../models/user";
import isIdValid from "../../utils/isIdValid";

export default function getUserMW() {
  return async function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const userId = req.params.userId;
    if (userId && !isIdValid(userId)) return next("Rossz ID!");
    const user = userId
      ? await User.findById(userId)
      : (req.user as UserInterface);
    if (!user) return next("Felhasználó nem található!");
    res.locals.payload = {
      _id: user._id,
      username: user.username,
      apiKey: user.apiKey,
      tier: user.tier,
    };
    return next();
  };
}
