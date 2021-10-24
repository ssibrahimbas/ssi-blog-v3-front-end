<template>
  <div class="ssi-project-list-item">
    <ssi-tooltip
      v-if="project.project.openSource"
      title="Bu proje açık kaynak kodludur."
      placement="bottom"
      icon="objects_diamond"
    >
    </ssi-tooltip>
    <div class="ssi-badges">
      <ssi-badge
        v-for="(badge, index) in project.badges"
        :key="index"
        :is-icon="true"
        :tooltip-text="badge.description"
        :icon="badge.icon"
      />
    </div>
    <h4 class="text-primary text-center">{{ project.project.title }}</h4>
    <p class="text-secondary">
      {{ project.project.description }}
    </p>
    <ssi-software-languages
      v-if="project.softwareLanguages"
      :software-languages="project.softwareLanguages"
    ></ssi-software-languages>
    <div class="ssi-links">
      <div v-for="(link, index) in links" :key="link.title[0] + index">
        <ssi-project-link
          v-if="link.condition"
          :icon="link.icon"
          :title="link.title"
          :url="link.url"
          @click:ssi="modalOpen(link.action)"
        />
      </div>
    </div>
    <div v-if="!!project.project.contributors" class="ssi-contributors">
      <b class="text-primary">Katkıda Bulunanlar:</b>
      {{ project.project.contributors }}
    </div>
    <p class="text-muted text-right ssi-date">
      {{ formatDate(project.project.dateOfCreate) }}
    </p>

    <modal :show.sync="modalOpened" header-classes="justify-content-center">
      <h4 slot="header" class="title title-up">{{ project.project.title }}</h4>
      <div>
        <ssi-markdown v-if="modalOpened" :url="markdownUrl"> </ssi-markdown>
      </div>

      <template slot="footer">
        <div class="ssi-modal">
          <Button type="danger" @click.native="modalOpened = false"
            >Kapat</Button
          >
        </div>
      </template>
    </modal>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { inject } from 'inversify-props'
import SsiProjectLink from '~/components/Projects/ssiProjectLink.vue'
import Button from '~/components/Tools/Button/button.vue'
import Modal from '~/components/Tools/Modal/modal.vue'
import SsiTooltip from '~/components/Tools/Tooltip/ssiTooltip.vue'
import { ProjectListModel } from '~/models/project/projectListModel'
import SsiMarkdown from '~/components/Tools/Markdown/ssiMarkdown.vue'
import { IConstants } from '~/constants/IConstants'
import SsiSoftwareLanguages from '~/components/SoftwareLanguages/ssiSoftwareLanguages.vue'
import SsiBadge from '~/components/Tools/Badge/ssiBadge.vue'

type LinkType = {
  title: string
  icon: string
  condition: boolean
  action: undefined | string
  url: undefined | string | null
}

@Component({
  components: {
    SsiMarkdown,
    SsiProjectLink,
    Button,
    SsiTooltip,
    SsiSoftwareLanguages,
    Modal,
    SsiBadge,
  },
})
export default class SsiProjectListItem extends Vue {
  @inject('IConstants') private $constants!: IConstants

  @Prop({ required: true }) project!: ProjectListModel

  API: string = process.env.BASE_STATIC_API_URL || ''
  modalOpened: boolean = false
  markdownUrl: string = this.API + this.project.project.markdownUrl
  links: LinkType[] = [
    {
      title: 'Projenin Readme.md dosyası',
      icon: 'now-ui-icons files_paper',
      condition: !!this.project.project.markdownUrl,
      action: 'modalOpen',
      url: '',
    },
    {
      title: 'Projenin pdf dosyası',
      icon: 'now-ui-icons files_single-copy-04',
      url: this.project.project.documentUrl,
      condition: !!this.project.project.documentUrl,
      action: '',
    },
    {
      title: 'Projenin GitHub bağlantısı',
      icon: 'fab fa-github',
      url: this.project.project.url,
      condition: this.project.project.openSource,
      action: '',
    },
  ]

  modalOpen(value: string | undefined): void {
    if (!value) return
    if (value === 'modalOpen') {
      this.modalOpened = true
    }
  }

  formatDate(date: string): string {
    return this.$constants.formatDate(date)
  }
}
</script>

<style lang="scss">
$badge-background: #41b883;
$badge-shadow: #34495e;
$badge-box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

.ssi-project-list-item {
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  margin-bottom: 3rem;
  padding: 1rem;
  border-radius: 5px;
  .ssi-open-source-badge {
    position: absolute;
    right: 0;
    top: 0;
    padding: 1rem;
    color: #fff !important;
    box-shadow: $badge-shadow -2px 9px 20px -10px;
    line-height: 1rem;
    border-bottom-left-radius: 50%;
    border-top-right-radius: 5px;
    font-size: 1.5rem;
    background-color: $badge-background;
    cursor: help;
  }
  .ssi-links {
    display: flex;
    flex-direction: row;
    :not(:last-child) {
      margin-right: 0.5rem;
    }
    .btn {
      background-color: $badge-shadow;
      box-shadow: $badge-box-shadow;
      i {
        transition: font-size 0.3s;
        &:hover {
          font-size: 1.1rem !important;
        }
      }
    }
  }
}
.ssi-modal {
  width: 100%;
  display: flex;
  justify-content: center;
}

.ssi-badges {
  display: flex;
  flex-direction: row;
  .ssi-badge {
    font-size: 1.5rem;
    &:not(:last-child) {
      margin-right: 0.5rem;
    }
  }
}
</style>
