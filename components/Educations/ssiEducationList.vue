<template>
  <div v-if="educations.length > 0" class="ssi-container">
    <ssi-education-list-item
      v-for="(education, index) in educations"
      :key="index"
      :education="education"
    />
  </div>
</template>

<script lang='ts'>
import "reflect-metadata";
import {Component, Vue, Emit} from 'vue-property-decorator'
import {inject} from 'inversify-props'
import SsiEducationListItem from "~/components/Educations/ssiEducationListItem.vue";
import { IEducationService } from '~/services/education/IEducationService'
import { EducationListModel } from '~/models/education/educationListModel'

@Component({
  components: {
    SsiEducationListItem
  }
})
export default class SsiEducationList extends Vue {
  @inject("IEducationService") $educationService! : IEducationService

  educations : EducationListModel[] = [];
  countOfEducations : number = 0;
  superhumanId : number = 5;


  created() : void {
    this.getEducations();
  }

  async getEducations() : Promise<void> {
    const data = await this.$educationService.getAllEducationsBySuperhumanId(this.superhumanId);
    this.educations = data.data.result;
    this.countOfEducations = data.data.count;
    this.emitEducationCount(data.data.count);
  }

  @Emit("setEducationCount")
  emitEducationCount(count : number) : number {
    return count;
  }
}
</script>

<style lang="scss">
.ssi-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
}
</style>
