import { AUTH_ROLE } from "../consts/status";
const checkRole = (user) => {
  if (user.role === AUTH_ROLE.ADMIN) return true;
  else if (user.role === AUTH_ROLE.MASTER_ADMIN) return true;
  return false;
};
export default checkRole;
