import axios from "axios";
import { API_USER } from "../linkTo";
import store from "../store";
const addUser = async (data) => {
  const state = store.getState();
  const user = state?.User?.userInfor;
  const header = {
    authorization: `Bearer ${user.token}`,
  };
  return await axios
    .post(
      API_USER,
      {
        ...data,
      },
      { headers: header }
    )
    .catch((error) => console.error(error));
};
export default addUser;

/**
 * Format user data
 * {
 * name,
 *
 * email,
 * password,
 * address,
 * role,
 * phonenumber,
 * isActive
 * }
 *
 *
 *
 */
