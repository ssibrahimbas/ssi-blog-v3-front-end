import { ListResponseModel } from '~/models/response/listResponseModel'
import { ExperienceListModel } from '~/models/experience/experienceListModel'

export interface IExperienceService {
  getExperiencesBySuperhumanId(superhumanId : number) : Promise<ListResponseModel<ExperienceListModel>>;
}
