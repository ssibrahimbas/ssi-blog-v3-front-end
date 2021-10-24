import { SubscriberTypeModel } from "../subscriberType/subscriberTypeModel";

type Subscriber = {
  firstName : string,
  lastName : string,
  email : string,
  postNotification : boolean,
}

export interface SubscribeModel {
  subscriber: Subscriber;
  types: SubscriberTypeModel[];
}
