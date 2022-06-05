import express from "express";
import { User } from "../../models/user";

export default function getUsersMW() {
  return async function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const users = await User.find();
    res.locals.payload = users.map((u) => {
      return {
        _id: u._id,
        username: u.username,
        tier: u.tier,
        linkIds: u.linkIds,
      };
    });
    return next();
  };
}
