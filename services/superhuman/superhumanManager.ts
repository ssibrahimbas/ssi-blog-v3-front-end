import axios, { AxiosInstance } from 'axios'
import { injectable } from 'inversify-props'
import { ISuperhumanService } from '~/services/superhuman/ISuperhumanService'
import { ListResponseModel } from '~/models/response/listResponseModel'
import { AbilityModel } from '~/models/ability/abilityModel'
import { ObjectResponseModel } from '~/models/response/objectResponseModel'
import { SocialMediaListModel } from '~/models/socialMedia/socialMediaListModel'
import { SuperhumanProfileDetailModel } from '~/models/superhuman/superhumanProfileDetailModel'

@injectable()
export class SuperhumanManager implements ISuperhumanService {
  $axios : AxiosInstance = axios;
  BASE_API : string = process.env.BASE_API_URL || ''

  async getSuperhumanAbilitiesBySuperhumanId(superhumanId: number = 5): Promise<ListResponseModel<AbilityModel>> {
    const res = await this.$axios.get<ListResponseModel<AbilityModel>>(this.BASE_API + `/abilities/GetAllBySuperhumanId?superhumanId=${superhumanId}`);
    return res.data;
  }

  async getSuperhumanProfileBySuperhumanId(superhumanId: number = 5): Promise<ObjectResponseModel<SuperhumanProfileDetailModel>> {
    const res = await this.$axios.get<ObjectResponseModel<SuperhumanProfileDetailModel>>(this.BASE_API + `/superhumans/GetProfileInfos?superhumanId=${superhumanId}`);
    return res.data;
  }

  async getSuperhumanSocialMediaAccountsBySuperhumanId(superhumanId: number = 5): Promise<ListResponseModel<SocialMediaListModel>> {
    const res = await this.$axios.get<ListResponseModel<SocialMediaListModel>>(this.BASE_API + `/socialMedias/GetAllBySuperhumanId?superhumanId=${superhumanId}`);
    return res.data;
  }


}
