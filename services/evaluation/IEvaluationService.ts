import { EvaluationPostModel } from '~/models/evaluation/EvaluationPostModel'
import { ObjectResponseModel } from '~/models/response/objectResponseModel'
import { PaginationResponseModel } from '~/models/response/paginationResponseModel'
import { EvaluationListModel } from '~/models/evaluation/evaluationListModel'

export interface IEvaluationService {
  addEvaluation(evaluation : EvaluationPostModel) : Promise<ObjectResponseModel<number>>;
  getAllEvaluationsByPostId(postId : number, page : number, rows : number) : Promise<PaginationResponseModel<EvaluationListModel>>;
}
