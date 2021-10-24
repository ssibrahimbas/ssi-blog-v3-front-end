import { ResponseModel } from '~/models/response/responseModel'
import { ListObjectModel } from '~/models/response/listObjectModel'

export interface ListResponseModel<T> extends ResponseModel {
    data : ListObjectModel<T>;
}
