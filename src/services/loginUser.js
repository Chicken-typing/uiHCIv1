import axios from "axios";
import { API_SIGNIN } from "../linkTo";
const loginUser = async (data, callback) =>
  await axios
    .post(API_SIGNIN, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((error) => {
      callback({});
    });
export default loginUser;
