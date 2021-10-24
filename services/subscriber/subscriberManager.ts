import axios, { AxiosInstance } from 'axios'
import { injectable } from 'inversify-props'
import { ISubscriberService } from '~/services/subscriber/ISubscriberService'
import { SubscribeModel } from '~/models/subscribe/subscribeModel'
import { ObjectResponseModel } from '~/models/response/objectResponseModel'
import { ListResponseModel } from '~/models/response/listResponseModel'
import { SubscriberTypeModel } from '~/models/subscriberType/subscriberTypeModel'

@injectable()
export class SubscriberManager implements ISubscriberService {

  $axios : AxiosInstance = axios;

  BASE_API : string = process.env.BASE_API_URL || ''
  API : string = this.BASE_API + "/subscribers"

  async registerSubscriber(subscriber: SubscribeModel): Promise<ObjectResponseModel<number>> {
    const res = await this.$axios.post<ObjectResponseModel<number>>(this.API + `/add`, subscriber);
    return res.data;
  }

  async getSubscriberTypes(): Promise<ListResponseModel<SubscriberTypeModel>> {
    const res = await this.$axios.get<ListResponseModel<SubscriberTypeModel>>(this.BASE_API + "/subscriberTypes/getall");
    return res.data;
  }
}
