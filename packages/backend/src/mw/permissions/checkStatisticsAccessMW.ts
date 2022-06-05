import express from "express";
import { UserInterface } from "../../models/user";
import { getPermission } from "../../utils/tiers";

export default function checkStatisticsAccessMW() {
  return async function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = req.user as UserInterface;
    if (!getPermission(user.tier).showStatistics) {
      return next("Statisztikák nem érhetőek el ezen a szinten!");
    }
    return next();
  };
}
