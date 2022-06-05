import express from "express";
import { User } from "../../models/user";

export default function editUserMW() {
  return async function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const id = req.params.userId;
    if (!id) return next("ID nem található!");
    const user = await User.findById(id);
    if (!user) return next("Felhasználó nem található!");
    if (req.body.tier) {
      user.tier = req.body.tier;
    }
    if (req.body.username) {
      user.username = req.body.username;
    }
    await user.save();
    return next();
  };
}
