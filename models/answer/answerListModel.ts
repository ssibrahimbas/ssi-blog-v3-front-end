import { SuperhumanProfileModel } from '~/models/superhuman/superhumanProfileModel'
import { AnswerModel } from '~/models/answer/answerModel'

export interface AnswerListModel {
  answer : AnswerModel,
  superhuman : SuperhumanProfileModel
}
