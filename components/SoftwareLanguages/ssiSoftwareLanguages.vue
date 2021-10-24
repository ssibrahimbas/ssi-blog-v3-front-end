<template>
  <div v-if="softwareLanguages.length > 0" class="ssi-software-languages">
    <ssi-badge
      v-for="(softwareLanguage, index) in softwareLanguages"
      :key="index"
      :image-url="softwareLanguage.image"
      :is-text="true"
      :title="softwareLanguage.name"
      :tooltip-text="getTooltipText(softwareLanguage.name)"
    ></ssi-badge>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { SoftwareLanguageModel } from '~/models/softwareLanguage/softwareLanguageModel'
import SsiBadge from '~/components/Tools/Badge/ssiBadge.vue'

type EnumTypes = {
  [key: string]: Function
}

@Component({
  components: {
    SsiBadge,
  },
})
export default class SsiSoftwareLanguages extends Vue {
  @Prop({ required: true }) softwareLanguages!: SoftwareLanguageModel[]
  @Prop({
    required: false,
    default: 'post',
    validator: (value: string) => {
      const enums: string[] = ['project', 'post']
      return enums.includes(value)
    },
  })
  type!: string

  types: EnumTypes = {
    project: this.getProjectTooltipText,
    post: this.getPostTooltipText,
  }

  getTooltipText(languageName: string): string {
    if (this.types[this.type]) {
      return this.types[this.type](languageName)
    }
    return languageName
  }

  getProjectTooltipText(languageName: string): string {
    return 'Bu proje ' + languageName + ' ile geliştirilmiştir.'
  }

  getPostTooltipText(languageName: string): string {
    return 'Bu yazıda ' + languageName + ' üzerinde durulmuştur.'
  }
}
</script>

<style lang="scss" scoped>
$software-language-hover-bg: rgba(210, 210, 210, 0.1);
$software-language-hover-bs: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

.ssi-software-languages {
  display: flex;
  flex-wrap: wrap;
  margin-block: 1.5rem;
  .ssi-badge {
    padding-inline: 0.5rem;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
    &:not(:last-child) {
      margin-right: 1rem;
    }
    &:hover {
      background-color: $software-language-hover-bg;
      box-shadow: $software-language-hover-bs;
    }
  }
}
</style>
