export const Paths = {
  MAIN: "/",
  LOGIN: "login",
  REGISTER: "register",
  DASHBOARD: "dashboard",
  LINK: "link",
  EDIT: "edit",
  ERROR: "error",
  PROFILE: "profile",
  USER: "user",
};

export const AbsolutePaths = {
  MAIN: Paths.MAIN,
  LOGIN: "/" + Paths.LOGIN,
  REGISTER: "/" + Paths.REGISTER,
  DASHBOARD: "/admin/",
  LINK: "/admin/" + Paths.LINK,
  USER: "/admin/" + Paths.USER,
  EDIT_LINK: "/admin/" + Paths.LINK + "/" + Paths.EDIT,
  EDIT_USER: "/admin/" + Paths.USER + "/" + Paths.EDIT,
  ERROR: "/" + Paths.ERROR,
  ADMIN_ERROR: "/admin/" + Paths.ERROR,
  PROFILE: "/admin/" + Paths.PROFILE,
};
