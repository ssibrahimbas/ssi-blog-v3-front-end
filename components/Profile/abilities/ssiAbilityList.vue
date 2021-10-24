<template>
  <div>
    <h3 class="title">Yetenekler</h3>
    <div v-if="abilities.length > 0" class="ssi-abilities">
      <ssi-ability-list-item
        v-for="(ability, index) in abilities"
        :key="index"
        :ability="ability"
      />
    </div>
  </div>
</template>

<script lang='ts'>
import 'reflect-metadata'
import {Component, Vue} from 'vue-property-decorator'
import {inject} from 'inversify-props'
import SsiAbilityListItem from '~/components/Profile/abilities/ssiAbilityListItem.vue'
import { ISuperhumanService } from '~/services/superhuman/ISuperhumanService'
import { AbilityModel } from '~/models/ability/abilityModel'

@Component({
  components: {
    SsiAbilityListItem
  }
})
export default class SsiAbilityList extends Vue {
  @inject("ISuperhumanService") private $superhumanService! : ISuperhumanService;

  abilities : AbilityModel[] = [];
  superhumanId : number = 5;

  async getSuperhumanAbilities() : Promise<void> {
    const data = await this.$superhumanService.getSuperhumanAbilitiesBySuperhumanId(this.superhumanId);
    this.abilities = data.data.result;
  }

  created() : void {
    this.getSuperhumanAbilities();
  }
}

</script>

<style lang="scss" scoped>
.ssi-abilities {
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
