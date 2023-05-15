import axios from "axios";
import { fetchUser } from "../action";
import store from "../store";
const updateUser = (url, id, value) => {
  const state = store.getState();
  const user = state?.User?.userInfor;
  const header = {
    authorization: `Bearer ${user.token}`,
  };
  return axios
    .put(`${url}/${id}`, {
      ...value,
      _id:id
    },
      { headers: header })
    .then((res) => {

      store.dispatch(fetchUser());
    })
    .catch((error) => console.error(error.response));
};
export default updateUser;
