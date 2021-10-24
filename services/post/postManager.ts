import axios, { AxiosInstance } from 'axios'
import { injectable } from 'inversify-props'
import { PaginationResponseModel } from '~/models/response/paginationResponseModel'
import { PostListModel } from '~/models/post/postListModel'
import { IPostService } from '~/services/post/IPostService'
import { ObjectResponseModel } from '~/models/response/objectResponseModel'
import { PostDetailModel } from '~/models/post/postDetailModel'


@injectable()
export class PostManager implements IPostService {
  $axios : AxiosInstance = axios;

  BASE_API : string = process.env.BASE_API_URL || ''
  API : string = this.BASE_API + "/posts"

  async getAllPosts(page : number = 1, rows : number = 20) : Promise<PaginationResponseModel<PostListModel>> {
    const res = await this.$axios.get<PaginationResponseModel<PostListModel>>(this.API + `/getall?page=${page}&rows=${rows}`);
    return res.data;
  }

  async getAllPostsBySearchedHashtag(hashtag: string, page: number, rows: number): Promise<PaginationResponseModel<PostListModel>> {
    const res = await this.$axios.get<PaginationResponseModel<PostListModel>>(this.API + `/GetAllByHashtag?hashtag=${hashtag}&page=${page}&rows=${rows}`);
    return res.data;
  }

  async getAllPostsBySearchedValue(searchedValue: string, page: number, rows: number): Promise<PaginationResponseModel<PostListModel>> {
    if(searchedValue.startsWith("#")) {
      return this.getAllPostsBySearchedHashtag(searchedValue.replace("#", "%23"), page, rows);
    }
    const res = await this.$axios.get<PaginationResponseModel<PostListModel>>(this.API + `/GetAllBySearchValue?searchValue=${searchedValue}&page=${page}&rows=${rows}`);
    return res.data;
  }

  async getAllPostsForSlider(): Promise<PaginationResponseModel<PostListModel>> {
    const res = await this.$axios.get(this.API + `/GetPostsForSlider`);
    return res.data;
  }

  async getOnePostBySlug(slug: string): Promise<ObjectResponseModel<PostDetailModel>> {
    const res = await this.$axios.get<ObjectResponseModel<PostDetailModel>>(this.API + `/GetPostBySlug?slug=${slug}`);
    return res.data;
  }
}
