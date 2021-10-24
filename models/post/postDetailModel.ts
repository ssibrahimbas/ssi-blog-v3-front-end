import { MetaModel } from '~/models/meta/metaModel'
import { PostListModel } from '~/models/post/postListModel'
import { RecentPostModel } from '~/models/post/recentPostModel'

export interface PostDetailModel extends PostListModel {
  recentPosts : RecentPostModel[];
  meta: MetaModel;
}
