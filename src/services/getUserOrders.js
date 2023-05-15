import axios from "axios";
import { API_ORDER } from "../linkTo";
const getUserOrders = async (user, callback) => {
      const header  = {
        authorization: `Bearer ${user.token}`,
      };
    return await axios.get(`${API_ORDER}/mine`, {
        user: user,
        headers:header
    })
        .then(res => callback(res.data))
};

export default getUserOrders;
