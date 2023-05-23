import axios from "axios";
import { VALIDATE_EMAIL } from "../linkTo";
import { errorNotify } from "../utils";
const authenEmail = async(data, callback ) =>
{

  await axios
    .post(VALIDATE_EMAIL, data)
    .then((res) =>{
        callback()
        return true
    })
    .catch((error) => {
        errorNotify("Email does not exist!")
        return false
    
    })};
export default authenEmail;
