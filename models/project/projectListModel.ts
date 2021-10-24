import { BadgeModel } from '~/models/badge/badgeModel'
import { SoftwareLanguageModel } from '~/models/softwareLanguage/softwareLanguageModel'
import { ProjectModel } from '~/models/project/projectModel'
import { SuperhumanProfileModel } from '~/models/superhuman/superhumanProfileModel'

export interface ProjectListModel {
  project: ProjectModel,
  superhuman: SuperhumanProfileModel,
  superhumanId: number,
  softwareLanguages: SoftwareLanguageModel[],
  badges: BadgeModel[],
}
