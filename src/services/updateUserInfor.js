import axios from "axios";
import { updated } from "../action/authenUser";
import { API_USER } from "../linkTo";
import store from "../store";
const updateUserInfor = async (user, data) => {
  const header = {
    authorization: `Bearer ${user.token}`,
  };
  return await axios
      .put(`${API_USER}/${user._id}/profile`, data, {
        user:user,
      headers: header,
    })
      .then((res) => {
          store.dispatch(updated(res.data));
      });
};

export default updateUserInfor;
