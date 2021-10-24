import axios, { AxiosInstance } from 'axios'
import { injectable } from 'inversify-props'
import { EvaluationPostModel } from '~/models/evaluation/EvaluationPostModel'
import { ObjectResponseModel } from '~/models/response/objectResponseModel'
import { IEvaluationService } from '~/services/evaluation/IEvaluationService'
import { PaginationResponseModel } from '~/models/response/paginationResponseModel'
import { EvaluationListModel } from '~/models/evaluation/evaluationListModel'

@injectable()
export class EvaluationManager implements IEvaluationService {

    $axios : AxiosInstance = axios;

  BASE_API : string = process.env.BASE_API_URL || ''
  API : string = this.BASE_API + "/evaluations"

    async addEvaluation(evaluation: EvaluationPostModel): Promise<ObjectResponseModel<number>> {
      const res = await this.$axios.post<ObjectResponseModel<number>>(this.API + `/add`, evaluation);
      return res.data;
    }

  async getAllEvaluationsByPostId(postId: number, page: number = 1, rows: number = 3): Promise<PaginationResponseModel<EvaluationListModel>> {
    const res = await this.$axios.get<PaginationResponseModel<EvaluationListModel>>(this.API + `/GetAllByPostId?postId=${postId}&page=${page}&rows=${rows}`);
    return res.data;
  }

}
