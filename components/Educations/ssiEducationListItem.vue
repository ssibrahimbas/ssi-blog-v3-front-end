<template>
  <ssi-info-card
    :image="education.schoolImage"
    :title="education.schoolName"
    :description="
      `${education.education.degree}, ${education.education.program}`
    "
  >
    <template #content>
      <p class="ssi-date">
        {{ new Date(education.education.dateOfStarted).getFullYear() }} -
        {{ new Date(education.education.dateOfEnded).getFullYear() }}
      </p>
    </template>
  </ssi-info-card>
</template>

<script lang='ts'>
import {Component, Vue, Prop} from 'vue-property-decorator'
import { EducationListModel } from '~/models/education/educationListModel'
import SsiInfoCard from '~/components/Tools/Cards/ssiInfoCard.vue'

@Component({
  components: {
    SsiInfoCard
  }
})
export default class SsiEducationListItem extends Vue {
  @Prop() education! : EducationListModel
}
</script>

<style scoped>

</style>
