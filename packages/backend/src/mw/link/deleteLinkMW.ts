import { NextFunction, Request, Response } from "express";
import { LinkModel } from "../../models/link";
import { User, UserInterface } from "../../models/user";

export default function deleteLinkMW() {
  return async function (req: Request, res: Response, next: NextFunction) {
    // Save IDs
    const linkId = req.params.linkId;
    // Get required object
    const link = await LinkModel.findByIdAndDelete(linkId);
    // Get user
    const userId = (req.user as UserInterface)._id;
    const user = await User.findById(userId);
    // Delete link reference form user
    if (user) {
      user.linkIds = user.linkIds.filter(
        (li) => String(li) !== String(link?._id)
      );
      await user.save();
    }
    return next();
  };
}
