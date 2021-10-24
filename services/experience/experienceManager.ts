import axios, { AxiosInstance } from 'axios'
import { injectable } from 'inversify-props'
import { IExperienceService } from '~/services/experience/IExperienceService'
import { ListResponseModel } from '~/models/response/listResponseModel'
import { ExperienceListModel } from '~/models/experience/experienceListModel'

@injectable()
export class ExperienceManager implements IExperienceService {
  $axios: AxiosInstance = axios
  BASE_API: string = process.env.BASE_API_URL || ''
  API: string = this.BASE_API + '/experiences'

  async getExperiencesBySuperhumanId(superhumanId: number = 5): Promise<ListResponseModel<ExperienceListModel>> {
    const res = await this.$axios.get<ListResponseModel<ExperienceListModel>>(this.API + `/GetAllBySuperhumanId?superhumanId=${superhumanId}`);
    return res.data;
  }
}
