import { Error, model, Schema } from "mongoose";
import { Document } from "./document";
import bcrypt from "bcryptjs";
import { Tiers } from "../utils/tiers";

type comparePassword = (
  candidatePassword: string,
  callback: (err: Error, isMatch: boolean) => void
) => void;

export interface UserInterface extends Document {
  username: string;
  password: string;
  comparePassword: comparePassword;
  linkIds: Schema.Types.ObjectId[];
  apiKey: string | null;
  tier: Tiers;
}

export const userSchema = new Schema<UserInterface>({
  username: String,
  password: String,
  linkIds: [Schema.Types.ObjectId],
  apiKey: { type: String, required: false },
  tier: String,
});

userSchema.methods.comparePassword = function (
  candidatePassword: string,
  callback: any
) {
  bcrypt.compare(
    candidatePassword,
    this.password,
    (err: Error, isMatch: boolean) => {
      callback(err, isMatch);
    }
  );
};

export const User = model<UserInterface>("User", userSchema);
