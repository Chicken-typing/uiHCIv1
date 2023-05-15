import { message } from "antd";

export const errorNotify=error=>message.error(error)
export const successNotify=res=>message.success(res)
export const inforNotify = res => message.info(res)
