import express from "express";
import { UserInterface } from "../../models/user";
import { getPermission } from "../../utils/tiers";

export default function checkLinkQuotaMW() {
  return async function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = req.user as UserInterface;
    if (getPermission(user.tier).linkQuota <= user.linkIds.length) {
      return next("Link kvóta elérve!");
    }
    return next();
  };
}
