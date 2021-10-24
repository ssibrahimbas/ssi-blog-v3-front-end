import { ObjectResponseModel } from '~/models/response/objectResponseModel'
import { PageModel } from '~/models/page/pageModel'

export interface IPageService {
  getPageById(Id : number) : Promise<ObjectResponseModel<PageModel>>;
  getPageByName(name : string) : Promise<ObjectResponseModel<PageModel>>;
}
