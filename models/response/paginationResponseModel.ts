import { ResponseModel } from '~/models/response/responseModel'
import { PaginationObjectModel } from '~/models/response/paginationObjectModel'

export interface PaginationResponseModel<T> extends ResponseModel {
  data : PaginationObjectModel<T>;
}
