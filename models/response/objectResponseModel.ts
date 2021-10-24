import { ResponseModel } from '~/models/response/responseModel'

export interface ObjectResponseModel<T> extends ResponseModel {
    data : T;
}
