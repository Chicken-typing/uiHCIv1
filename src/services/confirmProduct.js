import axios from "axios";
import { API_ORDER } from "../linkTo";
import store from "../store";
const confirmOrder = (id) => {
  const state = store.getState();
  const user = state?.User?.userInfor;
  const header = {
    authorization: `Bearer ${user.token}`,
  };
  return axios
    .put(`${API_ORDER}/${id}/deliver`, {}, { headers: header })
    .catch((error) => console.error(error.response));
};
export default confirmOrder;
