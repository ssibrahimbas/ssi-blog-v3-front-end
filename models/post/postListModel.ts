import { PostModel } from '~/models/post/postModel'
import { SuperhumanProfileModel } from '~/models/superhuman/superhumanProfileModel'

export interface PostListModel {
  post : PostModel,
  superhuman : SuperhumanProfileModel,
  countOfEvaluations: number,
  superhumanId : number
}
