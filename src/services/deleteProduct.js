import axios from "axios";
import { API_PRODUCT } from "../linkTo";
import store from "../store";
const deleteProduct = (id) => {
  const state = store.getState();
  const user = state?.User?.userInfor;
  const header = {
    authorization: `Bearer ${user.token}`,
  };
  return axios
    .delete(`${API_PRODUCT}/${id}`, { headers: header })
    .catch((error) => console.error(error));
};
export default deleteProduct;
