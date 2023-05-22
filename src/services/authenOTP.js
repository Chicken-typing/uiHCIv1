import axios from "axios";
import { VALIDATE_OTP } from "../linkTo";
import { errorNotify } from "../utils";
const authenOTP = async(data ) =>
  await axios
    .post(VALIDATE_OTP, data)
    .then((res) =>{
        return res.data
    })
    .catch((error) => {
        errorNotify("Email does not exist!")
        return false
    });
export default authenOTP;