import { ListResponseModel } from '~/models/response/listResponseModel'
import { EducationListModel } from '~/models/education/educationListModel'

export interface IEducationService {
  getAllEducationsBySuperhumanId(superhumanId : number) : Promise<ListResponseModel<EducationListModel>>;
}
