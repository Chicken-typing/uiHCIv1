// TODO: post new message into database
import moment from "moment";
const sendMessage = async (user, message, socket, getNewest) => {
  const messageData = {
    room: user._id,
    author: user._id,
    sentAt: moment()._d,
    message: message,
  };
  await socket.emit("message", messageData);
  getNewest(messageData);
};
export default sendMessage;
