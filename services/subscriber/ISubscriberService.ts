import { SubscribeModel } from '~/models/subscribe/subscribeModel'
import { ObjectResponseModel } from '~/models/response/objectResponseModel'
import { SubscriberTypeModel } from '~/models/subscriberType/subscriberTypeModel'
import { ListResponseModel } from '~/models/response/listResponseModel'

export interface ISubscriberService {
  registerSubscriber(subscriber : SubscribeModel) : Promise<ObjectResponseModel<number>>;
  getSubscriberTypes() : Promise<ListResponseModel<SubscriberTypeModel>>;
}
