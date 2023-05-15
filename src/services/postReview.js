import axios from "axios";
import { API_PRODUCT } from "../linkTo";
import store from "../store";
import { fetchProduct } from "../action";
import { errorNotify } from "../utils"
const postReview = async (id, data) => {
  const state = store.getState();
  const user = state?.User?.userInfor;
  await axios
    .post(
      `${API_PRODUCT}/${id}/reviews`,
      {
        ...data,
        username: user.username,
        email: user.email,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    )
    .then(() => store.dispatch(fetchProduct()))
    .catch((error) => errorNotify(error.response.data.message));
};
export default postReview;
