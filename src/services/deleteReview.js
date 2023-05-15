import axios from "axios";
import { API_PRODUCT } from "../linkTo";
import store from "../store";
import { fetchProduct } from "../action";
import { errorNotify, successNotify } from "../utils";
const deleteReview = async(prodId,reviewId) => {
  const state = store.getState();
  const user = state?.User?.userInfor;
  const header = {
    authorization: `Bearer ${user.token}`,
  };
  return await axios
    .delete(`${API_PRODUCT}/${prodId}/reviews/${reviewId}`, { headers: header })
    .then((res) => {
      store.dispatch(fetchProduct())
      successNotify(res.data.message)
    })
    .catch((error) => errorNotify(error.response.data.message));
};
export default deleteReview;
