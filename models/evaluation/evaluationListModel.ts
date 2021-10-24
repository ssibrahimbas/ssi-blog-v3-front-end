import { EvaluationModel } from '~/models/evaluation/evaluationModel'
import { AnswerModel } from '~/models/answer/answerModel'

export interface EvaluationListModel {
  evaluation : EvaluationModel,
  answer : AnswerModel | null
}
