import { Tiers } from "./tiers";

export type User = {
  _id: string;
  username: string;
  apiKey: string;
  tier: Tiers;
};
