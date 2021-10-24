import { MessageModel } from "~/models/message/messageModel";
import { ObjectResponseModel } from "~/models/response/objectResponseModel";

export interface IMessageService {
    sendMessage(message: MessageModel): Promise<ObjectResponseModel<number>>;
}