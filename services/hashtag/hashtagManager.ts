import axios, { AxiosInstance } from 'axios'
import { injectable } from 'inversify-props'
import { IHashtagService } from "./IHashtagService";
import { HashtagPageModel } from '~/models/hashtag/hashtagPageModel';
import { ObjectResponseModel } from '~/models/response/objectResponseModel';


@injectable()
export class HashtagManager implements IHashtagService {

    $axios : AxiosInstance = axios;

    BASE_API : string = process.env.BASE_API_URL || ''
    API : string = this.BASE_API + "/hashtags"

    async getMetaData(hashtag: string): Promise<ObjectResponseModel<HashtagPageModel>> {
        const res = await this.$axios.get<ObjectResponseModel<HashtagPageModel>>(this.API + `/GetOneByNameWithPageDetails?hashtagName=${hashtag}`);
        return res.data;
    }

}