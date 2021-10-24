import axios, { AxiosInstance } from 'axios'
import { injectable } from 'inversify-props'
import { IMessageService } from "./IMessageService";
import { MessageModel } from "~/models/message/messageModel";
import { ObjectResponseModel } from "~/models/response/objectResponseModel";

@injectable()
export class MessageManager implements IMessageService {
    
    $axios : AxiosInstance = axios;

    BASE_API : string = process.env.BASE_API_URL || ''
    API : string = this.BASE_API + "/messages"
    
    async sendMessage(message: MessageModel): Promise<ObjectResponseModel<number>> {
        const res = await this.$axios.post<ObjectResponseModel<number>>(this.API + "/add", message);
        return res.data;
    }
    
}