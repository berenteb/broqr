export enum Tiers {
  FREE = "free",
  UNLIMITED = "unlimited",
  ADMIN = "admin",
}

type PermissionFields = {
  linkQuota: number;
  showStatistics: boolean;
};

const Permissions: Record<Tiers, PermissionFields> = {
  [Tiers.FREE]: {
    linkQuota: 1,
    showStatistics: false,
  },
  [Tiers.UNLIMITED]: {
    linkQuota: Infinity,
    showStatistics: true,
  },
  [Tiers.ADMIN]: {
    linkQuota: Infinity,
    showStatistics: true,
  },
};

export const getPermission = (tier: Tiers) => {
  return Permissions[tier] || Permissions[Tiers.FREE];
};
