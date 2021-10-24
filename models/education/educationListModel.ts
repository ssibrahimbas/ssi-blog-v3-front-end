import { EducationModel } from '~/models/education/educationModel'

export interface EducationListModel {
  education : EducationModel,
  schoolName : string,
  schoolImage : string
}
