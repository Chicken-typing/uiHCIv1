import axios from "axios";
import { RESET_PASSWORD } from "../linkTo";
import { errorNotify, successNotify } from "../utils";
const resetPassword = async(data, callback ) =>
{
  await axios
    .put(RESET_PASSWORD, data)
    .then((res) =>{
        console.log(res);
        successNotify(res.data.message)
        callback()
    })
    .catch((error) => {

    })};
export default resetPassword;