<template>
  <div v-if="experiences.length > 0" class="ssi-container">
    <ssi-experience-list-item
      v-for="(experience, index) in experiences"
      :key="index"
      class="ssi-experience-card"
      :experience="experience"
    />
  </div>
</template>

<script lang="ts">
import 'reflect-metadata'
import { Component, Vue, Emit } from 'vue-property-decorator'
import { inject } from 'inversify-props'
import SsiInfoCard from '~/components/Tools/Cards/ssiInfoCard.vue'
import SsiExperienceListItem from '~/components/Experiences/ssiExperienceListItem.vue'
import { ExperienceListModel } from '~/models/experience/experienceListModel'
import { IExperienceService } from '~/services/experience/IExperienceService'

@Component({
  components: {
    SsiInfoCard,
    SsiExperienceListItem,
  },
})
export default class SsiExperienceList extends Vue {
  @inject('IExperienceService') private $experienceService!: IExperienceService

  experiences: ExperienceListModel[] = []
  experienceCount: number = 0
  superhumanId: number = 5

  async getExperiences(): Promise<void> {
    const data = await this.$experienceService.getExperiencesBySuperhumanId(
      this.superhumanId
    )
    if (!data.success) return
    this.experiences = data.data.result
    this.experienceCount = data.data.count
    this.emitExperienceCount(data.data.count)
  }

  @Emit('setExperienceCount')
  emitExperienceCount(count: number): number {
    return count
  }

  created(): void {
    this.getExperiences()
  }
}
</script>

<style lang="scss">
.ssi-container {
  width: 100%;
  display: flex;
  justify-content: center;
  .ssi-info-card {
    align-items: flex-start;
    .ssi-media {
      align-items: flex-start;
      img {
        padding: 0;
        margin: 0;
      }
    }
  }
}
</style>
<style scoped>
.ssi-experience-card {
  box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
  border-radius: 5px;
  padding: 1.5rem;
}
</style>
