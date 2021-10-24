<template>
  <ssi-info-card
    :image="experience.organization.imagePath"
    :title="experience.organization.name"
  >
    <template #content>
      <div class="ssi-experience-roles">
      <ssi-experience-role-card
        v-for="(role, index) in experience.roles"
        :key="index"
        :experience="role"
        @totalMonths="setTotalMonths"
      />
      </div>
  </ssi-info-card>
</template>

<script lang='ts'>
import {Component, Vue, Prop} from 'vue-property-decorator'
import SsiInfoCard from '~/components/Tools/Cards/ssiInfoCard.vue'
import { ExperienceListModel } from '~/models/experience/experienceListModel'
import SsiExperienceRoleCard from '~/components/Experiences/ssiExperienceRoleCard.vue';

@Component({
  components: {
    SsiInfoCard,
    SsiExperienceRoleCard
  }
})
export default class SsiExperienceListItem extends Vue {

  @Prop() experience! : ExperienceListModel

}
</script>

<style scoped>

</style>
