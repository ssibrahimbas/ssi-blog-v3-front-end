import { FormPropertyModel } from '~/models/form/fomPropertyModel'

export interface EvaluationFormModel {
  firstName : FormPropertyModel<string>,
  lastName : FormPropertyModel<string>,
  title: FormPropertyModel<string>,
  email: FormPropertyModel<string>,
  message: FormPropertyModel<string>,
  expressConsent: FormPropertyModel<boolean>,
  information : any
}
