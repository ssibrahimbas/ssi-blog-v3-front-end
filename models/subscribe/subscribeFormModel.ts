import { FormPropertyModel } from '~/models/form/fomPropertyModel'
import { SubscriberTypeModel } from '~/models/subscriberType/subscriberTypeModel';

export interface SubscribeFormModel {
  firstName: FormPropertyModel<string>,
  lastName: FormPropertyModel<string>,
  email: FormPropertyModel<string>,
  notification: FormPropertyModel<boolean>,
  information: any,
  types: FormPropertyModel<SubscriberTypeModel[]>
}
