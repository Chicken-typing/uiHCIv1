import axios from "axios";
import { VALIDATE_EMAIL } from "../linkTo";
import { errorNotify } from "../utils";
const checkEmail = async(data ) =>
  await axios
    .post(VALIDATE_EMAIL, data)
    .then(() =>{
        return true
    })
    .catch((error) => {
        errorNotify("Email does not exist!")
        return false
    });
export default checkEmail;
