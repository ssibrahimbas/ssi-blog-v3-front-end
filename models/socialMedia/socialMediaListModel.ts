import { SocialMediaModel } from '~/models/socialMedia/socialMediaModel'
import { OrganizationModel } from '~/models/organization/organizationModel'

export interface SocialMediaListModel {
  socialMedia : SocialMediaModel,
  organization: OrganizationModel
}
