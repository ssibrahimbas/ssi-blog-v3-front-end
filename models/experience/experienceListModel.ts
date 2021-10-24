import { OrganizationModel } from '~/models/organization/organizationModel'
import { EmploymentModel } from '~/models/employment/employmentModel'

export interface ExperienceListModel {
  organization: OrganizationModel,
  roles: EmploymentModel[],
}
