import axios, {AxiosInstance} from "axios";
import { injectable } from 'inversify-props'
import { IEducationService } from '~/services/education/IEducationService'
import { ListResponseModel } from '~/models/response/listResponseModel'
import { EducationListModel } from '~/models/education/educationListModel'

@injectable()
export class EducationManager implements IEducationService {

  $axios : AxiosInstance = axios;

  BASE_API : string = process.env.BASE_API_URL || ''
  API : string = this.BASE_API + "/educations"

  async getAllEducationsBySuperhumanId(superhumanId: number = 5): Promise<ListResponseModel<EducationListModel>> {
    const res = await this.$axios.get<ListResponseModel<EducationListModel>>(this.API + `/GetAllBySuperhumanId?superhumanId=${superhumanId}`);
    return res.data;
  }

}
