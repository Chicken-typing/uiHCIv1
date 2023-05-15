import axios from "axios";
import { API_PRODUCT } from "../linkTo";
import store from "../store";
const updateProduct = (id, value) => {
  const state = store.getState();
  const user = state?.User?.userInfor;
  const header = {
    authorization: `Bearer ${user.token}`,
  };
  return axios
    .put(`${API_PRODUCT}/${id}`, value, { headers: header })
    .catch((error) => console.error(error.response));
};
export default updateProduct;
