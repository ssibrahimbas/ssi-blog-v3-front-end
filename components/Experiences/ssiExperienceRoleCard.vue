<template>
  <div class="ssi-experience-role-card">
    <div class="ssi-role-title">
      <h4>
        {{ experience.role }}
        <small class="text-muted">~ {{ experience.employmentName }}</small>
      </h4>
    </div>
    <p class="ssi-date">
      {{ calculatePostDateText(experience.dateOfStarted) }} -
      <span v-if="!experience.status"
        >{{ calculatePostDateText(experience.dateOfEnded) }}
        <span class="text-italic">
          ~{{
            calculateExperiencePeriod(
              experience.dateOfStarted,
              experience.dateOfEnded
            )
          }}</span
        ></span
      >
      <span v-else>
        Şu Anda
        <span class="text-italic">
          ~{{ calculateExperiencePeriod(experience.dateOfStarted) }}</span
        ></span
      >
    </p>
    <p>{{ experience.cityName }}</p>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { inject } from 'inversify-props'
import { IConstants } from '~/constants/IConstants'
import { ExperienceModel } from '~/models/experience/experienceModel'

@Component
export default class SsiexperienceRoleCard extends Vue {
  @inject('IConstants') private $constants!: IConstants

  @Prop({ required: true }) experience!: ExperienceModel

  calculatePostDateText(postDate: string): string {
    const date = new Date(postDate)
    const year = date.getFullYear()
    const month = this.$constants.months[date.getMonth()]
    return `${month} ${year}`
  }

  calculateExperiencePeriod(
    startedDate: string,
    endDate: number | string | undefined = Date.now()
  ): string {
    const dateOfStarted = new Date(startedDate)
    const dateOfEnded = new Date(endDate)
    const differenceYear =
      dateOfEnded.getUTCFullYear() - dateOfStarted.getUTCFullYear()

    const differenceMonth =
      dateOfEnded.getMonth() - dateOfStarted.getMonth() + 1
    const differenceDay = dateOfStarted.getDay() - dateOfEnded.getDay() + 1
    let result: string = ''
    if (differenceYear > 1) {
      result += `${differenceYear} yıl`
    }
    if (differenceMonth > 1) {
      result += ` ${differenceMonth} ay`
    } else if (differenceDay > 1) {
      result += ` ${differenceDay} gün`
    }
    return result
  }
}
</script>

<style lang="scss" scoped>
.ssi-experience-role-card {
  display: flex;
  flex-direction: column;
  position: relative;
  p {
    margin: 0;
  }
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
  .ssi-role-title {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 0.3rem;
    margin-bottom: 0.1rem;
    h4 {
      margin: 0;
    }
  }
}
</style>
