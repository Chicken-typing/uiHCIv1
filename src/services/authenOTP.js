import axios from "axios";
import { VALIDATE_OTP } from "../linkTo";
import { errorNotify } from "../utils";
const authenOTP = async(data,callback ) =>
   {
    await axios
    .post(VALIDATE_OTP, data)
    .then((res) =>{
        callback(res.data.data, false)
    })
    .catch((error) => {
        callback("", true)
        errorNotify("Your OTP is wrong.")
    });
   }
export default authenOTP;