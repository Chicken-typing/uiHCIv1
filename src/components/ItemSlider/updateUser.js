import axios from "axios";
const updateUser = (url,id, value) => {
  return axios
    .put(`${url}/${id}`, value)
    .catch((error) => console.error(error.response));
};
export default updateUser;
