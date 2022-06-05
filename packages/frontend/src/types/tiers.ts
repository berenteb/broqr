export enum Tiers {
  FREE = "free",
  UNLIMITED = "unlimited",
  ADMIN = "admin",
}

export function getTierColor(tier?: Tiers) {
  switch (tier) {
    case Tiers.ADMIN:
      return "red";
    case Tiers.UNLIMITED:
      return "purple";
    case Tiers.FREE:
      return "green";
    default:
      return undefined;
  }
}
