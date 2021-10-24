import { PaginationResponseModel } from '~/models/response/paginationResponseModel'
import { PostListModel } from '~/models/post/postListModel'
import { ObjectResponseModel } from '~/models/response/objectResponseModel'
import { PostDetailModel } from '~/models/post/postDetailModel'

export interface IPostService {
  getAllPosts(page : number, rows: number): Promise<PaginationResponseModel<PostListModel>>;
  getOnePostBySlug(slug : string) : Promise<ObjectResponseModel<PostDetailModel>>;
  getAllPostsBySearchedValue(searchedValue : string, page : number, rows : number) : Promise<PaginationResponseModel<PostListModel>>;
  getAllPostsBySearchedHashtag(hashtag : string, page : number, rows : number) : Promise<PaginationResponseModel<PostListModel>>;
  getAllPostsForSlider() : Promise<PaginationResponseModel<PostListModel>>;
}
