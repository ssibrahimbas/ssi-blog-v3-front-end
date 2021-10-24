import { PaginationModel } from '~/models/response/paginationModel'

export interface PaginationObjectModel<T> {
  page : number;
  rows : number;
  fitRows: number | undefined;
  pagination : PaginationModel;
  result: T[];
  count: number;
}
