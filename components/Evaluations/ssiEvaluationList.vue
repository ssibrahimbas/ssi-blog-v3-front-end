<template>
  <div class="ssi-evaluation-list" :class="{'pb-2' : isNextPage }">
    <hr class="ssi-hr ssi-hr-2" />
    <h3 class="text-center text-muted">Yorumlar</h3>
    <ssi-evaluation-list-item
      v-for="(evaluation, index) in evaluations"
      :key="index"
      :content="evaluation.evaluation.description"
      :sender-name="evaluation.evaluation.senderName"
      :date-of-create="evaluation.evaluation.dateOfCreate"
      :title="evaluation.evaluation.title"
    />

    <div class="ssi-pagination">
      <div class="ssi-center" >
        <button
          v-if="isNextPage"
          type="button"
          class="btn btn-round btn-primary"
          @click="activePage++"
        >
          Daha Fazla Yorum Göster
        </button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import "reflect-metadata";
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import {inject} from 'inversify-props'
import { IEvaluationService } from '~/services/evaluation/IEvaluationService'
import { EvaluationListModel } from '~/models/evaluation/evaluationListModel'
import { PaginationModel } from '~/models/response/paginationModel'
import SsiEvaluationListItem from '~/components/Evaluations/ssiEvaluationListItem.vue'

@Component({
  components: {
    SsiEvaluationListItem
  }
})
export default class SsiEvaluationList extends Vue {

  @inject("IEvaluationService") private $evaluationService! : IEvaluationService

  @Prop() postId! : number

  activePage : number = 0;
  rowPerPage : number = 3;
  evaluations : EvaluationListModel[] = [];
  totalEvaluations : number = 0;
  pageCount : number = 0;
  pagination : PaginationModel = {
    nextPages: [],
    prevPages: []
  };
  
  isNextPage: boolean = false;

  async getEvaluations(postId : number = this.postId, page : number = 1, rows : number = this.rowPerPage) : Promise<void> {
    if(!postId) return;
    const data = await this.$evaluationService.getAllEvaluationsByPostId(postId, page, rows);
    if(!data.success) return;
    this.evaluations = data.data.result;
    this.activePage = data.data.page;
    this.totalEvaluations = data.data.rows;
    this.pagination = data.data.pagination;
    this.calculatePageCount();
  }

  calculatePageCount() : void {
    let rate : number = this.totalEvaluations / this.rowPerPage;
    if (rate === 0 && this.totalEvaluations > 0) {
      rate = 1;
    }
    this.pageCount = Math.ceil(rate);
  }

  @Watch("postId")
  handlePostId(id : number) : void {
    this.getEvaluations(id, this.activePage + 1, this.rowPerPage);
  }

  @Watch("activePage")
  handleActivePage(page : number) : void {
    if(page > 1)  {
      this.getEvaluations(this.postId, page, this.rowPerPage);
    }
  }

  created() : void {
    this.getEvaluations(
      this.postId,
      this.activePage + 1,
      this.rowPerPage
    );
  }

}
</script>

<style lang="scss" scoped>
.ssi-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.ssi-evaluation-list {
  padding-top: 1.5rem;
  width: 70%;
  margin-inline: auto;
  .btn-round {
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
  }
}
</style>

