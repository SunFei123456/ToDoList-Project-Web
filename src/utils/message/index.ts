import { message } from "ant-design-vue";
const sunfeiMessage = (type: string, content: string) => {
  if (["success", "error", "warning", "info"].includes(type)) {
    message[type](content);
  } else {
    console.error("Invalid message type");
  }
};

export default sunfeiMessage;
