import axios from "axios";
import { VALIDATE_TOKEN } from "../linkTo";
import store from "../store";
import { logout } from "../action";
import { inforNotify, successNotify } from "../utils";
const validateToken = async () => {
  const state = store.getState();
  const user = state.User.userInfor;
  const header = {
    authorization: `Bearer ${user.token}`,
  };
  if (user.token) {
    await axios
      .get(VALIDATE_TOKEN, {
        headers: header,
      })
      .then((res) => successNotify(res.data.message))
      .catch((err) => {
        store.dispatch(logout());
        localStorage.removeItem("stepCheckout");
        inforNotify("Your account is expired.");
      });
  }
};

export default validateToken;
