<template>
  <div class="ssi-ability">
    <p class="text-muted">{{ ability.name }}</p>
    <div class="ssi-grades">
      <i
        v-for="(grade, index) in ability.grade"
        :key="index"
        class="fas fa-star text-primary"
      ></i>
      <template v-if="ability.grade < 5">
        <i
          v-for="(placeholder, index) in (5 - ability.grade)"
          :key="50 - index"
          class="far fa-star text-secondary"
        >
        </i>
      </template>
    </div>
  </div>
</template>

<script lang='ts'>
import {Component, Vue, Prop} from 'vue-property-decorator'
import { AbilityModel } from '~/models/ability/abilityModel'

@Component
export default class SsiAbilityListItem extends Vue {
  @Prop() ability! : AbilityModel
}
</script>

<style lang="scss" scoped>
.ssi-ability {
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: center;
  margin-block: 2rem;
  p {
    text-align: center;
    margin-bottom: .5rem;
  }
  .ssi-grades {
    text-align: center;
  }
}
</style>
