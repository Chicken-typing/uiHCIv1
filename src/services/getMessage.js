import axios from "axios";
import { API_CHAT_ROOM } from "../linkTo";
const getMessages = async (room,user,callback) => {
  const header = {
    authorization: `Bearer ${user.token}`,
  };
  await axios
    .get(`${API_CHAT_ROOM}/${room}`, {
      headers: header,
    })
    .then((res) => {
      callback(res.data.messages);
    });
};

export default getMessages;
