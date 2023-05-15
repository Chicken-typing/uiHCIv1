import axios from "axios";
import { API_SIGNUP } from "../linkTo";
const addNewAccount = async (data) => {
  return await axios
    .post(API_SIGNUP, {
      ...data,
    })
    .catch((error) => console.error(error));
};
export default addNewAccount;
