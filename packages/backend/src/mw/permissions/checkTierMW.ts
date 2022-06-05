import express from "express";
import { UserInterface } from "../../models/user";
import { Tiers } from "../../utils/tiers";

export default function checkTierMW(tier: Tiers) {
  return async function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = req.user as UserInterface;
    if (user.tier !== tier) {
      return next("Nem megfelelő jogosultság!");
    }
    return next();
  };
}
