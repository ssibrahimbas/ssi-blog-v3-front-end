import { ObjectResponseModel } from '~/models/response/objectResponseModel'
import { ListResponseModel } from '~/models/response/listResponseModel'
import { SocialMediaListModel } from '~/models/socialMedia/socialMediaListModel'
import { AbilityModel } from '~/models/ability/abilityModel'
import { SuperhumanProfileDetailModel } from '~/models/superhuman/superhumanProfileDetailModel'

export interface ISuperhumanService {
  getSuperhumanProfileBySuperhumanId(superhumanId : number) : Promise<ObjectResponseModel<SuperhumanProfileDetailModel>>;
  getSuperhumanSocialMediaAccountsBySuperhumanId(superhumanId : number) : Promise<ListResponseModel<SocialMediaListModel>>;
  getSuperhumanAbilitiesBySuperhumanId(superhumanId : number) : Promise<ListResponseModel<AbilityModel>>;
}
