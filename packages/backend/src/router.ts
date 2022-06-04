import { Express } from "express";
import { User } from "./models/user";
import apiMW from "./mw/apiMW";
import { UserController } from "./controllers/userController";
import passport from "passport";
import loginMW from "./auth/loginMW";
import getUserMW from "./mw/getUserMW";
import { LinkModel } from "./models/link";
import { QrModel } from "./models/qr";
import validateLinkModification from "./utils/validateModification";
import saveLinkMW from "./mw/link/saveLinkMW";
import redirectMW from "./mw/redirectMW";
import getLinkMW from "./mw/link/getLinkMW";
import getLinksMW from "./mw/link/getLinksMW";
import deleteLinkMW from "./mw/link/deleteLinkMW";
import getStatisticsMW from "./mw/link/getStatisticsMW";
import editApiKey from "./mw/apiKey/editApiKey";
import fullLinkResponseMW from "./mw/link/fullLinkResponseMW";

const userController = new UserController();

export const ObjRepo = {
  LinkModel: LinkModel,
  QrModel: QrModel,
  User: User,
};
export function Router(app: Express) {
  app.get("/api/link", passport.authenticate("jwt"), getLinksMW(), apiMW());
  app.get(
    "/api/link/:linkId",
    passport.authenticate("jwt"),
    validateLinkModification(),
    getLinkMW(),
    apiMW()
  );
  app.get(
    "/api/link/statistics/:linkId/:interval",
    passport.authenticate("jwt"),
    validateLinkModification(),
    getLinkMW(),
    getStatisticsMW(),
    apiMW()
  );
  app.post(
    "/api/link/:linkId",
    passport.authenticate("jwt"),
    validateLinkModification(),
    saveLinkMW(),
    apiMW()
  );
  app.put(
    "/api/link/",
    passport.authenticate("jwt"),
    saveLinkMW(true),
    apiMW()
  );
  app.post(
    "/api/createLink/",
    passport.authenticate("headerapikey"),
    saveLinkMW(true),
    fullLinkResponseMW()
  );
  app.delete(
    "/api/link/:linkId",
    passport.authenticate("jwt"),
    validateLinkModification(),
    deleteLinkMW(),
    apiMW(true)
  );
  /**
   * Auth
   */
  app.post("/api/register", userController.registerUser);
  app.post("/api/login", passport.authenticate("local"), loginMW());
  app.get("/api/user", passport.authenticate("jwt"), getUserMW(), apiMW());

  app.post(
    "/api/apiKey",
    passport.authenticate("jwt"),
    editApiKey(),
    apiMW(true)
  );
  app.delete(
    "/api/apiKey",
    passport.authenticate("jwt"),
    editApiKey(true),
    apiMW(true)
  );

  app.get("/ly/:shortId", redirectMW());
}
