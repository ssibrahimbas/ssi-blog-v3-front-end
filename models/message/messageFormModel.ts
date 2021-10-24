import { FormPropertyModel } from '~/models/form/fomPropertyModel'

export interface MessageFormModel {
    senderName: FormPropertyModel<string>,
    email: FormPropertyModel<string>,
    subject: FormPropertyModel<string>,
    text: FormPropertyModel<string>,
    agreement: FormPropertyModel<boolean>,
    information: any
}
