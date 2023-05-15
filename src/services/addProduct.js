import axios from "axios";
import { API_PRODUCT } from "../linkTo";
import store from "../store";
const addProduct = async (data) => {
  const state = store.getState();
  const user = state?.User?.userInfor;
  return await axios
    .post(
      API_PRODUCT,
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    )
    .catch((error) => console.error(error));
};
export default addProduct;
